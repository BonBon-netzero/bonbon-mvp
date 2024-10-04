export const addressShorten = (
  address: string,
  num?: number,
  numsPrefix?: number
) => {
  if (!address) return "";
  if (!num) num = 3;
  if (num >= address.length / 2) return address;
  const prefix = address.slice(0, numsPrefix ? numsPrefix : num + 2);
  const suffix = address.slice(-num, address.length);
  return `${prefix}...${suffix}`;
};
