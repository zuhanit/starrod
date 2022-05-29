import { GetStaticPaths, GetStaticProps } from "next";
import axios from "axios";
import { DocumentationAPIResponse, getDocumentations } from "../api/docs";
import { Documentation, DocumentationMatter } from "../../types/IDocumentation";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import Header from "../../containers/Header/Header";
import MainContent from "../../containers/Content/Content";
import Head from "next/head";
import rehypeSlug from "rehype-slug";
import path from "path";

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
      slugs: doc.path.replace(".mdx", "").split("/"),
    },
  }));
  return {
    paths: paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<ContentPageProps> = async (ctx) => {
  const { slugs } = ctx.params as { slugs: string[] };
  try {
    const { data } = await axios.get<DocumentationAPIResponse>(
      `https://starrod.vercel.app/api/docs/${slugs.join("/")}`
    );
    if (Array.isArray(data.docs)) return { notFound: true };
    const { content, data: matterData } = matter(data.docs!.src);
    const mdxResult = await serialize(content, {
      mdxOptions: {
        rehypePlugins: [rehypeSlug],
        remarkPlugins: [require("remark-prism")],
      },
    });
    return {
      props: {
        docs: data["docs"] as Documentation,
        mdxResult: mdxResult,
        matter: matterData,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default ContentPage;
