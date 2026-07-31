/**
 * Inserts Cloudinary transformation params into an existing Cloudinary URL
 * so images are resized and intelligently cropped.
 *
 * g_auto:face prioritizes face detection when choosing the crop region
 * (falls back to general subject detection if no face is found).
 * z_0.75 zooms OUT 25% from the tightest face-fit, leaving headroom so
 * the top of the head/hair isn't clipped.
 */
export function smartCrop(url: string, width: number, height: number): string {
  if (!url || !url.includes('/upload/')) return url;

  const transform = `w_${width},h_${height},c_fill,g_auto:face,z_0.75,q_auto:good,f_auto,dpr_auto`;
  return url.replace('/upload/', `/upload/${transform}/`);
}
