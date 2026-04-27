"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SendIcon, CheckCircle2, AlertCircle } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";

export function ContactForm({ delay = 0 }: { delay?: number }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;

    // Strict email format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      setTimeout(() => setStatus("idle"), 5000);
      return;
    }

    formData.append("access_key", "226905d5-b6b7-4c70-ad91-0f5c7ae81183");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Something went wrong. Please try again.");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again later.");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <BlurFade delay={delay}>
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 mt-16">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Send a Message
          </h2>
          <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Have a question or want to work together? Drop me a message below!
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4">
        {/* Honeypot spam prevention */}
        <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 text-left">
            <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Your name"
            />
          </div>
          <div className="space-y-2 text-left">
            <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div className="space-y-2 text-left">
          <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Tell me about your project or question..."
          />
        </div>

        {/* Status messages */}
        {status === "success" && (
          <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 rounded-lg px-4 py-3">
            <CheckCircle2 className="size-4 flex-shrink-0" />
            <span>Message sent successfully! I&apos;ll get back to you soon.</span>
          </div>
        )}
        {status === "error" && (
          <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 rounded-lg px-4 py-3">
            <AlertCircle className="size-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <Button disabled={status === "submitting"} type="submit" className="w-full gap-2">
          {status === "submitting" ? (
            <>
              <span className="animate-spin">⏳</span> Sending...
            </>
          ) : status === "success" ? (
            <>
              <CheckCircle2 className="size-4" /> Sent!
            </>
          ) : (
            <>
              Send Message <SendIcon className="size-4" />
            </>
          )}
        </Button>
      </form>
    </BlurFade>
  );
}
