export function ProductIncludes({ items }: { items: { item: string; quantity: number }[] }) {
  return <section className="includes"><h2>IN THE BOX</h2><ul>{items.map((entry) => <li key={entry.item}><span>{entry.quantity}x</span>{entry.item}</li>)}</ul></section>
}
