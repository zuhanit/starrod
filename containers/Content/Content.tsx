import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { Documentation } from "../../types/IDocumentation";
import Article from "../Article/Article";
import Sidebar from "../Sidebar/Sidebar";

interface MainContentProps {
  docs: Documentation;
  matter: { [key: string]: any };
  mdxResult: MDXRemoteSerializeResult;
}

const MainContent = ({ docs, matter, mdxResult }: MainContentProps) => {
  return (
    <div className="content">
      <style jsx>{`
        .content {
          display: flex;
          min-height: 1000px;
          background: var(--background);
        }
      `}</style>
      <Sidebar />
      <Article
        contributors={["zuhanit"]}
        lastModified="0"
        src={mdxResult}
        title={matter["title"]}
      />
    </div>
  );
};

export default MainContent;
