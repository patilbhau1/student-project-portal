"use client";
import Header from "@/components/Header";
import { projects, rolls } from "@/lib/data";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AdminDashboardPage() {
  const [selectedRoll, setSelectedRoll] = useState<string>(rolls[2]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const filtered = useMemo(() => projects.filter(p => p.studentRoll === selectedRoll), [selectedRoll]);
  const selected = filtered.find(p => p.id === selectedProjectId) ?? filtered[0] ?? null;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        <aside className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-700">Roll Numbers</CardTitle>
            </CardHeader>
            <CardContent>
              <Input placeholder="Search roll..." className="mb-3" onChange={(e) => setSelectedRoll(e.target.value || rolls[0])} />
              <ScrollArea className="h-[50vh] pr-2">
                <ul className="space-y-1">
                  {rolls.map(r => (
                    <li key={r}>
                      <button
                        className={`w-full text-left px-3 py-2 rounded-md transition hover:bg-blue-50 ${selectedRoll === r ? "bg-blue-100 text-blue-800" : "text-foreground/80"}`}
                        onClick={() => { setSelectedRoll(r); setSelectedProjectId(null); }}
                      >
                        {r}
                      </button>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Projects</h3>
                <ScrollArea className="h-[30vh] pr-2">
                  <ul className="space-y-1">
                    {filtered.map(p => (
                      <li key={p.id}>
                        <button
                          className={`w-full text-left px-3 py-2 rounded-md transition hover:bg-blue-50 ${selected?.id === p.id ? "bg-blue-100 text-blue-800" : "text-foreground/80"}`}
                          onClick={() => setSelectedProjectId(p.id)}
                        >
                          {p.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        </aside>
        <section className="md:col-span-9 space-y-4">
          <h1 className="text-2xl font-bold text-blue-800">Admin Dashboard</h1>
          {selected ? (
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle>{selected.title} — Roll {selected.studentRoll}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-foreground/70">{selected.description}</p>
                <div>
                  <h3 className="font-semibold mb-2">Files</h3>
                  <ul className="text-sm list-disc pl-5">
                    {selected.files.map(f => (
                      <li key={f.name}>{f.name} • {f.size}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-2">
                <Button className="bg-blue-600 hover:bg-blue-700">Like</Button>
                <Button variant="outline">Review</Button>
                <Button variant="outline">Assign Marks</Button>
                <Button variant="outline">Approve</Button>
                <Button variant="destructive">Reject</Button>
              </CardFooter>
            </Card>
          ) : (
            <Card><CardContent className="py-10 text-center text-foreground/60">Select a project</CardContent></Card>
          )}
        </section>
      </main>
    </div>
  );
}