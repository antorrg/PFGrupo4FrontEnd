import style from "./Filters.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";

import { getPlatforms, getGenres } from "../../redux/actions";
import SearchBar from "../../components/SearchBar/SearchBar";
import valideInputFilters from "../../utils/valideInputFilters";

import {
  Accordion,
  AccordionItem,
  Button,
  CheckboxGroup,
  Checkbox,
  Input,
} from "@nextui-org/react";

export default function Filters(props) {
  const dispatch = useDispatch();
  const { onApplyFilters } = props;

  // plataformas -------------------------------------------
  const platforms = useSelector((state) => state.platforms);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [heightPlatforms, setHeightPlatforms] = useState("h-[250px]");
  const selectedPlatformsRef = useRef(null);
  // generos -------------------------------------------------
  const genres = useSelector((state) => state.genres);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [heightGenres, setHeightGenres] = useState("h-[250px]");
  const selectedGenresRef = useRef(null);
  // Precios ---------------------------------------------------
  const [prices, setPrices] = useState({
    minPrice: "",
    maxPrice: "",
  });
  const [errorPrices, setErrorPrices] = useState({
    prices: "",
  });
  const handleChangePrice = (event) => {
    const property = event.target.name;
    let value = event.target.value;

    setPrices({ ...prices, [property]: value });
    valideInputFilters(
      { ...prices, [property]: value },
      setErrorPrices,
      errorPrices
    );

    if (errorPrices.prices.length === 0) {
      return { ...prices, [property]: value };
    } else {
      return prices;
    }
  };
  // busqueda -------------------------------------------------
  const [inputValue, setInputValue] = useState("");

  // envio y reset ---------------------------------------------
  const handlerSubmit = (event, value) => {
    const currentFilter = event.target.name;
    //Aplicar filtros:
    const paramsObj = {
      page: 0,
      platforms: selectedPlatforms,
      genres: selectedGenres,
      minPrice: prices.minPrice,
      maxPrice: prices.maxPrice,
      // order: sortOrder.value,
      name: inputValue,
    };

    for (const key in paramsObj) {
      if (key === currentFilter) {
        paramsObj[key] = value;
      }
    }
    console.log(paramsObj);

    onApplyFilters(paramsObj);
  };
  const resetFilters = () => {
    // Restablecer filtros
    onApplyFilters({
      page: 0,
      platforms: "",
      genres: "",
      minPrice: -1,
      maxPrice: -1,
      order: "none",
      name: "",
    });

    setInputValue("");
    setPrices({
      minPrice: "",
      maxPrice: "",
    });
    selectedGenresRef.current.clearValue();
    selectedPlatformsRef.current.clearValue();
    selectedOrderRef.current.clearValue();
  };

  useEffect(() => {
    dispatch(getPlatforms());
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <div className="">
      <Accordion
        selectionMode="multiple"
        defaultExpandedKeys={["1", "2", "3", "4"]}
      >
        <AccordionItem
          key="1"
          aria-label="Precio"
          title={<p className="text-white">Precio</p>}
        >
          <div className="flex justify-between w-full items-center">
            <Input
              size="sm"
              type="number"
              min="0"
              radius="none"
              name="minPrice"
              className="flex-1"
              value={prices.minPrice}
              onChange={() => {
                const prices = handleChangePrice(event);
                handlerSubmit(event, prices.minPrice);
              }}
              label="Min"
            />
            <p className="w-[10%] text-2xl text-white flex justify-center">-</p>
            <Input
              size="sm"
              type="number"
              min="0"
              radius="none"
              name="maxPrice"
              className="flex-1 bg"
              value={prices.maxPrice}
              onChange={() => {
                const prices = handleChangePrice(event);
                handlerSubmit(event, prices.maxPrice);
              }}
              label="Max"
            />
            <span className={style.error}>{errorPrices.prices}</span>
          </div>
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="search bar"
          title={<p className="text-white">Busqueda</p>}
        >
          <SearchBar
            name="name"
            setSearchText={(value) => {
              setInputValue(value);
              handlerSubmit(event, value);
            }}
            searchText={inputValue}
          />
        </AccordionItem>
        <AccordionItem
          key="3"
          aria-label="platforms"
          title={<p className="text-white">Plataforma</p>}
        >
          <CheckboxGroup
            name="platforms"
            onValueChange={(platform) => {
              setSelectedPlatforms(platform);
              handlerSubmit(event, platform);
            }}
            defaultValue={selectedPlatforms}
            className={`overflow-hidden ${heightPlatforms}`}
          >
            {platforms.map((platform) => {
              return (
                <Checkbox
                  value={platform.name}
                  key={platform.name}
                  radius="none"
                  className={{
                    base: "#1F0A4D",
                  }}
                >
                  <p className="text-white/80">{platform.name}</p>
                </Checkbox>
              );
            })}
          </CheckboxGroup>
          <button
            className="mt-2 text-accent"
            onClick={() => {
              heightPlatforms === "h-[250px]"
                ? setHeightPlatforms("h-fit")
                : setHeightPlatforms("h-[250px]");
            }}
          >
            {heightPlatforms === "h-[250px]" ? "Ver mas" : "Ver menos"}
          </button>
        </AccordionItem>
        <AccordionItem
          key="4"
          aria-label="Genero"
          title={<p className="text-white">Genero</p>}
        >
          <CheckboxGroup
            name="genres"
            onValueChange={(genres) => {
              setSelectedGenres(genres);
              handlerSubmit(event, genres);
            }}
            defaultValue={selectedGenres}
            className={`overflow-hidden ${heightGenres}`}
          >
            {genres.map((genre) => {
              return (
                <Checkbox value={genre.name} key={genre.name} radius="none">
                  <p className="text-white">{genre.name}</p>
                </Checkbox>
              );
            })}
          </CheckboxGroup>
          <button
            className="mt-2 text-accent"
            onClick={() => {
              heightGenres === "h-[250px]"
                ? setHeightGenres("h-fit")
                : setHeightGenres("h-[250px]");
            }}
          >
            {heightGenres === "h-[250px]" ? "Ver mas" : "Ver menos"}
          </button>
        </AccordionItem>
      </Accordion>
      <div className="flex justify-between w-full mt-4">
        <Button
          size="sm"
          variant="shadow"
          onClick={resetFilters}
          className="bg-accent"
        >
          Restablecer
        </Button>
      </div>
    </div>
  );
}
