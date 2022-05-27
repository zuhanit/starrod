import Comitter from "../../components/Media/Comitter";
import { AiFillGithub } from "react-icons/ai";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Link from "next/link";
import { Documentation } from "../../types/IDocumentation";
import { MDXProvider } from "@mdx-js/react";
import { components } from "../../components/mdx-theme/starrod-mdx-theme";
interface ArticleProps {
  docs: Documentation;
  src: MDXRemoteSerializeResult;
  matter: { [key: string]: any };
}

const Article = ({ docs, src, matter }: ArticleProps) => {
  const contributors = ["zuhanit"];
  return (
    <article className="article">
      <style jsx>{`
        .article {
          display: flex;
          flex-direction: column;
          gap: 2em;
          max-width: 65%;
        }

        .title > h1 {
          margin-bottom: 8px;
        }

        .subtitle {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .subtitle > .modified {
          color: var(--text-darker);
        }

        .contributors > .contributors-icon {
          display: flex;
          margin-top: 14px;
          gap: 4px;
        }
        .contributors > h3 {
          margin: 4px 0px;
        }

        footer {
          background: var(--background-darker);
          height: 50px;
        }
      `}</style>
      <section className="title">
        <h1>{matter["title"]}</h1>
        <div className="subtitle">
          <AiFillGithub />{" "}
          <Link
            href={`https://www.github.com/zuhanit/starrod/docs/${docs.path}`}
          >
            Edit page
          </Link>
          <span className="modified">Last modified: {docs.date}</span>
        </div>
      </section>
      <section className="content">
        <MDXProvider components={components}>
          <MDXRemote {...src} />
        </MDXProvider>
      </section>
      <section className="contributors">
        <h3>{contributors.length} Contributors</h3>
        <div className="contributors-icon" key="Contributors Icon">
          {contributors.map((contributor) => (
            <Comitter name={contributor} key={contributor} />
          ))}
        </div>
      </section>
    </article>
  );
};

export default Article;
