import { DeviceCard } from "./DeviceCard";

export const DevicesList = ({ devices }) => {
  return (
    <div className="users-list" data-testid="users-list">
      {devices.map((device) => (
        <DeviceCard device={device} key={device.id} />
      ))}
    </div>
  );
};
