export function SectionTitle ({ title }: { title: string }) {
  return (
    <h2 className="text-3xl md:text-4xl underline underline-offset-4 uppercase z-10">{title}</h2>
  )
}