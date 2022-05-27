import React, { ButtonHTMLAttributes } from "react";

export type ClickableType = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "style"
> & {
  children: React.ReactElement;
  onClick: (event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => void;
};
