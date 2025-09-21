"use client";
import Header from "@/components/Header";
import { projects, rolls } from "@/lib/data";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

export default function TeacherProjectsPage() {
  const [selectedRoll, setSelectedRoll] = useState<string>(rolls[1]);
  const filtered = useMemo(() => projects.filter(p => p.studentRoll === selectedRoll), [selectedRoll]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        <aside className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-700">Students</CardTitle>
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
          <h1 className="text-2xl font-bold text-blue-800">Teacher View • Roll {selectedRoll}</h1>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(p => (
              <Link key={p.id} href={`/projects/${p.id}`}>
                <Card className="hover:shadow-lg transition border-blue-100">
                  <CardHeader>
                    <CardTitle>{p.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-[16/9] w-full rounded-md bg-[url('https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center" />
                    <p className="mt-3 text-sm text-foreground/70 line-clamp-2">{p.synopsis}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}