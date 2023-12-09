import { FaSearch } from "react-icons/fa";

const SearchBar = (props) => {
  const { setSearchText, searchText } = props;

  const onSearchByName = (event) => {
    event.preventDefault();
    setSearchText(event.target.value);
  };

  return (
    <div className="group relative">
      <FaSearch
        width="20"
        height="20"
        fill="currentColor"
        className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500"
      />

      <input
        className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
        type="text"
        placeholder="Buscar video Juego..."
        value={searchText}
        onChange={(event) => onSearchByName(event)}
      />
    </div>
  );
};

export default SearchBar;
