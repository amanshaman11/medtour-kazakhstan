/** Hash links on subpages must point to the homepage. */
export function homeHref(href: string): string {
  if (
    href.startsWith("#") ||
    href.startsWith("tel:") ||
    href.startsWith("mailto:") ||
    href.startsWith("http")
  ) {
    return href.startsWith("#") ? `/${href}` : href;
  }
  return href;
}
