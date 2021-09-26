import Layout from "../../components/layout";
import { useRouter } from "next/router";
import { getAllPostIds } from "../../lib/posts";

export function Post() {
  return <Layout>...</Layout>;
}

export default function FirstPost() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Layout>
      <h1>{id} Post</h1>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}
