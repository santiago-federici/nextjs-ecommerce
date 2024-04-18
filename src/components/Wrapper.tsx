export function Wrapper ({ className, children }: { className?: string, children?: React.ReactNode }) {
  return (
    <section className={`wrapper py-24 lg:py-32 ${className}`}>
      {children}
    </section>
  )
}