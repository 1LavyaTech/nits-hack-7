import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const generateGoogleDriveDownloadLink = (fileLink: string) => {
  if (!fileLink || !fileLink.includes("/file/d/")) {
    return null;
  }

  const fileId = fileLink.split("/d/")[1].split("/")[0];
  const downloadLink = `https://drive.google.com/uc?id=${fileId}&export=download`;

  return downloadLink;
};
