import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { useContext } from "react";
import { remark } from "remark";
import remarkFrontmatter from "remark-frontmatter";
import { selectAll } from "unist-util-select";
import Breadcrumbs from "../../components/Navigation/Breadcrumbs";
import CategoryContext from "../../context/CategoryContext";
import { useDocsIndex } from "../../hooks/useDocumentation";
import { Index } from "../../pages/api/docs/index/index";
import { Documentation } from "../../types/IDocumentation";
import Article from "../Article/Article";
import ArticleNavigator from "../Article/ArticleNavigator";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import { Heading } from "mdast";

import { toString } from "mdast-util-to-string";
import ArticleIndexItem from "../../components/Navigation/ArticleIndexItem";
import ArticleIndex from "../../components/Navigation/ArticleIndex";
interface MainContentProps {
  docs: Documentation;
  matter: { [key: string]: any };
  mdxResult: MDXRemoteSerializeResult;
}

const MainContent = ({ docs, matter, mdxResult }: MainContentProps) => {
  const { category } = useContext(CategoryContext);
  const data = useDocsIndex();
  if (!data) {
    return <div></div>;
  }
  const currentDocumentIndex = matter["sort"];
  const categoryItems = flattenCategoryItems(data.list[category.id]);
  const documentPath = [
    category.name,
    ...getDocPath(data.list[category.id], docs.name),
  ];
  const [prev, next] = [
    categoryItems[currentDocumentIndex - 1],
    categoryItems[currentDocumentIndex + 1],
  ];
  const prevArticle = prev
    ? {
        label: prev,
        href: `${category.id}/${prev}`,
      }
    : undefined;
  const nextArticle = next
    ? {
        label: next,
        href: `${category.id}/${next}`,
      }
    : undefined;
  return (
    <div className="overflow-guard">
      <style jsx>{`
        .overflow-guard {
          position: relative;
          overflow: hidden;
          height: calc(100% - 50px);
        }
        .content {
          display: flex;
          min-height: 0;
          background: var(--background);
          height: 100%;
          overflow-y: hidden;
        }

        .content-container {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          overflow-y: auto;
        }

        .content-layout {
          padding-top: 48px;
          padding-left: 30px;
          padding-right: 30px;
          margin: 0 auto;
          max-width: 1100px;
          display: flex;
        }

        .article-index-container {
          height: auto;
        }

        .navigator-container {
          padding: 48px 30px;
        }

        .layout--grow {
          flex-grow: 1;
        }

        .ai-sidebar {
          width: 210px;
          margin-left: 40px;
        }
      `}</style>
      <div className="content">
        <Sidebar />
        <div className="content-container">
          <div className="content-layout">
            <div>
              <div className="breadcrumbs-container">
                <Breadcrumbs>{documentPath.map((path) => path)}</Breadcrumbs>
              </div>
              <div className="layout--grow">
                <Article matter={matter} src={mdxResult} docs={docs} />
              </div>
            </div>
            <aside className="article-index-container">
              <div className="ai-sidebar">{getArticleIndex(docs)}</div>
            </aside>
          </div>
          <div className="navigator-container">
            <ArticleNavigator prev={prevArticle} next={nextArticle} />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

const flattenCategoryItems = (index: (string | Index)[]) => {
  const ret: string[] = [];
  index.forEach((iterIndex) => {
    if (typeof iterIndex === "string") {
      ret.push(iterIndex);
    } else {
      Object.keys(iterIndex).forEach((key) =>
        ret.push(...flattenCategoryItems(iterIndex[key]))
      );
    }
  });

  return ret;
};

const getDocPath = (index: (string | Index)[], target: string) => {
  let categories: string[] = [];

  index.forEach((iterIndex) => {
    if (typeof iterIndex === "string") {
      iterIndex === target && categories.push(iterIndex);
      return;
    } else {
      Object.keys(iterIndex).forEach((key) => {
        getDocPath(iterIndex[key], target).includes(target) &&
          categories.push(key, ...getDocPath(iterIndex[key], target));
      });
    }
  });

  return categories;
};

const getArticleIndex = (docs: Documentation) => {
  const m = selectAll(
    "heading",
    remark().use(remarkFrontmatter).parse(docs.src)
  ).map<React.ReactElement>((node, index) => {
    const headingNode = node as Heading;
    return (
      <ArticleIndexItem
        depth={headingNode.depth}
        src={toString(node)}
        href={encodeURI(`#${toString(node).replace(" ", "-")}`)}
        key={index}
      />
    );
  });
  return <ArticleIndex>{m}</ArticleIndex>;
};

export default MainContent;
