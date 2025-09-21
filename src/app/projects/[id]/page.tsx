"use client";
import Header from "@/components/Header";
import { projects } from "@/lib/data";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const project = useMemo(() => projects.find(p => p.id === params.id), [params.id]);
  const [likes, setLikes] = useState<number>(project?.likes ?? 0);
  const [comments, setComments] = useState<string[]>([]);
  const [comment, setComment] = useState("");

  if (!project) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="container mx-auto px-4 py-10">
          <Card>
            <CardContent className="py-10 text-center">
              <p className="mb-4 text-foreground/70">Project not found.</p>
              <Button onClick={() => window.history.back()}>Go Back</Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-6 grid gap-6 md:grid-cols-12">
        <section className="md:col-span-8 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-800">{project.title} — Roll {project.studentRoll}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-[16/9] w-full rounded-lg bg-[url('https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center" />
              <div>
                <h3 className="font-semibold mb-1">Synopsis</h3>
                <p className="text-sm text-foreground/70">{project.synopsis}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Description</h3>
                <p className="text-sm text-foreground/70">{project.description}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Files</h3>
                <ul className="text-sm list-disc pl-5">
                  {project.files.map(f => (
                    <li key={f.name}>{f.name} • {f.size}</li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center gap-3">
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setLikes(likes + 1)}>Like ({likes})</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Comments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                {comments.length === 0 && (
                  <p className="text-sm text-foreground/60">No comments yet.</p>
                )}
                {comments.map((c, idx) => (
                  <div key={idx} className="rounded-md bg-blue-50 p-3 text-sm">{c}</div>
                ))}
              </div>
              <div className="space-y-2">
                <Textarea placeholder="Write a comment..." value={comment} onChange={(e) => setComment(e.target.value)} />
                <Button disabled={!comment.trim()} onClick={() => { setComments(prev => [comment.trim(), ...prev]); setComment(""); }}>Post Comment</Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <aside className="md:col-span-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Q&A (Gemini 2.0 Flash)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-foreground/70">Ask questions about this project. This is a placeholder; integrate Gemini later.</p>
              <QAWidget />
            </CardContent>
          </Card>
        </aside>
      </main>
    </div>
  );
}

function QAWidget() {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([
    { role: "ai", content: "Hi! Ask me anything about the project synopsis or files." },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const q = input.trim();
    setMessages((m) => [{ role: "user", content: q }, { role: "ai", content: "(Placeholder) Gemini response will appear here." }, ...m]);
    setInput("");
  };

  return (
    <div className="rounded-lg border p-3">
      <div className="h-56 overflow-y-auto space-y-2 flex flex-col-reverse">
        {messages.map((m, i) => (
          <div key={i} className={`rounded-md px-3 py-2 text-sm ${m.role === "user" ? "bg-blue-600 text-white ml-10" : "bg-blue-50 text-foreground mr-10"}`}>
            {m.content}
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        <input
          className="flex-1 rounded-md border px-3 py-2 text-sm"
          placeholder="Ask about the project..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") send(); }}
        />
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={send}>Ask</Button>
      </div>
    </div>
  );
}