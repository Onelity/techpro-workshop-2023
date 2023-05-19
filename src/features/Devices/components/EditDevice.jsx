import { useEffect, useState } from "react";
import { DeviceForm } from "./DeviceForm";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Spinner } from "../../../components/UI/Spinner";

const baseURL = "https://onelity.azurewebsites.net/devices";

export const EditDevice = () => {
  const [device, setDevice] = useState();
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    axios.get(`${baseURL}/${id}`).then((response) => {
      setDevice(response.data);
      setLoading(false);
    });
  }, [id]);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <h2>Edit device</h2>

      <DeviceForm device={device} />
    </>
  );
};
