import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex min-h-svh max-w-[1280px] flex-col justify-center px-4 py-32 md:px-8">
      <h1 className="max-w-[16ch] text-[clamp(2.4rem,6vw,4.6rem)] font-[750]">This page isn&apos;t on the machine.</h1>
      <Link href="/" className="mt-10 w-fit font-semibold underline decoration-2 underline-offset-[6px]">
        Back to the home page
      </Link>
    </main>
  );
}
