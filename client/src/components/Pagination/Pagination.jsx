import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useLocation } from "react-router-dom";
const Pagination = (props) => {
  const currentLocation = useLocation().pathname;
  const { PaginationData, onPageChange } = props;
  const {
    totalItems,
    totalPages,
    currentPage,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
  } = PaginationData;

  const indexPagesArray = [];

  if (hasPrevPage) {
    indexPagesArray.push({ isEllipsis: false, page: 0 });
    if (prevPage > 1) {
      indexPagesArray.push({ isEllipsis: true, page: prevPage - 1 });
    }
    if (prevPage != 0) {
      indexPagesArray.push({ isEllipsis: false, page: prevPage });
    }

    indexPagesArray.push({ isEllipsis: false, page: currentPage });
  } else {
    indexPagesArray.push({ isEllipsis: false, page: currentPage });
  }
  let incremental = 1;
  if (hasNextPage) {
    indexPagesArray.push({ isEllipsis: false, page: nextPage });
    if (!hasPrevPage && nextPage < totalPages - 1) {
      indexPagesArray.push({ isEllipsis: false, page: nextPage + incremental });
      incremental++;
    }
    if (nextPage + 1 < totalPages - 1) {
      indexPagesArray.push({ isEllipsis: true, page: nextPage + incremental });
    }
  }

 if (currentPage != totalPages - 1 && nextPage + incremental != totalPages) {
    indexPagesArray.push({ isEllipsis: false, page: totalPages - 1 });
  }

  const handlerAnt = () => {
    //if (numPag > 0) setNumPag(numPag - 1);
    //if (numPag > 0) onPageChange(numPag - 1);
    if (hasPrevPage) {
      onPageChange(prevPage);
    }
  };

  const handlerNext = () => {
    console.log("hasNextPage: " + hasNextPage);
    console.log("nextPage: " + nextPage);
    //setNumPag(numPag + 1);
    //onPageChange(numPag + 1);
    if (hasNextPage) {
      onPageChange(nextPage);
    }
  };

  const handleSelect = (value) => {
    //setNumPag(value);
    onPageChange(value);
  };

  return totalItems <= 0 ? (
    currentLocation !== "/perfil/games" && (
      <div>No hay juegos que cumplan los filtros</div>
    )
  ) : (
    <div className="flex items-center justify-center px-4 py-3 sm:px-6">
      <div className=" sm:flex sm:items-center sm:justify-between">
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {hasPrevPage && (
              <button className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon
                  onClick={handlerAnt}
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </button>
            )}

            {indexPagesArray.map((index) => (
              <button
                id="1"
                onClick={() => handleSelect(index.page)}
                aria-current="page"
                className={
                  index.page === currentPage
                    ? "relative z-10 inline-flex items-center bg-secondary px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    : "relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900  hover:bg-accent focus:z-20 focus:outline-offset-0 md:inline-flex dark:text-white"
                }
              >
                {index.isEllipsis ? "..." : index.page + 1}
              </button>
            ))}

            {hasNextPage && (
              <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span className="sr-only">Next</span>
                <ChevronRightIcon
                  onClick={handlerNext}
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </button>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
