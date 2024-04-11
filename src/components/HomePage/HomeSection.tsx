export function HomeSection ({ children, bgColor, extraClassname }: { children: React.ReactNode, bgColor: string, extraClassname?: string }) {
  return (
    <section className={`bg-${bgColor} w-full h-fit`}>
      <div className={`wrapper grid lg:flex gap-10 lg:gap-6 py-24 lg:py-32 ${extraClassname}`}>
        {children}
      </div>
    </section>
  )
}