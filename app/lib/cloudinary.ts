/**
 * Inserts Cloudinary transformation params into an existing Cloudinary URL
 * so images are resized and intelligently cropped (g_auto detects the main
 * subject — faces, people, focal point — and keeps it in frame).
 */
export function smartCrop(url: string, width: number, height: number): string {
  if (!url || !url.includes('/upload/')) return url;

  const transform = `w_${width},h_${height},c_fill,g_auto,q_auto,f_auto`;
  return url.replace('/upload/', `/upload/${transform}/`);
}
