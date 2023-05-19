import { useEffect, useState } from "react";
import axios from "axios";
import { UserList } from "./components/UserList";
import "./styles.css";
import { Spinner } from "../../components/UI/Spinner";
import { Paginate } from "./components/Paginate";

const baseURL = "https://onelity.azurewebsites.net/users";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(100);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(users.length / usersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    setLoading(true);

    axios.get(baseURL).then((response) => {
      setUsers(response.data);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <Paginate previousPage={previousPage} nextPage={nextPage} />
      <UserList users={currentUsers} />
    </>
  );
};
