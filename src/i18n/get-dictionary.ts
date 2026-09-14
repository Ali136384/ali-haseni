import type { Locale } from "@/i18n/config";
import en from "@/i18n/dictionaries/en";
import tr from "@/i18n/dictionaries/tr";

const dictionaries = {
  en,
  tr,
};

export type Dictionary = typeof en;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return (dictionaries[locale] ?? dictionaries.en) as Dictionary;
}
