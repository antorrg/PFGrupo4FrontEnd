import style from "./Filters.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import Select from "react-select";

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

  const platforms = useSelector((state) => state.platforms);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [heightPlatforms, setHeightPlatforms] = useState("h-[250px]");

  const genres = useSelector((state) => state.genres);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [heightGenres, setHeightGenres] = useState("h-[250px]");
  const [sortOrder, setSortOrder] = useState({
    value: "none",
    label: "Sin orden",
  });
  const [searchText, setSearchText] = useState("");

  const selectedGenresRef = useRef(null);
  const selectedPlatformsRef = useRef(null);
  const selectedOrderRef = useRef(null);

  const [prices, setPrices] = useState({
    minPrice: "",
    maxPrice: "",
  });

  const [errorPrices, setErrorPrices] = useState({
    prices: "",
  });

  const [inputValue, setInputValue] = useState("");

  const handlerInputChange = (value) => {
    setInputValue(value);
    setSearchTextHandler(value);
  };

  const orderOptions = [
    { value: "none", label: "Sin orden" },
    { value: "ASC_N", label: "Nombre ascendente" },
    { value: "DESC_N", label: "Nombre descendente" },
    { value: "ASC_P", label: "Precio ascendente" },
    { value: "DESC_P", label: "Precio descendente" },
  ];

  useEffect(() => {
    dispatch(getPlatforms());
    dispatch(getGenres());
  }, [dispatch]);

  const orderHandler = (auxSelectedOptions) => {
    setSortOrder(auxSelectedOptions);
  };

  const handleChangePrice = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setPrices({ ...prices, [property]: value });
    valideInputFilters(
      { ...prices, [property]: value },
      setErrorPrices,
      errorPrices
    );
  };

  const setSearchTextHandler = (auxText) => {
    setSearchText(auxText);
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

  const applyFilters = () => {
    //Aplicar filtros:
    onApplyFilters({
      page: 0,
      platforms: selectedPlatforms,
      genres: selectedGenres,
      minPrice: prices.minPrice,
      maxPrice: prices.maxPrice,
      order: sortOrder.value,
      name: searchText,
    });
  };

  return (
    <div className="">
      <Accordion
        selectionMode="multiple"
        defaultExpandedKeys={["1", "2", "3", "4"]}
      >
        <AccordionItem key="1" aria-label="Precio" title="Precio">
          <div className="flex justify-between w-full items-center">
            <Input
              size="sm"
              type="number"
              min="0"
              radius="none"
              name="minPrice"
              className="flex-1"
              color="primary"
              value={prices.minPrice}
              onChange={handleChangePrice}
              label="Min"
            />
            <p className="w-[10%] text-2xl text-white flex justify-center">-</p>
            <Input
              size="sm"
              type="number"
              min="0"
              radius="none"
              name="maxPrice"
              className="flex-1"
              color="primary"
              value={prices.maxPrice}
              onChange={handleChangePrice}
              label="Max"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
                </div>
              }
            />
            <span className={style.error}>{errorPrices.prices}</span>
          </div>
        </AccordionItem>
        <AccordionItem key="2" aria-label="search bar" title="Busqueda">
          <SearchBar
            setSearchText={handlerInputChange}
            searchText={inputValue}
          />
        </AccordionItem>
        <AccordionItem key="3" aria-label="Plataforma" title="Plataforma" colo>
          <CheckboxGroup
            onValueChange={setSelectedPlatforms}
            defaultValue={selectedPlatforms}
            className={`overflow-hidden ${heightPlatforms}`}
          >
            {platforms.map((platform) => {
              return (
                <Checkbox value={platform.name} key={platform.name}>
                  {platform.name}
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
        <AccordionItem key="4" aria-label="Genero" title="Género">
          <CheckboxGroup
            onValueChange={setSelectedGenres}
            defaultValue={selectedGenres}
            className={`overflow-hidden ${heightGenres}`}
          >
            {genres.map((genre) => {
              return (
                <Checkbox value={genre.name} key={genre.name}>
                  {genre.name}
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
      <Select
        options={orderOptions}
        onChange={(selectedOption) => orderHandler(selectedOption)}
        placeholder="Ordenar..."
        ref={selectedOrderRef}
      />
      <div className="flex justify-between w-full mt-4">
        <Button
          size="sm"
          variant="shadow"
          onClick={applyFilters}
          className="bg-accent"
        >
          Aplicar
        </Button>
        <Button
          size="sm"
          variant="light"
          onClick={resetFilters}
          className="text-accent"
        >
          Restablecer
        </Button>
      </div>
    </div>
  );
}
