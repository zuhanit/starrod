import styled from "styled-components";
import { MDXComponents } from "mdx/types";
import React, { HTMLAttributes } from "react";
import { AiOutlineLink } from "react-icons/ai";

const Headings = {
  H1: ({ id, ...rest }: HTMLAttributes<HTMLHeadingElement>) => {
    if (id) {
      return (
        <>
          <a href={`#${decodeURI(id)}`}>
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
            <h1 id={id} {...rest} />
            <AiOutlineLink />
          </a>
        </>
      );
    } else {
      return <h1 {...rest} />;
    }
  },
  H2: ({ id, ...rest }: HTMLAttributes<HTMLHeadingElement>) => {
    if (id) {
      return (
        <>
          <a href={`#${decodeURI(id)}`}>
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
            <h2 id={id} {...rest} />
            <AiOutlineLink />
          </a>
        </>
      );
    } else {
      return <h2 {...rest} />;
    }
  },
  H3: ({ id, ...rest }: HTMLAttributes<HTMLHeadingElement>) => {
    if (id) {
      return (
        <>
          <a href={`#${decodeURI(id)}`}>
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
            <h3 id={id} {...rest} />
            <AiOutlineLink />
          </a>
        </>
      );
    } else {
      return <h3 {...rest} />;
    }
  },
  H4: ({ id, ...rest }: HTMLAttributes<HTMLHeadingElement>) => {
    if (id) {
      return (
        <>
          <a href={`#${decodeURI(id)}`}>
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
            <h4 id={id} {...rest} />
            <AiOutlineLink />
          </a>
        </>
      );
    } else {
      return <h4 {...rest} />;
    }
  },
  H5: ({ id, ...rest }: HTMLAttributes<HTMLHeadingElement>) => {
    if (id) {
      return (
        <>
          <a href={`#${decodeURI(id)}`}>
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
            <h5 id={id} {...rest} />
            <AiOutlineLink />
          </a>
        </>
      );
    } else {
      return <h5 {...rest} />;
    }
  },
  H6: ({ id, ...rest }: HTMLAttributes<HTMLHeadingElement>) => {
    if (id) {
      return (
        <>
          <a href={`#${decodeURI(id)}`}>
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
            <h6 id={id} {...rest} />
            <AiOutlineLink />
          </a>
        </>
      );
    } else {
      return <h6 {...rest} />;
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
  h1: Headings.H1,
  h2: Headings.H2,
  h3: Headings.H3,
  h4: Headings.H4,
  h5: Headings.H5,
  h6: Headings.H6,
  a: StyledAnchor,
  code: StyledCode,
  p: StyledP,
};
