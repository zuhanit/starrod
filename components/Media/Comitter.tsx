import Avatar from "./Avatar";

interface ComitterProps {
  name: string;
}

const Comitter = ({ name }: ComitterProps) => (
  <a href={`https://github.com/${name}`}>
    <Avatar name={name} src={`https://github.com/${name}.png?size=40`} />
  </a>
);

export default Comitter;
