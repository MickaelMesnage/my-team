export const computeShareTextToMessengerUrl = (text: string): string => {
  return `https://m.me/?text=${encodeURIComponent(text)}`;
};
