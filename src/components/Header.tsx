"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) => (pathname === href ? "text-primary" : "text-foreground/80 hover:text-foreground");

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="size-9 rounded-md bg-blue-600 text-white grid place-items-center font-bold">SP</div>
          <span className="font-bold text-lg">Scholarly Portal</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 font-medium">
          <Link href="/" className={isActive("/")}>Home</Link>
          <Link href="#about" className="text-foreground/80 hover:text-foreground">About</Link>
        </nav>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Avatar className="size-6">
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                Profile
                <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Role</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/student")}>Student</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/teacher")}>Teacher</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/admin")}>Admin</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => alert("Settings coming soon")}>Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}