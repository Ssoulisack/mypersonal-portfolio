"use client";

import React from "react";
import Link from "next/link";
import {
  Calendar,
  Github,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface NavbarContactDialogButtonProps {
  label: string;
  href?: string;
  isActive: boolean;
}

export function NavbarContactDialogButton({
  label,
  href,
  isActive,
}: NavbarContactDialogButtonProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`text-[var(--nav-fg)] rounded-3xl transition px-3 sm:px-4 py-1.5 sm:py-2 text-sm cursor-pointer ${
            isActive ? "bg-white/10" : "bg-transparent"
          }`}
        >
          {label}
        </Button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="fixed inset-x-0 bottom-0 top-auto left-1/2 z-[9999] mx-auto flex h-auto w-full max-w-xl -translate-x-1/2 translate-y-0 flex-col rounded-t-[10px] border bg-background px-6 pb-6 pt-4 sm:px-8"
      >
        {/* Accessible title for screen readers (visually hidden) */}
        <DialogTitle className="sr-only">
          Quick connect and book a call
        </DialogTitle>

        {/* Drag handle */}
        <div className="mx-auto mt-1 h-2 w-[100px] rounded-full bg-black/10 dark:bg-muted" />

        {/* Social links row */}
        <div className="my-6 flex justify-center gap-4">
          <a
            className="text-neutral-900 transition-colors hover:text-neutral-700 dark:text-neutral-300 dark:hover:text-neutral-100"
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only">LinkedIn</span>
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            className="text-neutral-900 transition-colors hover:text-neutral-700 dark:text-neutral-300 dark:hover:text-neutral-100"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only">GitHub</span>
            <Github className="h-5 w-5" />
          </a>
          <a
            className="text-neutral-900 transition-colors hover:text-neutral-700 dark:text-neutral-300 dark:hover:text-neutral-100"
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only">Twitter / X</span>
            <Twitter className="h-5 w-5" />
          </a>
        </div>

        {/* Quick actions grid */}
        <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Email card */}
          <a
            className="group block overflow-hidden rounded-lg border bg-white/40 transition-all duration-300 dark:bg-neutral-800/30"
            href="mailto:hello@example.com"
            aria-label="Email"
          >
            <div className="flex gap-x-3 border-b border-neutral-200 bg-gradient-to-r from-blue-900/20 to-transparent p-4 dark:border-neutral-700/30">
              <Mail className="h-6 w-6 text-blue-400" />
              <h3 className="mb-1 text-base font-medium text-black dark:text-white">
                Email
              </h3>
            </div>
            <div className="p-4">
              <div className="flex items-center text-sm font-medium text-neutral-700 transition-all duration-300 group-hover:text-black dark:text-neutral-200 dark:group-hover:text-white">
                hello@example.com
              </div>
              <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                Send me an email directly
              </p>
            </div>
          </a>

          {/* Book a call card */}
          <Link
            href={href || "/book-a-call"}
            className="group block overflow-hidden rounded-lg border bg-white/40 transition-all duration-300 dark:bg-neutral-800/30"
            aria-label="Book a Call"
          >
            <div className="flex gap-x-3 border-b border-neutral-200 bg-gradient-to-r from-purple-900/20 to-transparent p-4 dark:border-neutral-700/30">
              <Calendar className="h-6 w-6 text-purple-400" />
              <h3 className="mb-1 text-base font-medium text-black dark:text-white">
                Book a Call
              </h3>
            </div>
            <div className="p-4">
              <div className="flex items-center text-sm font-medium text-neutral-700 transition-all duration-300 group-hover:text-black dark:text-neutral-200 dark:group-hover:text-white">
                Schedule a time slot
              </div>
              <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                Book a call on my calendar
              </p>
            </div>
          </Link>
        </div>

        {/* Availability pill */}
        <div className="mt-4 flex items-center justify-center rounded-md border border-green-400/20 bg-green-400/10 p-2.5 text-center dark:border-green-900/30 dark:bg-green-900/10">
          <div className="relative mr-2 flex h-3 w-3 items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-green-600 dark:bg-green-500" />
            <div className="absolute h-3 w-3 animate-ping rounded-full bg-green-600 opacity-75 dark:bg-green-500" />
          </div>
          <p className="text-sm text-green-700 dark:text-green-300">
            Currently available for new opportunities
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}


