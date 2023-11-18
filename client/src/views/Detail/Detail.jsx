import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { formatFields } from "../../utils/formatField";
import { clearDetails, getDetails } from "../../redux/actions";

function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const detailGame = useSelector((state) => state.detailGame);
  console.log(detailGame);
  useEffect(() => {
    dispatch(getDetails(id));
    return () => {
      dispatch(clearDetails());
    };
  }, [dispatch, id]);

  return (
    <div>
      <div>
        <div>
          <h1> {detailGame?.name}</h1>
          <img
            src={detailGame?.image}
            alt={detailGame?.name}
          />
          <p>Descripción: {detailGame?.description} </p>
          <p>Plataformas: {detailGame?.platforms} </p>
          <p>Géneros: {detailGame?.genres} </p>
          <p>Fecha de lanzamiento: {detailGame?.released} </p>
          <p>Rating: {detailGame?.rating} </p>
        </div>
        <div>
          <Link to="/home">
            <h3>Atras</h3>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Detail;

// import React from 'react'
// import { useParams } from "react-router-dom";

// const Detail = () => {
//   const {id} = useParams()

//   return (
//     <div>
//       <p>Detail {id}</p>
//     </div>
//   )
// }

// export default Detail
