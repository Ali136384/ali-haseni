"use server";

import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export type ContactState = {
  ok: boolean;
  message: string;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const localeValue = String(formData.get("locale") ?? "en");
  const locale = isLocale(localeValue) ? localeValue : "en";
  const dict = await getDictionary(locale);

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return {
      ok: false,
      message: dict.contact.errors.required,
    };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      ok: false,
      message: dict.contact.errors.email,
    };
  }

  console.log("[contact]", { locale, name, email, message });

  return {
    ok: true,
    message: dict.contact.success,
  };
}
