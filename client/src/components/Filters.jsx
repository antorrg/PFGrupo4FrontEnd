import { useState } from "react";
import Select from "react-select";

export default function Filters() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [priceFilter, setPriceFilter] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [sortOrder, setSortOrder] = useState("asc");

  const applyFilters = () => {
    // Lógica de filtrado
  };

  const resetFilters = () => {
    // Restablecer filtros
  };

  return (
    <div>
      <h1>Filtrar</h1>

      <label>Géneros</label>
      <Select
        options={[
          { value: "action", label: "Acción" },
          { value: "adventure", label: "Aventura" },
          // Otras opciones de géneros
        ]}
        isMulti
        onChange={(selectedOptions) => setSelectedGenres(selectedOptions)}
      />

      <label>Plataformas</label>
      <Select
        options={[
          { value: "pc", label: "PC" },
          { value: "ps5", label: "PS5" },
          // Otras opciones de plataformas
        ]}
        isMulti
        onChange={(selectedOptions) => setSelectedPlatforms(selectedOptions)}
        placeholder="Selecciona plataformas"
      />

      <label>Precio:</label>
      <select
        value={priceFilter}
        onChange={(event) => setPriceFilter(event.target.value)}>
        <option value="all">Todos</option>
        <option value="less">Menor precio</option>
        <option value="greater">Mayor precio</option>
        <option value="range">Rango</option>
      </select>

      {priceFilter === "range" && (
        <div>
          <label>Min:</label>
          <input
            type="number"
            value={minPrice}
            onChange={(event) => setMinPrice(Number(event.target.value))}
          />

          <label>Max:</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(event) => setMaxPrice(Number(event.target.value))}
          />
        </div>
      )}

      <label>Ordenar por nombre:</label>
      <select
        value={sortOrder}
        onChange={(event) => setSortOrder(event.target.value)}>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>

      <button onClick={applyFilters}>Aplicar Filtros </button>
      <button onClick={resetFilters}>Restablecer Filtros</button>
    </div>
  );
}
