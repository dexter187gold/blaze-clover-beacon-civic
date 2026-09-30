import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  ArrowRight,
  CloudOff,
  Monitor,
  Radio,
  Smartphone,
  Wifi,
} from "lucide-react";
import { HelixWordmark } from "@/components/helix-mark";
import { Button } from "@/components/ui/button";
import { InstallHelixButton, PrimeDeviceButton } from "@/components/connectivity";
import { displayStandalone } from "@/lib/offline";
import { useState } from "react";

export const Route = createFileRoute("/get-app")({ component: GetApp });

function GetApp() {
  const [standalone] = useState(() => displayStandalone());

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4">
        <Link to="/">
          <HelixWordmark />
        </Link>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/login">Sign in</Link>
        </Button>
      </header>

      <main className="mx-auto max-w-3xl px-4 pb-24 pt-8">
        <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
          Phone · Windows · Offline
        </p>
        <h1 className="font-display mt-3 text-4xl leading-[1.1] tracking-tight italic">
          Run Helix on your phone, then take the desk offline.
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Helix is a web app. You do not need Grok, an APK, or a Windows installer
          to use it day to day. Open it in Chrome, install it like a native app,
          sign in once while you have signal, then prime the phone so tickets stay
          readable in the field.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <InstallHelixButton />
          <PrimeDeviceButton />
        </div>
        {standalone && (
          <p className="mt-3 text-sm text-resolved">Running as an installed app on this device.</p>
        )}

        <ol className="mt-12 space-y-6">
          <Step n="01" title="Publish once, then leave Grok behind">
            <p>
              Use Publish in this chat. Helix receives its own web address. Share
              that address with your technicians and clients. After that, nobody
              needs Grok to sign in, open tickets, or run the desk.
            </p>
            <p className="mt-2">
              Daily sign-in is email, Google, or X. Staff land on the management
              desk. Clients join with your desk code and land on the client portal.
            </p>
          </Step>

          <Step n="02" title="Android — test before you go live" icon={<Smartphone className="size-4" />}>
            <p>
              You do not sideload an APK. Chrome on Android is the test bed, and
              it is the live product.
            </p>
            <ol className="mt-3 list-decimal space-y-2 pl-5">
              <li>Open the published Helix address in Chrome — not in-app browsers, not Facebook’s browser.</li>
              <li>Sign in as staff while you still have data or Wi-Fi.</li>
              <li>
                Tap the Chrome menu (three dots) → <strong className="text-foreground">Add to Home screen</strong> or{" "}
                <strong className="text-foreground">Install app</strong>.
              </li>
              <li>Open Helix from the new home-screen icon so it runs full-screen.</li>
              <li>
                Come back to this page and tap <strong className="text-foreground">Prime this phone for offline</strong>.
                That stores tickets, clients, and knowledge on the device.
              </li>
              <li>
                Turn on Airplane mode. Re-open Helix from the home screen. You should
                still see the last queue, open a ticket, and draft a reply. Replies
                sit on the phone until you have signal again.
              </li>
            </ol>
            <p className="mt-3">
              If Chrome does not offer Install, the page is probably inside a
              preview frame. Publish first, then open the public address on the
              phone itself.
            </p>
          </Step>

          <Step n="03" title="Windows — the desk as an app" icon={<Monitor className="size-4" />}>
            <p>
              There is no separate .exe to download. Chrome and Edge install Helix
              as a desktop app with its own window and taskbar icon — that is the
              Windows bonus.
            </p>
            <ol className="mt-3 list-decimal space-y-2 pl-5">
              <li>Open Helix in Chrome or Edge on the PC.</li>
              <li>
                Chrome: the install icon in the address bar, or Menu →{" "}
                <strong className="text-foreground">Save and share → Install Helix</strong>.
              </li>
              <li>
                Edge: Menu → <strong className="text-foreground">Apps → Install this site as an app</strong>.
              </li>
              <li>Pin it to the taskbar. Launch it like any other Windows program.</li>
            </ol>
          </Step>

          <Step n="04" title="What works offline vs what needs the network" icon={<CloudOff className="size-4" />}>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="flex items-center gap-2 text-sm font-medium">
                  <CloudOff className="size-4" />
                  Works with no signal
                </p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>Open the installed app</li>
                  <li>Read the last ticket queue and threads</li>
                  <li>Browse clients and knowledge articles</li>
                  <li>Draft replies and new tickets (they queue)</li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="flex items-center gap-2 text-sm font-medium">
                  <Wifi className="size-4" />
                  Needs a connection
                </p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>First sign-in on a new device</li>
                  <li>WhatsApp and Facebook inbound webhooks</li>
                  <li>Seeing another technician’s latest reply</li>
                  <li>Sending the queued work off the phone</li>
                </ul>
              </div>
            </div>
          </Step>

          <Step n="05" title="WhatsApp, Facebook, and the browser" icon={<Radio className="size-4" />}>
            <p>
              Channels are connected on the desk under Channels. Point Meta’s
              WhatsApp Cloud API and Page webhooks at the URLs shown there. The
              phone app does not replace WhatsApp — inbound chats still become
              tickets on the desk, and you can work those tickets from the
              installed Android app.
            </p>
          </Step>
        </ol>

        <div className="mt-12 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/login">
              Open the desk
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/">Back to Helix</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}

function Step({
  n,
  title,
  children,
  icon,
}: {
  n: string;
  title: string;
  children: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <li className="rounded-2xl border border-border bg-card p-5">
      <p className="flex items-center gap-2 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
        {icon}
        {n}
      </p>
      <h2 className="mt-2 text-lg font-semibold tracking-tight">{title}</h2>
      <div className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </li>
  );
}
