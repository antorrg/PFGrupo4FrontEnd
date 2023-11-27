const validate = (newPrices, setErrorPrices, errorPrices) => {

    const auxMinPrice = Number(newPrices.minPrice);
    const auxMaxPrice = Number(newPrices.maxPrice);

    if(auxMinPrice < 0 || auxMaxPrice < 0) {
        errorPrices.prices = "Los precios no deben ser menores a 0";
    } else if(auxMaxPrice && auxMinPrice > auxMaxPrice) {
        errorPrices.prices = "El precio mínimo no debe ser mayor al máximo";
    } else {
        errorPrices.prices = "";
    }

    setErrorPrices(errorPrices);
}

export default validate;