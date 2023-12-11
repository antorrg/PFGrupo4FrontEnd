import { Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";

const Orders = (props) => {
  const { onApplyFilters, filters } = props;
  const [sortOrder, setSortOrder] = useState({
    value: "none",
  });

  const orderOptions = [
    { value: "none", label: "Sin orden" },
    { value: "ASC_N", label: "Nombre ascendente" },
    { value: "DESC_N", label: "Nombre descendente" },
    { value: "ASC_P", label: "Precio ascendente" },
    { value: "DESC_P", label: "Precio descendente" },
  ];

  const handlerSubmit = (order) => {
    onApplyFilters({
      ...filters,
      order: order,
    });
  };

  return (
    <div className="w-full flex justify-end mb-4">
      <Select
        aria-label="ordenamiento"
        placeholder="Sin Orden"
        classNames={{
          base: "max-w-xs",
          // trigger: "p-0 m-0 h-10",
        }}
        size="sm"
        onChange={(selectedOption) => {
          console.log(selectedOption);
          setSortOrder({
            value: selectedOption.target.value,
          });
          handlerSubmit(selectedOption.target.value);
        }}
      >
        {orderOptions.map((order) => (
          <SelectItem key={order.value} value={order.value}>
            {order.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};
export default Orders;
