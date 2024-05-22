import Image from "next/image";

export default function MiniImagesSection({
  imageUrl,
  name,
}: {
  imageUrl: string;
  name: string;
}) {
  return (
    <section className="hidden lg:flex md:flex-col gap-4">
      <Image
        src={imageUrl}
        alt={name}
        width={100}
        height={100}
        className="object-cover border border-gray-400 rounded-sm"
      />
      <Image
        src={imageUrl}
        alt={name}
        width={100}
        height={100}
        className="object-cover border border-gray-400 rounded-sm"
      />
      <Image
        src={imageUrl}
        alt={name}
        width={100}
        height={100}
        className="object-cover border border-gray-400 rounded-sm"
      />
      <Image
        src={imageUrl}
        alt={name}
        width={100}
        height={100}
        className="object-cover border border-gray-400 rounded-sm"
      />
    </section>
  );
}
