export function ProductFeatures({ features }: { features: string[] }) {
  return <section className="features-copy"><h2>FEATURES</h2>{features.map((feature) => <p key={feature}>{feature}</p>)}</section>
}
