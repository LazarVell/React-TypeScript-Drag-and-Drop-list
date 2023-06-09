import React, {
  ReactNode,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { UserContext } from "../context/userContext";
import { User } from "../context/userContext";
import { useDragContext } from "../context/dragContext";

interface DragAreaProps {
  usersList: User[];
  setExampleUsers: Dispatch<SetStateAction<User[]>>;
  children: ReactNode;
}

const DragArea = (props: DragAreaProps) => {
  const { users, setUsers } = useContext(UserContext);
  const { setOnDrop, setOnDragOver } = useDragContext();

  const handleDragOver = (event: React.DragEvent<HTMLLIElement>) => {
    event.preventDefault();
  };

  const handleDrop = (index: number, dragStartItemIndex: number) => {
    const _users = [...users!];
    const dragItem = _users.splice(dragStartItemIndex, 1)[0];
    _users.splice(index, 0, dragItem);
    setUsers!(_users);
  };

  useEffect(() => {
    setOnDrop(() => handleDrop);
    setOnDragOver(() => handleDragOver);
  }, []);

  return <ul className="list">{props.children}</ul>;
};

export default DragArea;
