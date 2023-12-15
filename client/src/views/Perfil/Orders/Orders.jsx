import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import setAuthHeader from '../../../utils/AxiosUtils'

const Orders = () => {
  const [orders, setOrders] = useState({});
  const loginUser = useSelector((state) => state.loginUser);
  const token = localStorage.getItem('validToken');

  const searchOrdersBD = async () => {
    const { data } = await axios.get(
      `/getOrdersByUserId?userID=${loginUser.id}&page=0&size=100`,
      setAuthHeader(token)
    );
    setOrders(data);
  };

  useEffect(() => {
    searchOrdersBD();
  }, []);

  console.log(orders);

  return (
    <>
      {orders.ordersData && (
        <div className="w-full my-6">
          <div className="max-w-[42rem] mx-auto px-6 text-left lg:max-w-[56rem]">
            <h1 className=" text-2xl md:text-3xl font-bold">
              Historial de Ordenes
            </h1>
            <p className="mt-3 text-gray-500">
              Consulta la informacion del estado de tus pedidos, con informacion
              relevante, precio, cantidad, valor total, etc
            </p>
          </div>
          <div className="w-full mt-16">
            <div className="max-w-[42rem] mx-auto sm:px-4 flex flex-col gap-8 lg:max-w-[56rem]">
              {orders.ordersData.map((order) => {
                const fechaTransaccion = order.createdAt.slice(0, 10);
                return (
                  <div className="text-sm sm:border sm:rounded-lg dark:bg-secondary dark:border-none sm:text-base overflow-hidden">
                    <div className="w-full p-6 dark:bg-[#0B0120] bg-secondary text-white">
                      <dl className="flex justify-between">
                        <div>
                          <dt className="font-medium">Numero de orden</dt>
                          <dd className="dark:text-gray-500 mt-1">
                            #{order.id}
                          </dd>
                        </div>
                        <div className="sm:text-end">
                          <dt className="font-medium">Costo Total</dt>
                          <dd className="font-medium mt-1">
                            ${order.totalCost}
                            <span> {order.items[0].currencyId}</span>
                          </dd>
                        </div>
                      </dl>
                    </div>
                    <ul>
                      {order.items.map((item) => {
                        return (
                          <li className="px-6 pt-6 border-b sm:pb-6 sm:border-none border-primary">
                            <div className="flex items-center sm:items-start">
                              <div className="w-20 h-20 sm:w-40 sm:h-40">
                                <img
                                  src={item.image}
                                  className="w-full h-full object-cover rounded-lg"
                                  alt={item.name}
                                />
                              </div>
                              <div className="flex-1 ml-6">
                                <div className="font-medium">
                                  <div className="sm:flex justify-between items-center ">
                                    <h5>
                                      {item.name}
                                      <span>{` x ${item.quantity} Und`}</span>
                                    </h5>
                                    <p className="mt-2 sm:m-0">
                                      ${item.unitPrice * item.quantity}
                                      <span> {item.currencyId}</span>
                                    </p>
                                  </div>
                                  <div className="sm:flex justify-between items-center text-gray-500 dark:text-gray-400 font-light">
                                    <h6>valor unitario</h6>
                                    <p>
                                      {item.unitPrice}
                                      <span> {item.currencyId}</span>
                                    </p>
                                  </div>
                                </div>
                                <p className="text-gray-500 mt-2 dark:text-white hidden sm:flex h-[150px] sm:overflow-auto">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                            {/* <div className="mt-2 sm:flex justify-between">
                              <div className="w-full py-2 justify-between flex sm:p-0 sm:justify-end">
                                <Button
                                  // variant="light"
                                  color="primary"
                                  size="sm"
                                >
                                  <Link
                                    className="font-medium text-base"
                                    to={`#`}
                                  >
                                    Ver Producto
                                  </Link>
                                </Button>
                                <Button
                                  variant="light"
                                  color="primary"
                                  size="sm"
                                >
                                  <p className="font-medium text-base">
                                    Comprar de nuevo
                                  </p>
                                </Button>
                              </div>
                            </div> */}
                          </li>
                        );
                      })}
                    </ul>
                    <div className="flex items-center p-6 pt-4 sm:pt-0 border-b sm:border-none border-primary">
                      {order.status === "approved" ? (
                        <>
                          <CheckCircleIcon className="w-5 h-5 text-green-500" />
                          <span className="text-green-500">
                            Transacción Aprobada
                          </span>
                        </>
                      ) : order.status === "rejected" ? (
                        <>
                          <XCircleIcon className="w-5 h-5 text-red-500" />
                          <span className="text-red-500">
                            Transacción Denegada
                          </span>
                        </>
                      ) : (
                        <>
                          <ClockIcon className="w-5 h-5 text-yellow-500-500" />

                          <span>Transacción Pendiente</span>
                        </>
                      )}
                      <p className="ml-2 font-medium text-gray-500 dark:text-white">
                        <time dateTime={fechaTransaccion}>
                          {" "}
                          {fechaTransaccion}
                        </time>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Orders;
