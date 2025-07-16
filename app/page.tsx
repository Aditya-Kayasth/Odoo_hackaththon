import Image from "next/image";

export default function Home() {
  return (
    <h1 className="text-3xl font-bold underline w-full text-center mt-10">
      Welcome to the Full Stack Blog Next.js App!
      <Image src="/logo.svg" alt="Logo" width={50} height={50} className="inline-block ml-5" />
    </h1>
  )
}
