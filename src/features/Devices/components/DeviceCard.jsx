import { useNavigate } from "react-router-dom";

export const DeviceCard = ({ device }) => {
  const navigate = useNavigate();

  const handleDeviceNavigation = () => {
    navigate(`/devices/edit/${device.id}`);
  };

  return (
    <div className="user-card" onClick={handleDeviceNavigation}>
      <span className="title">{device.name}</span>

      <button className="button-view">View Device</button>
    </div>
  );
};
