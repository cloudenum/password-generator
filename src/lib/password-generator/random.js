import { randomChoices } from "./random-choices";

const alphabets = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+~`|}{[]\\:;?><,./-=";

/**
 * Generate a random password
 *
 * @param {number} length
 * @param {boolean} hasNumber
 * @param {boolean} hasSymbol
 * @returns
 */
export const random = (length, hasNumber = true, hasSymbol = true) => {
  let chars = alphabets;
  chars += hasNumber ? numbers : "";
  chars += hasSymbol ? symbols : "";
  return randomChoices(chars, length).join("");
};
