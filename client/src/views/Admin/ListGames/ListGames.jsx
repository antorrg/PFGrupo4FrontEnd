import ElementGame from "../Elementgame/Elementgame";

const ListGames = ({ videogames }) => {

  return (
    <div>
      <ul>
        {videogames.map((game) => (
          <li key={game.id}>
            <ElementGame game={game} />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ListGames;
