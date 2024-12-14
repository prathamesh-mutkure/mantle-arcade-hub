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

export function generateRandomImageUrl(
  address: string | `0x${string}` | undefined
) {
  if (!address) {
    return "/profile.jpg";
  }

  const seed = address.slice(2, 10);

  return `https://api.dicebear.com/9.x/pixel-art/svg?seed=${seed}`;
}
