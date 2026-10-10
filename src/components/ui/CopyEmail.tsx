"use client";

import { useEffect, useRef, useState } from "react";

const LABELS = {
  idle: "Copy email",
  copied: "Copied",
  failed: "Couldn't copy. Use the email link.",
} as const;

export function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<keyof typeof LABELS>("idle");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    window.clearTimeout(timer.current);
    try {
      if (!navigator.clipboard) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(email);
      setState("copied");
      timer.current = window.setTimeout(() => setState("idle"), 2000);
    } catch {
      setState("failed");
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center rounded-full bg-mustard px-6 py-3.5 font-semibold text-enamel transition-transform duration-300 ease-snap hover:-translate-y-0.5"
    >
      <span aria-live="polite">{LABELS[state]}</span>
    </button>
  );
}
