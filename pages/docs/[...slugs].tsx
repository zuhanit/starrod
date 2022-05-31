import { GetStaticPaths, GetStaticProps } from "next";
import { getDocumentations } from "../api/docs";
import { Documentation } from "../../types/IDocumentation";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import Header from "../../containers/Header/Header";
import MainContent from "../../containers/Content/Content";
import Head from "next/head";
import rehypeSlug from "rehype-slug";
import { getDocumentationsWithSlugs } from "../api/docs/[...gid]";

interface ContentPageProps {
  docs: Documentation;
  mdxResult: MDXRemoteSerializeResult;
  matter: { [key: string]: any };
}

const ContentPage = ({ docs, mdxResult, matter }: ContentPageProps) => {
  return (
    <div>
      <style jsx>{`
        div {
          height: 100vh;
        }
      `}</style>
      <Head>
        <title>{matter["title"]} ─ Starrod</title>
      </Head>
      <Header />
      <MainContent
        docs={docs}
        mdxResult={mdxResult}
        matter={matter}
      ></MainContent>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const docs = getDocumentations();
  const paths = docs.map((doc) => ({
    params: {
      slugs: doc.path.replace("docs/", "").replace(".mdx", "").split("/"),
    },
  }));
  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ContentPageProps> = async (ctx) => {
  const { slugs } = ctx.params as { slugs: string[] };
  const data = getDocumentationsWithSlugs(slugs);

  if (data && !Array.isArray(data)) {
    const { content, data: matterData } = matter(data.src);
    const mdxResult = await serialize(content, {
      mdxOptions: {
        rehypePlugins: [rehypeSlug],
        remarkPlugins: [require("remark-prism")],
      },
    });
    return {
      props: {
        docs: data,
        mdxResult: mdxResult,
        matter: matterData,
      },
    };
  }

  return { notFound: true };
};

export default ContentPage;
