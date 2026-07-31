/**
 * Inserts Cloudinary transformation params into an existing Cloudinary URL
 * so images are resized and intelligently cropped.
 *
 * g_auto:face prioritizes face detection when choosing the crop region
 * (falls back automatically to Cloudinary's general subject-detection
 * algorithm if no face is found), which is more accurate than plain
 * g_auto for player/person-focused sports images.
 */
export function smartCrop(url: string, width: number, height: number): string {
  if (!url || !url.includes('/upload/')) return url;

  const transform = `w_${width},h_${height},c_fill,g_auto:face,q_auto:good,f_auto,dpr_auto`;
  return url.replace('/upload/', `/upload/${transform}/`);
}
