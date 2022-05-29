import { readFileSync, statSync } from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";
import { glob } from "glob";
import { APIResponse } from "../IAPIResponse";
import { Documentation } from "../../../types/IDocumentation";
import dayjs from "dayjs";

export interface DocumentationAPIResponse extends APIResponse {
  docs?: Documentation | Documentation[];
}

/**
 * Response Documentations.
 *
 * @param req API Request
 * @param res Documentations
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DocumentationAPIResponse>
) {
  try {
    const docs = getDocumentations();
    res.status(200).json({ docs: docs });
  } catch (err) {
    res.status(500);
  }
}

/**
 * Getting All Documentations
 * @returns Documentations at `docs`
 */
export const getDocumentations = (): Documentation[] => {
  return glob.sync("docs/**/*.mdx").map((file) => ({
    name: path.basename(file, "mdx"),
    path: file,
    src: readFileSync(path.join(process.cwd(), file), "utf-8"),
    date: dayjs(statSync(path.join(process.cwd(), file)).mtime).toString(),
  }));
};
