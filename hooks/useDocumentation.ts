import axios from "axios";
import useSWR from "swr";
import { DocumentationIndexAPIResponse } from "../pages/api/docs/index/index";

export const useDocsIndex = () => {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR<DocumentationIndexAPIResponse>(
    "/api/docs/index",
    fetcher
  );
  return data;
};
