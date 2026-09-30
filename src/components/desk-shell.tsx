import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  Building2,
  Inbox,
  LayoutDashboard,
  Menu,
  MessageCircle,
  Radio,
  Smartphone,
  Ticket,
  BarChart3,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { UserButton } from "@/lib/auth/gates";
import type { Actor } from "@/lib/desk/types";
import { cn } from "@/lib/utils";
import { HelixWordmark } from "@/components/helix-mark";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { CommandSearch } from "@/components/command-search";
import { OfflineBar } from "@/components/connectivity";

const NAV = [
  { to: "/desk", label: "Home", icon: LayoutDashboard, exact: true },
  { to: "/desk/inbox", label: "Inbox", icon: Inbox, exact: false },
  { to: "/desk/tickets", label: "Tickets", icon: Ticket, exact: false },
  { to: "/desk/clients", label: "Clients", icon: Building2, exact: false },
  { to: "/desk/knowledge", label: "Knowledge", icon: BookOpen, exact: false },
  { to: "/desk/channels", label: "Channels", icon: Radio, exact: false },
  { to: "/desk/reports", label: "Reports", icon: BarChart3, exact: false },
] as const;

const MOBILE_NAV = [
  { to: "/desk", label: "Home", icon: LayoutDashboard, exact: true },
  { to: "/desk/inbox", label: "Inbox", icon: Inbox, exact: false },
  { to: "/desk/tickets", label: "Tickets", icon: Ticket, exact: false },
  { to: "/desk/clients", label: "Clients", icon: Building2, exact: false },
] as const;

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-0.5">
      {NAV.map((item) => {
        const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={cn(
              "flex h-11 items-center gap-2.5 rounded-lg px-3 text-sm transition-colors",
              active
                ? "bg-accent text-foreground"
                : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
            )}
          >
            <Icon className="size-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function DeskShell({ actor, children }: { actor: Actor; children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const company = actor.kind === "staff" ? actor.profile.company : actor.company;

  return (
    <div className="flex min-h-dvh bg-background">
      <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r border-border bg-card md:flex">
        <div className="flex h-14 items-center px-4">
          <Link to="/desk">
            <HelixWordmark />
          </Link>
        </div>
        <div className="px-3 pb-3">
          <p className="truncate px-3 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
            {company}
          </p>
        </div>
        <div className="flex-1 overflow-y-auto px-3">
          <NavLinks pathname={pathname} />
        </div>
        <div className="border-t border-border p-3">
          <Link
            to="/get-app"
            className="mb-1 flex h-10 items-center gap-2.5 rounded-lg px-3 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <Smartphone className="size-4" />
            Phone & offline
          </Link>
          <Link
            to="/portal"
            className="mb-3 flex h-10 items-center gap-2.5 rounded-lg px-3 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <MessageCircle className="size-4" />
            Client portal
          </Link>
          <div className="px-1">
            <UserButton />
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-background/90 px-3 backdrop-blur-sm sm:px-5">
          <Button
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </Button>
          <div className="min-w-0 flex-1">
            <CommandSearch />
          </div>
          <Link
            to="/get-app"
            className="hidden h-9 items-center gap-1.5 rounded-md px-2 text-xs text-muted-foreground hover:text-foreground sm:flex"
          >
            <Smartphone className="size-3.5" />
            Install
          </Link>
          {actor.kind === "staff" && actor.profile.deskCode && (
            <span className="hidden font-mono text-[11px] text-muted-foreground lg:inline">
              Desk {actor.profile.deskCode}
            </span>
          )}
        </header>
        <OfflineBar />
        <main className="flex min-h-0 flex-1 flex-col pb-16 md:pb-0">{children}</main>
        <nav className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-4 border-t border-border bg-card pb-[env(safe-area-inset-bottom)] md:hidden">
          {MOBILE_NAV.map((item) => {
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
        </nav>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="flex flex-col p-0">
          <div className="flex h-14 items-center px-4">
            <HelixWordmark />
          </div>
          <div className="flex-1 overflow-y-auto px-3">
            <NavLinks pathname={pathname} onNavigate={() => setOpen(false)} />
          </div>
          <div className="border-t border-border p-3">
            <Link
              to="/get-app"
              onClick={() => setOpen(false)}
              className="mb-1 flex h-10 items-center gap-2.5 rounded-lg px-3 text-sm text-muted-foreground"
            >
              <Smartphone className="size-4" />
              Phone & offline
            </Link>
            <Link
              to="/portal"
              onClick={() => setOpen(false)}
              className="mb-3 flex h-10 items-center gap-2.5 rounded-lg px-3 text-sm text-muted-foreground"
            >
              <MessageCircle className="size-4" />
              Client portal
            </Link>
            <UserButton />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
