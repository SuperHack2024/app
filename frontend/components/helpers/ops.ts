import { v4 as uuidv4 } from "uuid";

export const fetcher = (url: string) =>
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  });

export function shortenString(str: string): string {
  const maxLength = 10;

  if (str.length <= maxLength) {
    return str;
  }

  const start = str.slice(0, 5);
  const end = str.slice(-5);

  return `${start}...${end}`;
}

export function formatDateTime(dateString: string): string {
  const dateObj = new Date(dateString);

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  const seconds = String(dateObj.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
export function bigIntToEth(bigIntValue: bigint) {
  const numberValue = Number(bigIntValue);

  const ethValue = numberValue / 1e18;
  return ethValue;
}

export function generateRandomBytes32() {
  const uuid = uuidv4();
  const bytes32 = `0x${uuid.replace(/-/g, "")}`.padEnd(66, "0");
  return bytes32;
}
