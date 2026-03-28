/**
 * Extracts a YouTube video id from common watch / share URLs for embed use.
 */
export function parseYoutubeVideoId(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  let urlString = trimmed;
  if (!/^https?:\/\//i.test(urlString)) {
    urlString = `https://${urlString}`;
  }

  let url: URL;
  try {
    url = new URL(urlString);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^www\./i, "").toLowerCase();

  if (host === "youtu.be") {
    const id = url.pathname.split("/").filter(Boolean)[0];
    return id ?? null;
  }

  if (
    host === "youtube.com" ||
    host === "m.youtube.com" ||
    host === "music.youtube.com"
  ) {
    if (url.pathname.startsWith("/embed/")) {
      return url.pathname.slice("/embed/".length).split("/")[0] || null;
    }
    if (url.pathname.startsWith("/shorts/")) {
      return url.pathname.slice("/shorts/".length).split("/")[0] || null;
    }
    const v = url.searchParams.get("v");
    return v?.trim() || null;
  }

  return null;
}
