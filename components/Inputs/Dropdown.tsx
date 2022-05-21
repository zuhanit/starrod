import { Dropdown as DD } from "@talend/design-system";
import Link from "next/link";
import { useState } from "react";
import { ClickableType } from "../Types/Clickable";
import { LinkableType } from "../Types/Linkable";

export interface DropdownTitleItem {
  type: "title";
  label: string;
}

export interface DropdownDividerItem {
  type: "divider";
}

export interface DropdownButtonItem extends Omit<ClickableType, "children"> {
  type: "button";
  label: string;
}

export interface DropdownLinkItem extends Omit<LinkableType, "children"> {
  type: "link";
  label: string;
}

export interface DropdownProps {
  items: (
    | DropdownButtonItem
    | DropdownDividerItem
    | DropdownLinkItem
    | DropdownTitleItem
  )[];
  label: string;
}

const Dropdown = ({ items, label }: DropdownProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const onClickDropdown = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div className="dropdown-container">
      <style jsx>{`
        .dropdown-wrapper {
          display: none;
          position: absolute;
          box-shadow: 0px 4px 14px 0 #0000000a;
          width: fit-content;
          padding: 0px 10px;
          border-radius: 5px;
          background: var(--input-background);
          color: var(--input-color);
        }

        .collapsed {
          display: block;
        }

        :global(.dropdown-item) {
          cursor: pointer;
          transition: 0.3s ease;
        }

        :global(.dropdown-item):hover {
          border-radius: 3px;
          background: var(--input-hover);
        }
      `}</style>
      <button onClick={onClickDropdown}>{label}</button>
      <div className={`dropdown-wrapper ${collapsed ? "collapsed" : ""}`}>
        {items.map((item) => {
          switch (item.type) {
            case "divider":
              return <hr key="divider"></hr>;
            case "title":
              return (
                <div className="dropdown-item" key="title">
                  {item.label}
                </div>
              );
            case "button":
              return (
                <button className="dropdown-item" key="button">
                  {item.label}
                </button>
              );
            case "link":
              return (
                <a className="dropdown-item" key="link" href={item.href}>
                  {item.label}
                </a>
              );
          }
        })}
      </div>
    </div>
  );
};

export default Dropdown;
