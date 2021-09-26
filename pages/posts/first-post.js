import Link from "next/link";
import Image from "next/image";
import Layout from "../../components/layout";
export default function Post() {
  return (
    <Layout>
      <div>
        <Image
          src="/images/profile.jpg"
          height={144}
          width={144}
          alt="Your Name"
        />
        <Link href="/">
          <a>to home</a>
        </Link>
      </div>
    </Layout>
  );
}
