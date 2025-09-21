"use client";
import Header from "@/components/Header";
import { projects, rolls } from "@/lib/data";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Plus, Upload } from "lucide-react";

export default function StudentProjectsPage() {
  const [selectedRoll, setSelectedRoll] = useState<string>(rolls[0]);
  const [uploaded, setUploaded] = useState<File[]>([]);

  const filtered = useMemo(() => projects.filter(p => p.studentRoll === selectedRoll), [selectedRoll]);

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
              <ScrollArea className="h-[60vh] pr-2">
                <ul className="space-y-1">
                  {rolls.map(r => (
                    <li key={r}>
                      <button
                        className={`w-full text-left px-3 py-2 rounded-md transition hover:bg-blue-50 ${selectedRoll === r ? "bg-blue-100 text-blue-800" : "text-foreground/80"}`}
                        onClick={() => setSelectedRoll(r)}
                      >
                        {r}
                      </button>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </CardContent>
          </Card>
        </aside>
        <section className="md:col-span-9 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-800">Student Projects • Roll {selectedRoll}</h1>
            <label className="inline-flex items-center gap-2">
              <input
                type="file"
                className="hidden"
                multiple
                onChange={(e) => setUploaded(e.target.files ? Array.from(e.target.files) : [])}
              />
              <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
                <Upload className="size-4 mr-2" /> Upload Files
              </Button>
            </label>
          </div>
          {uploaded.length > 0 && (
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle>Pending Upload (demo)</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-sm text-foreground/80">
                  {uploaded.map(f => (
                    <li key={f.name}>{f.name} — {(f.size / 1024).toFixed(1)} KB</li>
                  ))}
                </ul>
                <div className="mt-3 flex gap-2">
                  <Button className="bg-blue-600 hover:bg-blue-700">Submit</Button>
                  <Button variant="outline" onClick={() => setUploaded([])}>Clear</Button>
                </div>
              </CardContent>
            </Card>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(p => (
              <Link key={p.id} href={`/projects/${p.id}`}>
                <Card className="group hover:shadow-lg transition duration-200 border-blue-100">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{p.title}</span>
                      <Plus className="size-4 opacity-0 group-hover:opacity-100 transition" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-[16/9] w-full rounded-md bg-[url('https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center" />
                    <p className="mt-3 text-sm text-foreground/70 line-clamp-2">{p.synopsis}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
            {filtered.length === 0 && (
              <Card>
                <CardContent className="py-10 text-center text-foreground/60">No projects yet for this roll.</CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}