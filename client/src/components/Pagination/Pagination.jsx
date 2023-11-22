import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getGames, updateFilterObj } from "../../redux/actions";
import { useSelector } from "react-redux";

const Pagination = (props) => {
  //const dispatch = useDispatch();
  //const games = useSelector((state) => state.games);
  //const filtersObj = useSelector((state) => state.filtersObj);

  const { PaginationData, onPageChange } = props;
  //const { PaginationData } = games;
  const { totalItems, totalPages, currentPage, hasPrevPage, hasNextPage, prevPage, nextPage } = PaginationData;
  const finPag = totalPages - 1;
  let [numPag, setNumPag] = useState(0);

  const indexPagesArray = [];
  let createIndexPages = true;
  let indexCounter = 0;

  if(hasPrevPage) {
    indexPagesArray.push({isEllipsis: false, page: 0});
    if(prevPage > 1) {
      indexPagesArray.push({isEllipsis: true, page: prevPage-1});
      //indexCounter++;
    }
    if(prevPage != 0)
    {
      indexPagesArray.push({isEllipsis: false, page: prevPage});
    }
    
    indexPagesArray.push({isEllipsis: false, page: currentPage});
  } else {
    indexPagesArray.push({isEllipsis: false, page: currentPage});
  }

  if(hasNextPage) {
    let incremental = 1;
    indexPagesArray.push({isEllipsis: false, page: nextPage});
    if(!hasPrevPage && nextPage < totalPages-1) {
      indexPagesArray.push({isEllipsis: false, page: nextPage+incremental});
      incremental++;
    }
    if(nextPage+1 < totalPages-1) {
      indexPagesArray.push({isEllipsis: true, page: nextPage+incremental});
    }
  }

  if(currentPage != totalPages-1 && nextPage != totalPages-1) {
    indexPagesArray.push({isEllipsis: false, page: totalPages-1});
  }

  /*while (createIndexPages) {
      if(hasPrevPage)
  }*/

  //console.log("Render - hasNextPage: " + hasNextPage);
  /*console.log("currentPage: " + currentPage);
  console.log("nextPage: " + nextPage);*/

  /*useEffect(() => {
    const auxFilter  = {
      page: numPag
    }

    dispatch(updateFilterObj(auxFilter));
    //dispatch(getGames(numPag));
    dispatch(getGames(filtersObj));
  }, [numPag, dispatch]);*/

  const handlerAnt = () => {
    //if (numPag > 0) setNumPag(numPag - 1);
    //if (numPag > 0) onPageChange(numPag - 1);
    if(hasPrevPage) {
      onPageChange(prevPage);
    }
  };

  const handlerNext = () => {
    console.log("hasNextPage: " + hasNextPage);
    console.log("nextPage: " + nextPage);
    //setNumPag(numPag + 1);
    //onPageChange(numPag + 1);
    if(hasNextPage) {
      onPageChange(nextPage);
    }
  };

  const handleSelect = (value) => {
    //setNumPag(value);
    onPageChange(value);
  };
  const handlerHome = () => {
    //setNumPag(0);
    onPageChange(0);
  };

  return (
    totalItems <= 0 ? <div>No hay juegos que cumplan los filtros</div> :
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {hasPrevPage && (
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

            {/*hasPrevPage && (
              <a
                href="#"
                onClick={() => handlerHome()}
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                1
              </a>
            )*/}

            

            {indexPagesArray.map((index) => (
                <a
                  id="1"
                  href="#"
                  onClick={() => handleSelect(index.page)}
                  aria-current="page"
                  className={index.page === currentPage ?
                    "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    :
                    "relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                  }
                >
                {index.isEllipsis ? "..." : index.page+1}
              </a>
            ))}



            
            {hasNextPage && (
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
