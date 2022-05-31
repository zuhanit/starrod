import type { NextApiRequest, NextApiResponse } from "next";
import { glob } from "glob";
import { DocumentationAPIResponse } from "./index";
import { Documentation } from "../../../types/IDocumentation";
import path from "path";
import { readFileSync, statSync } from "fs";
import dayjs from "dayjs";

/**
 * Get Documentations in specified group, or single documentation.
 *
 * Search documentations in directory first, and if doesn't exist any files,
 * check is there any documentation matched route.
 *
 * @param req API Request
 * @param res Documentations in specified group.
 */
export default function docsHandler(
  req: NextApiRequest,
  res: NextApiResponse<DocumentationAPIResponse>
) {
  const { gid } = req.query as { gid: string[] };
  const docs = getDocumentationsWithSlugs(gid);

  if (!docs) {
    res.status(404).json({ message: `Not Found` });
    return;
  }

  res.status(200).json({ docs: docs });
}

export const getDocumentationsWithSlugs = (
  slugs: string[]
): Documentation[] | Documentation | undefined => {
  const docs = glob.sync(`docs/${slugs.join("/")}/**/*.mdx`).map((file) => ({
    name: path.basename(file, "mdx"),
    path: file,
    src: readFileSync(path.join(process.cwd(), file), "utf-8"),
    date: dayjs(statSync(path.join(process.cwd(), file)).mtime).toString(),
  }));
  if (docs.length === 0) {
    const filePath = path.resolve(
      process.cwd(),
      "docs",
      `${slugs.join("/")}.mdx`
    );
    try {
      const file = readFileSync(filePath, "utf-8");
      const stats = statSync(filePath);
      if (file !== undefined) {
        return {
          name: path.basename(slugs.join("/"), "mdx"),
          path: slugs.join("/") + ".mdx",
          date: dayjs(stats.mtime).toString(),
          src: file,
        };
      }
    } catch (err) {
      return undefined;
    }
  } else {
    return docs;
  }
};
