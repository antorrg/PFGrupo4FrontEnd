import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getGames } from "../../redux/actions";
import { useSelector } from "react-redux";

const Pagination = () => {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.games);

  const { PaginationData } = games;
  const { totalPages } = PaginationData;
  const finPag = totalPages - 1;
  let [numPag, setNumPag] = useState(0);

  useEffect(() => {
    dispatch(getGames(numPag));
  }, [numPag, dispatch]);

  const handlerAnt = () => {
    if (numPag > 0) setNumPag(numPag - 1);
  };

  const handlerNext = () => {
    setNumPag(numPag + 1);
  };

  const handleSelect = (value) => {
    setNumPag(value);
  };
  const handlerHome = () => {
    setNumPag(0);
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {numPag > 0 && (
              <a
                href="#"
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon
                  onClick={handlerAnt}
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </a>
            )}

            {numPag > 0 && (
              <a
                href="#"
                onClick={() => handlerHome()}
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                1
              </a>
            )}
            <a
              id="1"
              href="#"
              onClick={() => handleSelect(numPag)}
              aria-current="page"
              className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {numPag + 1}
            </a>
            {numPag !== finPag && numPag >= finPag && (
              <a
                href="#"
                onClick={() => handleSelect(numPag + 1)}
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                {numPag + 2}
              </a>
            )}
            {numPag !== finPag && numPag >= finPag && (
              <a
                href="#"
                onClick={() => handleSelect(numPag + 2)}
                className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
              >
                {numPag + 3}
              </a>
            )}
            {numPag !== finPag && numPag !== finPag - 1 && (
              <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                ...
              </span>
            )}

            {numPag !== finPag && (
              <a
                href="#"
                onClick={() => handleSelect(finPag)}
                className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
              >
                {finPag + 1}
              </a>
            )}
            {numPag !== finPag && (
              <a
                href="#"
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon
                  onClick={handlerNext}
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </a>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
