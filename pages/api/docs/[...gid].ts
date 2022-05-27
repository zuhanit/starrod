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
  glob(`docs/${gid.join("/")}/**/*.mdx`, (err, matches) => {
    if (matches.length === 0) {
      const filePath = path.resolve(
        process.cwd(),
        "docs",
        `${gid.join("/")}.mdx`
      );
      try {
        const file = readFileSync(filePath, "utf-8");
        const stats = statSync(filePath);
        if (file !== undefined) {
          res.status(200).json({
            docs: {
              name: path.basename(gid.join("/"), "mdx"),
              path: gid.join("/") + ".mdx",
              date: dayjs(stats.mtime).toString(),
              src: file,
            },
          });
        }
      } catch (err) {
        res.status(404).json({ message: `Not Found ${err}` });
      }
    } else {
      const docs: Documentation[] = matches.map((match) => ({
        name: path.basename(match, "mdx"),
        path: match,
        src: readFileSync(path.join(process.cwd(), match), "utf-8"),
        date: dayjs(statSync(path.join(process.cwd(), match)).mtime).toString(),
      }));
      res.status(200).json({ docs: docs });
    }
  });
}
