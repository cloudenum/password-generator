import _ from "lodash";
import { randomChoices } from "./random-choices";
import { pin } from "./pin";

/**
 * @type {{ [locale: string]: string[]}}
 */
let wordlist = {
  en: [],
  id: []
};

const fetchWordlist = async (/** @type {string} */ locale) => {
  const response = await fetch(`/wordlists/${locale}/wordlist.txt`);

  if (!response.ok) {
    throw new Error("Failed to fetch wordlist");
  }

  const data = await response.text();
  return data.split("\n");
};

/**
 * Generate a memorable password
 *
 * @param {number} wordCount
 * @param {string} locale
 * @param {boolean} capitalizeEachWord
 * @param {boolean} hasNumber
 * @returns
 */
export const memorable = async (
  wordCount,
  locale = "id",
  capitalizeEachWord = false,
  hasNumber = false
) => {
  if (!wordlist[locale]?.length) {
    wordlist[locale] = await fetchWordlist(locale);
  }

  let password = "";
  const selectedWords = randomChoices(wordlist[locale], wordCount, true);

  for (const word of selectedWords) {
    let currentWord = capitalizeEachWord ? word.charAt(0).toUpperCase() + word.slice(1) : word;
    password += `${currentWord}-`;
  }

  if (hasNumber) {
    password += pin(4);
  }

  return _.trimEnd(password, "-");
};
