export function truncateString(str: string, num: number) {
  if (str?.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}

export function truncatedAddress(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}
