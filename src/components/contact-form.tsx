"use client";

import { useActionState } from "react";
import {
  submitContact,
  type ContactState,
} from "@/app/actions/contact";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

const initialState: ContactState = {
  ok: false,
  message: "",
};

type ContactFormProps = {
  locale: Locale;
  dict: Dictionary["contact"];
};

export function ContactForm({ locale, dict }: ContactFormProps) {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState,
  );

  return (
    <form action={formAction} className="mt-8 max-w-xl space-y-5">
      <input type="hidden" name="locale" value={locale} />
      <div>
        <label htmlFor="name" className="block text-sm text-ink-soft">
          {dict.name}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="mt-2 w-full border border-line bg-white/50 px-4 py-3 text-ink outline-none transition focus:border-teal"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm text-ink-soft">
          {dict.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-2 w-full border border-line bg-white/50 px-4 py-3 text-ink outline-none transition focus:border-teal"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm text-ink-soft">
          {dict.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-2 w-full resize-y border border-line bg-white/50 px-4 py-3 text-ink outline-none transition focus:border-teal"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="bg-[#0d6b66] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#094f4b] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? dict.sending : dict.send}
      </button>
      {state.message ? (
        <p
          role="status"
          className={`text-sm ${state.ok ? "text-teal-deep" : "text-red-700"}`}
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
