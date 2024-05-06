import Image from "next/image";

interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default function VerifyEmail({ searchParams }: Props) {
  const token = searchParams.token;
  const toEmail = searchParams.to;

  return token && typeof token === "string" ? (
    <div></div>
  ) : (
    <section className="grid place-items-center mt-16">
      <Image
        src={"/verify-email.jpeg"}
        alt="Image to verify your email"
        width={300}
        height={300}
        className="rounded-md"
      />

      <h3 className="mt-8 mb-4">Check your email</h3>

      <p className="text-lg text-center">
        We&apos;ve sent a verification link to
        {toEmail ? (
          <span className="font-semibold block"> {toEmail}</span>
        ) : (
          <span className="block"> your email</span>
        )}
      </p>
    </section>
  );
}
