import { GetStaticPaths, GetStaticProps } from "next";
import axios from "axios";
import { DocumentationAPIResponse } from "../api/docs";
import { Documentation, DocumentationMatter } from "../../types/IDocumentation";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import Header from "../../containers/Header/Header";
import MainContent from "../../containers/Content/Content";
import Head from "next/head";
import rehypeSlug from "rehype-slug";

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
  return {
    paths: [
      {
        params: {
          slugs: [""],
        },
      },
    ],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<ContentPageProps> = async (ctx) => {
  const { slugs } = ctx.params as { slugs: string[] };
  try {
    const { data } = await axios.get<DocumentationAPIResponse>(
      `http://localhost:3000/api/docs/${slugs.join("/")}`
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
