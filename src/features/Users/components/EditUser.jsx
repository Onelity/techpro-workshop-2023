import { useEffect, useState } from "react";
import { UserForm } from "./UserForm";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Spinner } from "../../../components/UI/Spinner";

const baseURL = "https://onelity.azurewebsites.net/users";

export const EditUser = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    axios.get(`${baseURL}/${id}`).then((response) => {
      setUser(response.data);
      setLoading(false);
    });
  }, [id]);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <h2>Edit user</h2>

      <UserForm user={user} />
    </>
  );
};
