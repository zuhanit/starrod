import React, { AnchorHTMLAttributes } from "react";

export type LinkableType = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "style"
> & {
  as?: "a" | React.ReactElement;
  children?: React.ReactElement;
};
