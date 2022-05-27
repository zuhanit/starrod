import { MouseEvent, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

export interface TreeviewItemProps
  extends Omit<React.HTMLProps<HTMLDivElement>, "children"> {
  label: string;
  root?: boolean;
  children?:
    | React.ReactElement<TreeviewItemProps>
    | React.ReactElement<TreeviewItemProps>[]
    | React.ReactElement<TreeviewItemProps>[][];
}

const TreeViewItem = ({
  label,
  children,
  root,
  ...props
}: TreeviewItemProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const onClickContainer = (event: MouseEvent<HTMLDivElement>) => {
    setCollapsed(!collapsed);
    if (props.onClick) {
      props.onClick(event);
    }
  };
  return (
    <>
      <style jsx>{`
        .treeview-item {
          display: flex;
          gap: 4px;
          align-items: center;
          cursor: pointer;
          padding: 8px 0;
          transition: 0.2s ease-in;
        }

        .item-label {
          padding-left: 8px;
        }

        .treeview-item:hover {
          color: var(--tertiary);
        }

        :global(.arrow) {
          transition: 0.3s;
        }

        :global(.arrow-collapsed) {
          transition: 0.3s;
          transform: rotate(90deg);
        }

        .treeview-item-container {
          display: none;
          padding-left: 16px;
          position: relative;
        }

        .treeview-item-container::before {
          content: "";
          height: 100%;
          position: absolute;
          left: 9px;
          border-left: 0.01rem solid var(--chassis);
        }

        .collapsed {
          display: block;
        }
      `}</style>
      <div className="treeview-item" onClick={onClickContainer}>
        {!root && <span className="item-anchor"></span>}
        {children && (
          <IoIosArrowForward
            className={`arrow ${collapsed ? "arrow-collapsed" : ""}`}
          />
        )}
        <span className="item-label">{label}</span>
      </div>
      {children && (
        <div
          className={`treeview-item-container ${collapsed ? "collapsed" : ""}`}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default TreeViewItem;
