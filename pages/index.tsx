import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
      <Head>
        <title>Demo Section</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-6xl font-bold">Demo Section</h1>

      <p className="mt-3 text-lg">Disclaimer: Contrived examples were made</p>

      <div className="mt-6 flex flex-col max-w-4xl items-center justify-around sm:w-full">
        <Link href="/use-imperative-handle">
          <a className="mt-6 w-3/4 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600">
            <h3 className="text-2xl font-bold">useImperativeHandle</h3>
            <p className="mt-4 text-xl">
              Expose an internal method through refs
            </p>
          </a>
        </Link>

        <Link href="/use-debug-value">
          <a className="mt-6 w-3/4 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600">
            <h3 className="text-2xl font-bold">useDebugValue</h3>
            <p className="mt-4 text-xl">
              Debugging custom hooks within the devtools itself
            </p>
          </a>
        </Link>

        <Link href="/compound-components">
          <a className="mt-6 w-3/4 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600">
            <h3 className="text-2xl font-bold">Compound Components</h3>
            <p className="mt-4 text-xl">
              Using composition to build a component
            </p>
          </a>
        </Link>

        <Link href="/flexible-compound-components">
          <a className="mt-6 w-3/4 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600">
            <h3 className="text-2xl font-bold">Flexible Compound Components</h3>
            <p className="mt-4 text-xl">
              Even more flexibility with Compound Components
            </p>
          </a>
        </Link>
      </div>
    </main>
  );
};

export default Home;
