import { HTMLAttributes } from "react";
import { GiFairyWand } from "react-icons/gi";

const Logo = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props} className={`logo-container ${props.className}`}>
      <style jsx>
        {`
          .logo-container {
            display: flex;
            align-items: center;
            gap: 6px;
            color: #ffffff;
          }
          .logo {
            width: 30px;
            height: 30px;
            background: #4dbfbf;
          }
        `}
      </style>
      <strong>Starrod</strong>
    </div>
  );
};

export default Logo;
