import Logo from "../Logo/Logo";

const Footer = () => {
  return (
    <footer>
      <style jsx>{`
        footer {
          background: var(--background-darker);
          min-height: 50px;
          display: flex;
          align-items: center;
        }

        footer > :global(.center) {
          margin: 0 auto;
        }
      `}</style>
      <Logo className="center" />
    </footer>
  );
};

export default Footer;
