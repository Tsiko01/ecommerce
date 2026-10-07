export function Badge({ children = 'NEW PRODUCT' }: { children?: string }) {
  return <span className="eyebrow">{children}</span>
}
