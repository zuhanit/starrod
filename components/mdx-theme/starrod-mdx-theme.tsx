import styled from "styled-components";
import { MDXComponents } from "mdx/types";
import React, { HTMLAttributes } from "react";
import { AiOutlineLink } from "react-icons/ai";
import Link from "next/link";

const Headings = {
  H2: ({ id, ...rest }: HTMLAttributes<HTMLHeadingElement>) => {
    if (id) {
      return (
        <>
          <Link href={`#${encodeURI(id)}`}>
            <a>
              <style jsx>{`
                a {
                  display: flex;
                  align-items: center;
                  gap: 4px;
                }

                a > :global(svg) {
                  color: transparent;
                }

                a:hover > :global(svg) {
                  color: var(--text);
                }
              `}</style>
              <h2 {...rest} />
              <AiOutlineLink />
            </a>
          </Link>
        </>
      );
    } else {
      return <h2 {...rest} />;
    }
  },
};

const StyledAnchor = styled.a`
  text-decoration: var(--link) underline;
`;

const StyledP = styled.p`
  margin-top: 14px;
`;

const StyledCode = styled.code`
  color: var(--tertiary);
  font-family: Inter;
`;

export const components: MDXComponents = {
  h2: Headings.H2,
  a: StyledAnchor,
  code: StyledCode,
  p: StyledP,
};
