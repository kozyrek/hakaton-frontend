export const inflectWords = (value, words) => {
    const number = value % 10;
    if (number === 1) return words[0];
    if (number >= 2 && number <= 4) return words[1];
    if (number >= 5 || number <= 0) return words[2];
}
