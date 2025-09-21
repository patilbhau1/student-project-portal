"use client";
import Header from "@/components/Header";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4">
        <section className="grid lg:grid-cols-2 gap-10 items-center py-16">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-blue-900">
              Manage Student Projects with Ease
            </h1>
            <p className="mt-4 text-lg text-foreground/70">
              A clean, modern portal for Students, Teachers, and Admins to submit, review, and manage projects.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/student">
                <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
              </Link>
              <Link href="#about">
                <Button variant="outline">Learn more</Button>
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 text-center">
              <div className="rounded-lg border p-4 hover:shadow-sm transition">
                <p className="text-2xl font-bold text-blue-700">3</p>
                <p className="text-sm text-foreground/60">Roles</p>
              </div>
              <div className="rounded-lg border p-4 hover:shadow-sm transition">
                <p className="text-2xl font-bold text-blue-700">30+</p>
                <p className="text-sm text-foreground/60">Roll Nos</p>
              </div>
              <div className="rounded-lg border p-4 hover:shadow-sm transition">
                <p className="text-2xl font-bold text-blue-700">12</p>
                <p className="text-sm text-foreground/60">Demo Projects</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden border shadow-sm">
            <div
              className="aspect-[16/10] w-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop)",
              }}
            />
          </div>
        </section>

        <section id="about" className="py-10 border-t">
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              title="Student Uploads"
              desc="Submit synopsis and files with a simple, responsive UI."
            />
            <FeatureCard
              title="Teacher Review"
              desc="Browse by roll number and view project details instantly."
            />
            <FeatureCard
              title="Admin Controls"
              desc="Like, review, assign marks, and approve or reject projects."
            />
          </div>
        </section>
      </main>
      <footer className="border-t mt-12 py-6">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground/60">© {new Date().getFullYear()} Scholarly Portal</p>
          <div className="flex gap-4 text-sm">
            <a className="hover:text-blue-700 transition" href="https://vercel.com" target="_blank" rel="noreferrer">Deploy on Vercel</a>
            <a className="hover:text-blue-700 transition" href="https://supabase.com" target="_blank" rel="noreferrer">Supabase Ready</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border p-6 hover:shadow-md transition bg-white">
      <h3 className="font-semibold text-blue-800">{title}</h3>
      <p className="mt-2 text-sm text-foreground/70">{desc}</p>
    </div>
  );
}