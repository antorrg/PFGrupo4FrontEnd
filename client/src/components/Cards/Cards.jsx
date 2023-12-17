import Card from "../Card/Card";

const Cards = (props) => {
  const { videogames } = props;

  return (
    <div className="flex flex-col sm:flex-row justify-start items-center gap-4 sm:flex-wrap">
      {videogames.map((element) => {
        return <Card key={element.id} game={element} />;
      })}
    </div>
  );
};

export default Cards;
