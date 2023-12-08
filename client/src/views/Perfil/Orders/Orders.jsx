import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";

const Orders = () => {
  return (
    <div className="w-full my-6">
      <div className="max-w-[42rem] mx-auto px-6 text-left">
        <h1 className=" text-2xl md:text-3xl font-bold">
          Historial de Ordenes
        </h1>
        <p className="mt-3 text-gray-500">
          Check the status of recent orders, manage returns, and discover
          similar products.
        </p>
      </div>
      <div className="w-full mt-16">
        <div className="max-w-[42rem] mx-auto sm:px-4 flex flex-col gap-8">
          <div className="text-sm border sm:rounded-lg dark:bg-secondary dark:border-none sm:text-base overflow-hidden">
            <div className="w-full p-6 dark:bg-[#0B0120]">
              <dl className="flex justify-between">
                <div className="">
                  <dt className="font-medium">Numero de orden</dt>
                  <dd className="text-gray-500 mt-1">WU88191111</dd>
                </div>
                <div className="sm:text-end">
                  <dt className="font-medium">Cantidad total</dt>
                  <dd className="font-medium mt-1">$160.00</dd>
                </div>
              </dl>
            </div>
            <ul>
              <li className="px-6 pt-6 border-t sm:pb-6 sm:border-none">
                <div className="flex items-center sm:items-start">
                  <div className="w-20 h-20 sm:w-40 sm:h-40">
                    <img
                      src="https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-01.jpg"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 ml-6">
                    <div className="sm:flex justify-between items-center font-medium">
                      <h5>Micro Backpack</h5>
                      <p className="mt-2 sm:m-0">$70.00</p>
                    </div>
                    <p className="text-gray-500 mt-2 dark:text-white">
                      This durable shopping tote is perfect for the world
                      traveler. Its yellow canvas construction is water, fray,
                      tear resistant. The matching handle, backpack straps, and
                      shoulder loops provide multiple carry options for a day
                      out on your next adventure.
                    </p>
                  </div>
                </div>
                <div className="mt-6 sm:flex justify-between">
                  <div className="flex items-center">
                    <XCircleIcon className="w-5 h-5 text-green-500" />
                    <p className="ml-2 font-medium text-gray-500 dark:text-white">
                      Entregado en
                      <time dateTime="2021-07-12"> July 12, 2021</time>
                    </p>
                  </div>
                  <div className="mt-6 py-2 justify-evenly w-full flex border-t sm:border-none sm:w-fit sm:m-0 sm:p-0 sm:ml-2">
                    <Button variant="light" color="secondary" size="sm">
                      <p className="font-medium text-base">Ver Producto</p>
                    </Button>
                    <Button variant="light" color="secondary" size="sm">
                      <p className="font-medium text-base">Comprar de nuevo</p>
                    </Button>
                  </div>
                </div>
              </li>
              <li className="px-6 pt-6 border-t sm:pb-6 sm:border-none">
                <div className="flex items-center sm:items-start">
                  <div className="w-20 h-20 sm:w-40 sm:h-40">
                    <img
                      src="https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-02.jpg"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 ml-6">
                    <div className="sm:flex justify-between items-center font-medium">
                      <h5>Nomad Shopping Tote</h5>
                      <p className="mt-2 sm:m-0">$90.00</p>
                    </div>
                    <p className="text-gray-500 mt-2 dark:text-white">
                      This durable shopping tote is perfect for the world
                      traveler. Its yellow canvas construction is water, fray,
                      tear resistant. The matching handle, backpack straps, and
                      shoulder loops provide multiple carry options for a day
                      out on your next adventure.
                    </p>
                  </div>
                </div>
                <div className="mt-6 sm:flex justify-between">
                  <div className="flex items-center">
                    <XCircleIcon className="w-5 h-5 text-green-500" />
                    <p className="ml-2 font-medium text-gray-500 dark:text-white">
                      Entregado en
                      <time dateTime="2021-07-12"> July 12, 2021</time>
                    </p>
                  </div>
                  <div className="mt-6 py-2 justify-evenly w-full flex border-t sm:border-none sm:w-fit sm:m-0 sm:p-0 sm:ml-2">
                    <Button variant="light" color="secondary" size="sm">
                      <p className="font-medium text-base">Ver Producto</p>
                    </Button>
                    <Button variant="light" color="secondary" size="sm">
                      <p className="font-medium text-base">Comprar de nuevo</p>
                    </Button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="text-sm border sm:rounded-lg dark:bg-secondary dark:border-none sm:text-base overflow-hidden">
            <div className="w-full p-6 dark:bg-[#0B0120]">
              <dl className="flex justify-between">
                <div className="">
                  <dt className="font-medium">Numero de orden</dt>
                  <dd className="text-gray-500 mt-1">AT48441546</dd>
                </div>
                <div className="sm:text-end">
                  <dt className="font-medium">Cantidad total</dt>
                  <dd className="font-medium mt-1">$40.00</dd>
                </div>
              </dl>
            </div>
            <ul>
              <li className="px-6 pt-6 border-t sm:pb-6 sm:border-none">
                <div className="flex items-center sm:items-start">
                  <div className="w-20 h-20 sm:w-40 sm:h-40">
                    <img
                      src="https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-03.jpg"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 ml-6">
                    <div className="sm:flex justify-between items-center font-medium">
                      <h5>Double Stack Clothing Bag</h5>
                      <p className="mt-2 sm:m-0">$40.00</p>
                    </div>
                    <p className="text-gray-500 mt-2 dark:text-white">
                      This durable shopping tote is perfect for the world
                      traveler. Its yellow canvas construction is water, fray,
                      tear resistant. The matching handle, backpack straps, and
                      shoulder loops provide multiple carry options for a day
                      out on your next adventure.
                    </p>
                  </div>
                </div>
                <div className="mt-6 sm:flex justify-between">
                  <div className="flex items-center">
                    <XCircleIcon className="w-5 h-5 text-green-500" />
                    <p className="ml-2 font-medium text-gray-500 dark:text-white">
                      Entregado en
                      <time dateTime="2021-07-12"> July 12, 2021</time>
                    </p>
                  </div>
                  <div className="mt-6 py-2 justify-evenly w-full flex border-t sm:border-none sm:w-fit sm:m-0 sm:p-0 sm:ml-2">
                    <Button variant="light" color="secondary" size="sm">
                      <p className="font-medium text-base">Ver Producto</p>
                    </Button>
                    <Button variant="light" color="secondary" size="sm">
                      <p className="font-medium text-base">Comprar de nuevo</p>
                    </Button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
