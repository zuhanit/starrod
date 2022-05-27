import { readFileSync, statSync } from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";
import { glob } from "glob";
import { APIResponse } from "../IAPIResponse";
import { Documentation } from "../../../types/IDocumentation";
import dayjs from "dayjs";

export interface DocumentationAPIResponse extends APIResponse {
  docs: Documentation | Documentation[];
}

/**
 * Get documentations.
 *
 * @param req API Request
 * @param res Documentations
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DocumentationAPIResponse>
) {
  glob("docs/**/*.mdx", {}, (err, matches) => {
    if (err) return res.status(500);
    const docs: Documentation[] = matches.map((match) => ({
      name: path.basename(match, "mdx"),
      path: match,
      src: readFileSync(path.join(process.cwd(), match), "utf-8"),
      date: dayjs(statSync(path.join(process.cwd(), match)).mtime).toString(),
    }));
    res.status(200).json({ docs: docs });
  });
}
