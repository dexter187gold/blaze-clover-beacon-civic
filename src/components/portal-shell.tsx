import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Home, Menu, Plus, Smartphone, Ticket } from "lucide-react";
import { useState, type ReactNode } from "react";
import { UserButton } from "@/lib/auth/gates";
import type { Actor } from "@/lib/desk/types";
import { cn } from "@/lib/utils";
import { HelixWordmark } from "@/components/helix-mark";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { OfflineBar } from "@/components/connectivity";

const NAV = [
  { to: "/portal", label: "Home", icon: Home, exact: true },
  { to: "/portal/tickets", label: "Tickets", icon: Ticket, exact: false },
  { to: "/portal/knowledge", label: "Help", icon: BookOpen, exact: false },
] as const;

export function PortalShell({ actor, children }: { actor: Actor; children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const company = actor.kind === "staff" ? actor.profile.company : actor.company;
  const preview = actor.kind === "staff";

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      {preview && (
        <div className="border-b border-border bg-muted px-4 py-2 text-center text-xs text-muted-foreground">
          Previewing the client portal as {company}.{" "}
          <Link to="/desk" className="text-foreground underline-offset-4 hover:underline">
            Back to desk
          </Link>
        </div>
      )}
      <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-background/90 px-3 backdrop-blur-sm sm:px-6">
        <Button
          variant="ghost"
          size="icon-sm"
          className="md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </Button>
        <Link to="/portal">
          <HelixWordmark />
        </Link>
        <span className="hidden truncate text-sm text-muted-foreground sm:inline">{company}</span>
        <nav className="ml-4 hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm",
                  active ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Button asChild size="sm">
            <Link to="/portal/new">
              <Plus className="size-4" />
              New ticket
            </Link>
          </Button>
          <UserButton />
        </div>
      </header>
      <OfflineBar />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-6 pb-24 sm:px-6 md:pb-6">{children}</main>
      <nav className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-4 border-t border-border bg-card pb-[env(safe-area-inset-bottom)] md:hidden">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex min-h-12 flex-col items-center justify-center gap-0.5 text-[11px]",
                active ? "text-foreground" : "text-muted-foreground",
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
        <Link
          to="/get-app"
          className={cn(
            "flex min-h-12 flex-col items-center justify-center gap-0.5 text-[11px]",
            pathname.startsWith("/get-app") ? "text-foreground" : "text-muted-foreground",
          )}
        >
          <Smartphone className="size-4" />
          Install
        </Link>
      </nav>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="p-4">
          <HelixWordmark />
          <nav className="mt-6 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm hover:bg-accent"
              >
                {item.label}
              </Link>
            ))}
            <Link to="/get-app" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm hover:bg-accent">
              Phone & offline
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
