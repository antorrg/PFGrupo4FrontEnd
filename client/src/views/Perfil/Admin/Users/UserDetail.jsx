const UserDetail = ({user, onClose})=> {

    return (
        <div className="bg-blue-500 p-6 rounded-lg shadow-md text-white">
        <div className="mb-4">
          <img
            src={user.picture}
            alt="Perfil de Usuario"
            className="w-20 h-20 rounded-full mx-auto mb-4"
          />
        </div>
        <div>
          <hr className="my-2" />
          <h1 className="text-2xl font-bold mb-2">{user.email}</h1>
          <hr className="my-2" />
          {user.given_name && <h2 className="text-lg mb-2">Nombre: {user.given_name}</h2>}
          {user.nickname && <h2 className="text-lg mb-2">Apodo: {user.nickname}</h2>}
          {user.country && <h2 className="text-lg mb-2">País: {user.country}</h2>}
          {user.role === 0 ? <h2 className="text-lg mb-2">Rol: Administrador</h2> : <h2 className="text-lg mb-2">Rol: Usuario</h2>}
          {user.enable ? <h2 className="text-lg mb-2">Estado: Habilitado</h2> : <h2 className="text-lg mb-2">Estado: Deshabilitado</h2>}
        </div>
        <div className="flex justify-center items-center">
        <button
          onClick={onClose}
          className="  bg-white text-blue-500 px-4 py-2 mt-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 "
        >
          Cerrar
        </button>

        </div>
      </div>
    )
}

export default UserDetail
