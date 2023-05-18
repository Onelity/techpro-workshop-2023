import { useNavigate } from "react-router-dom";

export const UserCard = ({ user }) => {
  const navigate = useNavigate();

  const handleUserNavigation = () => {
    navigate(`/users/edit/${user.id}`);
  };

  return (
    <div className="user-card" onClick={handleUserNavigation}>
      <img src={user.avatar} alt="avatar" />
      <span className="title">
        {user.firstName} {user.lastName}
      </span>
      {user.email}

      <button className="button-view">View Profile</button>
    </div>
  );
};
