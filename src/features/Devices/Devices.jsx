import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "../../components/UI/Spinner";
import { DevicesList } from "./components/DevicesList";

const baseURL = "https://onelity.azurewebsites.net/devices";

export const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios.get(baseURL).then((response) => {
      setDevices(response.data);
      setLoading(false);
    });
  }, []);

  return loading ? <Spinner /> : <DevicesList devices={devices} />;
};
