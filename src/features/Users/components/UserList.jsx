import { UserCard } from "./UserCard";

export const UserList = ({ users }) => {
  return (
    <div className="users-list" data-testid="users-list">
      {users.map((user) => (
        <UserCard user={user} key={user.id} />
      ))}
    </div>
  );
};
