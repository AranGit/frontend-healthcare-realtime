import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-md flex-col items-center justify-center py-16 px-8 bg-white dark:bg-black">
        <h1 className="mb-12 text-4xl font-bold text-black dark:text-zinc-50">
          Select your role
        </h1>
        <div className="flex w-full flex-col gap-6 sm:flex-row sm:justify-center">
          <Link href="/staff" className="w-full">
            <button className="cursor-pointer w-full rounded-md bg-blue-600 py-3 text-lg font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
              Staff
            </button>
          </Link>
          <Link href="/patient" className="w-full">
            <button className="cursor-pointer w-full rounded-md bg-green-600 py-3 text-lg font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400">
              Patient
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
