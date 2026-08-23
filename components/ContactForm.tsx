"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import MagneticButton from "./ui/MagneticButton";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-4 rounded-3xl border border-mint/30 bg-mint/10 px-8 py-16 text-center"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-mint text-ink">
          <Check size={22} />
        </span>
        <h3 className="font-display text-2xl font-semibold text-ink">Message sent</h3>
        <p className="max-w-sm text-ink-dim">
          We usually reply within one business day. In the meantime, your pet deserves a treat.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="font-mono text-xs uppercase tracking-wide text-coral underline underline-offset-4"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-mono text-xs uppercase tracking-wide text-ink-dimmer">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className="rounded-2xl border border-ink/12 bg-void-softer px-5 py-3.5 text-sm text-ink placeholder:text-ink-dimmer focus:border-mint focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-mono text-xs uppercase tracking-wide text-ink-dimmer">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@email.com"
            className="rounded-2xl border border-ink/12 bg-void-softer px-5 py-3.5 text-sm text-ink placeholder:text-ink-dimmer focus:border-mint focus:outline-none"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="font-mono text-xs uppercase tracking-wide text-ink-dimmer">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your pet (we mean it, tell us)"
          className="resize-none rounded-2xl border border-ink/12 bg-void-softer px-5 py-3.5 text-sm text-ink placeholder:text-ink-dimmer focus:border-mint focus:outline-none"
        />
      </div>
      {status === "error" && (
        <p className="text-sm text-coral">
          Something went wrong on our end — try again in a moment.
        </p>
      )}
      <MagneticButton type="submit" variant="solid" cursorLabel="Send" className="mt-2 self-start">
        {status === "loading" ? "Sending…" : "Send message"}
      </MagneticButton>
    </form>
  );
}
