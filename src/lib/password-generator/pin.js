import { randomChoices } from "./random-choices";

const numbers = "0123456789";

/**
 * Generate a random PIN
 *
 * @param {number} length
 * @returns
 */
export const pin = (length) => {
  return randomChoices(numbers, length).join("");
};
