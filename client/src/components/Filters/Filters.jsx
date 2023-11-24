import style from "./Filters.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Select from "react-select";

import { getPlatforms, getGenres } from "../../redux/actions";
import SearchBar from "../../components/SearchBar/SearchBar";
import valideInputFilters from "../../utils/valideInputFilters";

export default function Filters(props) {

  const { onApplyFilters } = props

  const dispatch = useDispatch();
  const platforms = useSelector((state) => state.platforms);
  const genres = useSelector((state) => state.genres);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  //const [priceOrder, setPriceOrder] = useState("none");
  const [sortOrder, setSortOrder] = useState("none");
  const [searchText, setSearchText] = useState('');

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //let selectedGenresRef = useRef();
  //let selectedPlatformsRef = useRef();

  const [prices, setPrices] = useState({
    minPrice: "",
    maxPrice: ""
  });

  const [errorPrices, setErrorPrices] = useState({
    prices: ""
  });

  const [inputValue, setInputValue] = useState('');

  const handlerInputChange = (value) => {
    setInputValue(value);
    setSearchTextHandler(value);
  }

  const platformsOptions = platforms.map((platform) => ({
    value: platform.name,
    label: platform.name,
  }));
  const genresOptions = genres.map((platform) => ({
    value: platform.name,
    label: platform.name,
  }));

  const clearSelection = () => {
    setSelectedOptions([]);
  };

  useEffect(() => {
    dispatch(getPlatforms());
    dispatch(getGenres());
  }, [dispatch]);

  const platformsHandler = (auxSelectedOptions) => {
    setSelectedPlatforms(auxSelectedOptions);
  }

  const genresHandler = (auxSelectedOptions) => {
    setSelectedGenres(auxSelectedOptions);
  }

  /*const minPriceHandler = (value) => {
    //setMinPrice(value === "" ? -1 : +value);
    setPrices({...prices, minPrice: value === "" ? -1 : +value});
  }

  const maxPriceHandler = (value) => {
    //setMaxPrice(value === "" ? -1 : +value);
    setPrices({...prices, maxPrice: value === "" ? -1 : +value});
  }*/

  const handleChangePrice = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    console.log("property: " + property);
    console.log("value: " + value);

    setPrices({...prices, [property]: value});
    valideInputFilters({...prices, [property]: value}, setErrorPrices, errorPrices);
  }

  const setSearchTextHandler = (auxText) => {
    setSearchText(auxText);
  }

  const resetFilters = () => {
    // Restablecer filtros
    onApplyFilters({
      page: 0,
      platforms: "",
      genres: "",
      minPrice: -1,
      maxPrice: -1,
      order: "none",
      name: ""
    });

    setInputValue("");
    setPrices({
      minPrice: "",
      maxPrice: ""
    });
    //setSelectedGenres([]);
    //setIsMenuOpen(false);
    //selectedGenresRef.select.clearValue();
    //selectedPlatformsRef.select.clearValue();
  };

  const applyFilters = () => {
    onApplyFilters({
      page: 0,
      platforms: selectedPlatforms.map((platf) => {
        return platf.value;
      }).join(","),
      genres: selectedGenres.map((genre) => {
        return genre.value;
      }).join(","),
      minPrice: prices.minPrice,
      maxPrice: prices.maxPrice,
      order: sortOrder,
      name: searchText
    });
  };

  return (
    <div>
      <SearchBar
      //setSearchText={setSearchTextHandler}
      setSearchText={handlerInputChange}
      //searchText={currentFilters.name}
      searchText={inputValue}
      />
      <br />
      <Select
        /*ref={ref => {
          selectedGenresRef = ref;
        }}*/
        options={platformsOptions}
        isMulti
        onChange={(selectedOptions) => platformsHandler(selectedOptions)}
        //onChange={(selectedOptions) => platformsHandler(selectedOptions)}
        placeholder="Plataformas..."
        /*menuIsOpen={isMenuOpen}
        onMenuOpen={() => setIsMenuOpen(true)}
        onMenuClose={() => setIsMenuOpen(false)}*/
      />
      <br />
      <Select
        /*ref={ref => {
          selectedPlatformsRef = ref;
        }}*/
        options={genresOptions}
        isMulti
        onChange={(selectedOptions) => genresHandler(selectedOptions)}
        placeholder="Géneros..."
      />
      <br />
      {/*<Select
        options={[
          { value: "none", label: "none" },
          { value: "ASC", label: "Ascendente" },
          { value: "DESC", label: "Descendente" },
        ]}
        value={sortOrder}
        onChange={(selectedOption) => setSortOrder(selectedOption.value)}
        placeholder="Ordenar por nombre"
      />
      <br />*/}
      {/* <Select
        options={[
          { value: "digital", label: "Digital" },
          { value: "fisico", label: "Físico" },
        ]}
        value={format}
        onChange={(selectedOption) => setFormat(selectedOption.value)}
        placeholder="Formato..."
      />
      <br /> */}
      <Select
        options={[
          { value: "", label: "none" },
          { value: "ASC_N", label: "Nombre ascendente" },
          { value: "DESC_N", label: "Nombre descendente" },
          { value: "ASC_P", label: "Precio ascendente" },
          { value: "DESC_P", label: "Precio descendente" }
        ]}
        onChange={(selectedOption) => setSortOrder(selectedOption.value)}
        placeholder="Ordenar..."
      />
      <br />
      <div>
        <input
          type="number"
          min="0"
          name="minPrice"
          value={prices.minPrice}
          //onChange={(event) => minPriceHandler(event.target.value)}
          onChange={handleChangePrice}
          placeholder="Precio mínimo..."
        />
        <div>
          <br />
          <input
            type="number"
            min="0"
            name="maxPrice"
            value={prices.maxPrice}
            //onChange={(event) => maxPriceHandler(event.target.value)}
            onChange={handleChangePrice}
            placeholder="Precio máximo..."
          />
        </div>
        <span className={style.error}>{errorPrices.prices}</span>
      </div>
      <br/>
      <button onClick={applyFilters}>Aplicar Filtros </button>
      <br />
      <button onClick={resetFilters}>Restablecer Filtros</button>
    </div>
  );
}
