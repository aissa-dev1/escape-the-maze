export function createStyle(
  root: HTMLElement,
  styles?: Partial<CSSStyleDeclaration>
) {
  if ("undefined" === typeof styles) return;

  for (const key in styles) {
    if ("undefined" === typeof styles[key]) continue;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    root.style[key as any] = styles[key]!;
  }
}
