import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  getKeyValue,
} from "@nextui-org/react";
import {
  EyeIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

const columns = [
  { name: "GAME" },
  { name: "CANTIDAD" },
  { name: "STATUS" },
  { name: "ACCIONES" },
];

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const users = [
  {
    id: 1,
    game: "Tony Reichert",
    role: "CEO",
    status: "active",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  },
  {
    id: 2,
    game: "Zoey Lang",
    role: "Technical Lead",
    status: "paused",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    id: 3,
    game: "Jane Fisher",
    role: "Senior Developer",
    status: "active",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
  },
  {
    id: 4,
    game: "William Howard",
    role: "Community Manager",
    status: "vacation",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
  },
  {
    id: 5,
    game: "Kristen Copper",
    role: "Sales Manager",
    status: "active",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
  },
];

const GamesTable = () => {
  // const renderCell = React.useCallback((user, columnKey) => {
  //   const cellValue = user[columnKey];

  //   switch (columnKey) {
  //     case "game":
  //       return (
  //         <User
  //           avatarProps={{ radius: "lg", src: user.avatar }}
  //           description={user.email}
  //           game={cellValue}
  //         >
  //           {user.email}
  //         </User>
  //       );
  //     case "role":
  //       return (
  //         <div className="flex flex-col">
  //           <p className="text-bold text-sm capitalize">{cellValue}</p>
  //           <p className="text-bold text-sm capitalize text-default-400">
  //             {user.team}
  //           </p>
  //         </div>
  //       );
  //     case "status":
  //       return (
  //         <Chip
  //           className="capitalize"
  //           color={statusColorMap[user.status]}
  //           size="sm"
  //           variant="flat"
  //         >
  //           {cellValue}
  //         </Chip>
  //       );
  //     case "actions":
  //       return (
  //         <div className="relative flex items-center gap-2">
  //           <Tooltip content="Details">
  //             <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
  //               <EyeIcon className="text-[#f4f4f5]" />
  //             </span>
  //           </Tooltip>
  //           <Tooltip content="Edit user">
  //             <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
  //               <PencilSquareIcon className="text-[#f4f4f5]" />
  //             </span>
  //           </Tooltip>
  //           <Tooltip color="danger" content="Delete user">
  //             <span className="text-lg text-danger cursor-pointer active:opacity-50">
  //               <TrashIcon className="text-[#f4f4f5]" />
  //             </span>
  //           </Tooltip>
  //         </div>
  //       );
  //     default:
  //       return cellValue;
  //   }
  // }, []);

  return (
    <Table>
      <TableHeader>
        {columns.map((column) => {
          return <TableColumn>{column.name}</TableColumn>;
        })}
      </TableHeader>
      <TableBody>
        {users.map((user) => {
          return (
            <TableRow key="1">
              <TableCell>{user.game}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>
                <div className="relative flex items-center gap-2">
                  <Tooltip content="Details">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <EyeIcon className="text-black" />
                    </span>
                  </Tooltip>
                  <Tooltip content="Edit user">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <PencilSquareIcon />
                    </span>
                  </Tooltip>
                  <Tooltip color="danger" content="Delete user">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <TrashIcon />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default GamesTable;
