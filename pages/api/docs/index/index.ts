import { readFileSync } from "fs";
import yaml from "js-yaml";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { Category, CategoryGroup } from "../../../../types/Category";

export interface DocumentationIndexAPIResponse {
  list: IndexCategory;
}

type IndexCategory = {
  [key in CategoryGroup]: Index[];
};

export interface Index {
  [key: string]: (string | Index)[];
}

const handler = (
  req: NextApiRequest,
  res: NextApiResponse<DocumentationIndexAPIResponse>
) => {
  const data = yaml.load(
    readFileSync(path.join(process.cwd(), "docs", "index.yaml"), "utf-8")
  );
  res.status(200).json(data as DocumentationIndexAPIResponse);
};

export default handler;
