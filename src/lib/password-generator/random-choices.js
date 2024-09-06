/**
 * Randomly select choices from an array.
 *
 * @param {string|any[]} choices
 * @param {number} howMuch
 * @param {boolean} unique
 * @returns
 */
export const randomChoices = (choices, howMuch, unique = false) => {
  /**
   * @type {any[]}
   */
  const selected = [];

  let i = 0;
  while (i < howMuch) {
    const randomNums = new Uint32Array(1);
    self.crypto.getRandomValues(randomNums);
    const choice = choices[randomNums[0] % choices.length];
    if (unique && selected.includes(choice)) {
      continue;
    }

    selected.push(choice);
    i++;
  }

  return selected;
};
