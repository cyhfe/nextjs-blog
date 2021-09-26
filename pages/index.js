import Head from "next/head";
import Link from "next/link";
export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <img src="/images/profile.jpg" alt="profile" />
        <Link href="/posts/first-post">
          <a>to post</a>
        </Link>
      </div>
    </div>
  );
}
