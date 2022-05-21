import TreeView from "../../components/Navigation/Treeview";
import TreeViewItem from "../../components/Navigation/TreeviewItem";
import yaml from "js-yaml";

const Sidebar = () => {
  return (
    <aside>
      <style jsx>{`
        aside {
          border-right: 0.01rem solid var(--chasis);
          min-width: 250px;
          width: 10%;
          height: auto;
          padding: 2rem;
          flex: 0 0 0;
        }
      `}</style>{" "}
    </aside>
  );
};

export default Sidebar;
