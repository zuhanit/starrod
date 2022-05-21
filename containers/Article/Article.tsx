import Comitter from "../../components/Media/Comitter";
import { AiFillGithub } from "react-icons/ai";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { MDXRemote } from "next-mdx-remote";

interface ArticleProps {
  title: string;
  lastModified: string;
  contributors: string[];
  src: MDXRemoteSerializeResult;
}

const Article = ({ title, lastModified, contributors, src }: ArticleProps) => {
  return (
    <article className="article">
      <style jsx>{`
        .article {
          display: flex;
          flex-direction: column;
          gap: 2em;
          max-width: 50%;
          padding: 2rem;
        }
        .title > h1 {
          margin: 4px 0px;
        }
        .subtitle {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .subtitle > .modified {
          color: var(--chassis);
        }

        .contributors > .contributors-icon {
          display: flex;
          gap: 4px;
        }
        .contributors > h3 {
          margin: 4px 0px;
        }
      `}</style>
      <section className="title">
        <h1>{title}</h1>
        <div className="subtitle">
          <AiFillGithub /> Edit page{" "}
          <span className="modified">Last modified: {lastModified}</span>
        </div>
      </section>
      <section className="content">
        <MDXRemote {...src} />
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
