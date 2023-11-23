import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Select from "react-select";

import { getPlatforms, getGenres } from "../../redux/actions";
import { updateFilterObj } from "../../redux/actions";
import { getGames } from "../../redux/actions";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function Filters(props) {

  const { onApplyFilters } = props

  const dispatch = useDispatch();
  //const filtersObj = useSelector((state) => state.filtersObj);
  const platforms = useSelector((state) => state.platforms);
  const genres = useSelector((state) => state.genres);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [priceFilter, setPriceFilter] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchText, setSearchText] = useState('');

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
    //console.log("auxSelectedOptions: " + JSON.stringify(auxSelectedOptions));
    /*const auxFilter  = {
      page: 0,
      platforms: auxSelectedOptions.map((platf) => {
        return platf.value;
      }).join(",")
    }

    dispatch(updateFilterObj(auxFilter));*/
  }

  const genresHandler = (auxSelectedOptions) => {
    setSelectedGenres(auxSelectedOptions);
    //console.log("auxSelectedOptions: " + JSON.stringify(auxSelectedOptions));
    /*const auxFilter  = {
      page: 0,
      genres: auxSelectedOptions.map((genre) => {
        return genre.value;
      }).join(",")
    }

    dispatch(updateFilterObj(auxFilter));*/
  }

  const minPriceHandler = (value) => {
    setMinPrice(value === "" ? -1 : +value);
    //console.log("auxSelectedOptions: " + JSON.stringify(auxSelectedOptions));
    /*const auxFilter  = {
      page: 0,
      minPrice: value === "" ? -1 : +value
    }

    dispatch(updateFilterObj(auxFilter));*/
  }

  const maxPriceHandler = (value) => {
    setMaxPrice(value === "" ? -1 : +value);
    //console.log("auxSelectedOptions: " + JSON.stringify(auxSelectedOptions));
    /*const auxFilter  = {
      page: 0,
      maxPrice: value === "" ? -1 : +value
    }

    dispatch(updateFilterObj(auxFilter));*/
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
      name: ""
    });
    /*dispatch(getGames({
      page: 0,
      platforms: "",
      genres: "",
      minPrice: -1,
      maxPrice: -1,
      name: ""
    }));*/
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
      minPrice: minPrice,
      maxPrice: maxPrice,
      name: searchText
    });
    //dispatch(getGames(filtersObj));

    //console.log("selectedPlatforms: " + JSON.stringify(selectedPlatforms));
    /*const auxFilter  = {
      page: 0,
      platforms: selectedPlatforms.map((platf) => {
        return platf.value;
      }).join(","),
      genres: selectedGenres.map((genre) => {
        return genre.value;
      }).join(","),
      minPrice: minPrice === "" ? -1 : +minPrice,
      maxPrice: maxPrice === "" ? -1 : +maxPrice
    }*/
    
    /*dispatch(getGames({
      page: 0,
      platforms: "",
      genres: "",
      minPrice: -1,
      maxPrice: -1,
      name: ""
    }));*/
  };

  return (
    <div>
      <SearchBar setSearchText={setSearchTextHandler}/>
      <br />
      <Select
        options={platformsOptions}
        isMulti
        onChange={(selectedOptions) => platformsHandler(selectedOptions)}
        placeholder="Plataformas..."
      />
      <br />
      <Select
        options={genresOptions}
        isMulti
        onChange={(selectedOptions) => genresHandler(selectedOptions)}
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
          //value={minPrice}
          onChange={(event) => minPriceHandler(event.target.value)}
          placeholder="Precio mínimo..."
        />
        <div>
          <br />
          <input
            type="number"
            //value={maxPrice}
            onChange={(event) => maxPriceHandler(event.target.value)}
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
