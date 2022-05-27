interface CircleProps {
  tag: JSX.Element;
  size: string;
  title: string;
  description: string;
}

const Typo = ({ tag, size, title, description }: CircleProps) => (
  <div className="typo">
    <style jsx>{`
      .typo {
        display: flex;
        align-items: center;
      }

      .tag {
        width: 40px;
        height: 40px;
        margin: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      section {
        display: flex;
        flex-direction: column;
      }
    `}</style>
    <figure className="tag">{tag}</figure>
    <section>
      <strong>{title}</strong>
      {description}
    </section>
  </div>
);

export default Typo;
