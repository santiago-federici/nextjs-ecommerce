export function Wrapper ({ className, children }: { className?: string, children?: React.ReactNode }) {
  return (
    <section className={`wrapper ${className}`}>
      {children}
    </section>
  )
}