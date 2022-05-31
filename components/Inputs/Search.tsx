import { ChangeEvent, useState } from "react";
import { useRef } from "react";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";

interface SearchProps extends Omit<React.HTMLProps<HTMLInputElement>, "type"> {}

const Search = (props: SearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [valueExist, setValueExist] = useState(false);
  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.value.length !== 0
      ? setValueExist(true)
      : setValueExist(false);
    if (props.onChange) {
      props.onChange(event);
    }
  };
  const onClickReset = () => {
    inputRef.current!.value = "";
  };
  return (
    <div className="search-wrapper">
      <style jsx>{`
        .search-wrapper {
          position: relative;
          width: 100%;
        }

        input {
          width: 100%;
          height: 32px;
          border-radius: 5px;
          border: 1px solid var(--chassis);
          padding-left: calc(15px + 7px + 5px);
          background: var(--background);
          color: var(--text);
        }

        :global(.search-icon) {
          position: absolute;
          left: 7px;
          top: 50%;
          transform: translateY(-50%);
        }

        :global(.search-delete-icon) {
          position: absolute;
          right: 7px;
          top: 50%;
          transition: 0.3s ease;
          transform: scale(0.8) translateY(-50%);
          cursor: pointer;
        }

        :global(.visible) {
          opacity: 1;
          transform: scale(1) translateY(-50%);
          will-change: transform;
        }

        :global(.hidden) {
          opacity: 0;
        }
      `}</style>
      <input
        {...props}
        type="text"
        ref={inputRef}
        onChange={onChangeSearch}
      ></input>
      <AiOutlineSearch
        className="search-icon"
        size="15px"
        fill="var(--chassis)"
      />
      <AiOutlineClose
        className={`search-delete-icon ${valueExist ? "visible" : "hidden"}`}
        size="15px"
        fill="var(--chassis)"
        onClick={onClickReset}
      />
    </div>
  );
};

export default Search;
