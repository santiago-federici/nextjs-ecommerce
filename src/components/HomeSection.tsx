export function HomeSection ({ children, extraClassName }: { children: React.ReactNode, extraClassName?: string }) {
  return (
    <article className={`grid gap-14 place-items-center mt-20 md:mt-28 relative ${extraClassName}`}>
      {children}
    </article>
  )
}