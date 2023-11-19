import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Select from "react-select";

import { getPlatforms, getGenres } from "../../redux/actions";

export default function Filters() {
  const dispatch = useDispatch();
  const platforms = useSelector((state) => state.platforms);
  const genres = useSelector((state) => state.genres);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [priceFilter, setPriceFilter] = useState("all");
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [sortOrder, setSortOrder] = useState("asc");

  const platformsOptions = platforms.map((platform) => ({
    value: platform.name,
    label: platform.name,
  }));
  const genresOptions = genres.map((platform) => ({
    value: platform.name,
    label: platform.name,
  }));

  useEffect(() => {
    dispatch(getPlatforms());
    dispatch(getGenres());
  }, [dispatch]);

  const applyFilters = () => {
    // Lógica de filtrado
  };

  const resetFilters = () => {
    // Restablecer filtros
  };

  return (
    <div>
      <Select
        options={platformsOptions}
        isMulti
        onChange={(selectedOptions) => setSelectedPlatforms(selectedOptions)}
        placeholder="Plataformas..."
      />
      <br />
      <Select
        options={genresOptions}
        isMulti
        onChange={(selectedOptions) => setSelectedGenres(selectedOptions)}
        placeholder="Géneros..."
      />
      <br />
      <Select
        options={[
          { value: "asc", label: "Ascendente" },
          { value: "desc", label: "Descendente" },
        ]}
        value={sortOrder}
        onChange={(selectedOption) => setSortOrder(selectedOption.value)}
        placeholder="Ordenar por nombre"
      />
      <br />
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
          { value: "all", label: "Todos" },
          { value: "less", label: "Menor precio" },
          { value: "greater", label: "Mayor precio" },
        ]}
        onChange={(selectedOption) => setPriceFilter(selectedOption.value)}
        placeholder="Precio..."
      />
      <br />
      <div>
        <input
          type="number"
          value={minPrice}
          onChange={(event) => setMinPrice(event.target.value)}
          placeholder="Precio mínimo..."
        />
        <div>
          <br />
          <input
            type="number"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
            placeholder="Precio máximo..."
          />
        </div>
      </div>

      <button onClick={applyFilters}>Aplicar Filtros </button>
      <br />
      <button onClick={resetFilters}>Restablecer Filtros</button>
    </div>
  );
}
