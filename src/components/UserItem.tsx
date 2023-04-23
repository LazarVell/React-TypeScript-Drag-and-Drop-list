type UserProps = {
  name: string;
  email: string;
  id: number;
};

const UserItem = ({ name, email, id }: UserProps) => {
  return (
    <>
      <h3>{id}</h3>
      <span>{name}</span>
      <span>{email}</span>
    </>
  );
};

export default UserItem;
