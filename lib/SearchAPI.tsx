import axios from "axios";
import { remark } from "remark";
import { DocumentationAPIResponse } from "../pages/api/docs";
import { Category } from "../types/Category";
import { Documentation } from "../types/IDocumentation";
import remarkFrontmatter from "remark-frontmatter";

export interface SearchResult {
  name: string;
  plainSrc: React.ReactNode;
  path: string;
}

const filterDocuments = (docs: Documentation[], target: string) => {
  return docs
    .filter(
      (doc) =>
        doc.src.toLowerCase().includes(target.toLowerCase()) ||
        doc.name.toLowerCase().includes(target.toLowerCase())
    )
    .map(async (doc) => {
      const d = String(
        await remark()
          .use(remarkFrontmatter)
          .use(require("remark-mdx-to-plain-text"))
          .process(doc.src)
      );
      const index = d.indexOf(target);
      const [lowIndex, highIndex] = [
        index - 30 < 0 ? 0 : index - 30,
        index + 30 > d.length ? d.length : index + 30,
      ];
      return {
        name: doc.name,
        plainSrc: getHighlightedText(d.slice(lowIndex, highIndex), target),
        path: doc.path.replace(".mdx", ""),
      };
    });
};

export const getSearchReulst = async (
  target: string
): Promise<SearchResult[]> => {
  const { data } = await axios.get<DocumentationAPIResponse>(`/api/docs`);
  const docs = data.docs as Documentation[];
  const result = filterDocuments(docs, target);
  return Promise.all(result);
};

export const getSearchResultInCategory = async (
  category: Category,
  target: string
): Promise<SearchResult[]> => {
  const { data } = await axios.get<DocumentationAPIResponse>(
    `/api/docs/${category.id}`
  );
  const docs = data.docs as Documentation[];
  const result = filterDocuments(docs, target);
  return Promise.all(result);
};

export const getHighlightedText = (text: string, highlight: string) => {
  const parts = text.split(new RegExp(`(${highlight})`, "g"));
  return (
    <span>
      {parts.map((part, index) => (
        <span
          style={
            part.toLowerCase() === highlight.toLowerCase()
              ? { background: "var(--primary)" }
              : {}
          }
          key={index}
        >
          {part}
        </span>
      ))}
    </span>
  );
};
