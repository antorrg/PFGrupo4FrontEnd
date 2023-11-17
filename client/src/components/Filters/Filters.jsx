import { useState } from "react";
import Select from "react-select";

import styles from "../../views/Home/Home.module.css";

export default function Filters() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [priceFilter, setPriceFilter] = useState("all");
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [sortOrder, setSortOrder] = useState("asc");

  const applyFilters = () => {
    // Lógica de filtrado
  };

  const resetFilters = () => {
    // Restablecer filtros
  };

  return (
    <div>
      <Select
        options={[
          { value: "action", label: "Acción" },
          { value: "adventure", label: "Aventura" },
        ]}
        isMulti
        onChange={(selectedOptions) => setSelectedGenres(selectedOptions)}
        placeholder="Plataformas..."
      />
      <br />

      <Select
        options={[
          { value: "pc", label: "PC" },
          { value: "ps5", label: "PS5" },
        ]}
        isMulti
        onChange={(selectedOptions) => setSelectedPlatforms(selectedOptions)}
        placeholder="Géneros..."
      />
      <br />
      <Select
        options={[
          { value: "asc", label: "Ascendente" },
          { value: "desc", label: "Descendente" },
        ]}
        // value={sortOrder}
        // onChange={(event) => setSortOrder(event.target.value)}>
        placeholder="Ordenar por nombre"
      />
      <br />
      <Select
        options={[
          { value: "digital", label: "Digital" },
          { value: "fisico", label: "Físico" },
        ]}
        // value={sortOrder}
        // onChange={(event) => setSortOrder(event.target.value)}>
        placeholder="Formato..."
      />
      <br />
      <Select
        options={[
          { value: "all", label: "Todos" },
          { value: "less", label: "Menor precio" },
          { value: "greater", label: "Mayor precio" },
          // { value: "range", label: "Rango" },
        ]}
        onChange={(selectedOptions) => setPriceFilter(selectedOptions)}
        placeholder="Precio..."
      />
      <br />
      <div>
        <input
          type="number"
          value={minPrice}
          onChange={(event) => setMinPrice(Number(event.target.value))}
          placeholder="Precio mínimo..."
        />
        <div>
          <br />
          <input
            type="number"
            value={maxPrice}
            onChange={(event) => setMaxPrice(Number(event.target.value))}
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
