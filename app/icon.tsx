import { renderIcon } from "@/lib/iconImage";

export const size = { width: 192, height: 192 };
export const contentType = "image/png";

export default async function Icon() {
  return renderIcon(size.width);
}
