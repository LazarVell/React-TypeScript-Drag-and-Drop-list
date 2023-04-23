import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { useDragContext } from "../context/dragContext";
import { OnDropType, OnDragOverType } from "../context/dragContext";

export interface ChildrenProps {
  children: React.ReactNode;
}

interface MyComponentProps extends ChildrenProps {
  index: number;
}

const DragItem = (props: MyComponentProps) => {
  const { users, setUsers } = useContext(UserContext);

  const [dragStartItemIndex, setdragStartItemIndex] = useState<number>();
  const [dragOverItemIndex, setDragOverItemIndex] = useState<number>();
  const [onDropContext, setOnDropContext] = useState<OnDropType>();
  const [onDragOverContext, setOnDragOverContext] = useState<OnDragOverType>();
  const { onDrop, onDragOver } = useDragContext();

  useEffect(() => {
    setOnDropContext(() => onDrop);
    setOnDragOverContext(() => onDragOver);
  }, [onDrop, onDragOver]);

  const handleDragStart = (index: number) => {
    setdragStartItemIndex(index);
  };

  // const handleDrop = (index: number, dragStart: number) => {
  //   onDropContext!(index, dragStart!);
  // };

  const handleDragOver = (event: React.DragEvent<HTMLLIElement>) => {
    onDragOverContext!(event);
  };

  // const handleDragOver = (event: React.DragEvent<HTMLLIElement>) => {
  //   event.preventDefault();
  // };

  const handleDrop = (index: number, dragStartItemIndex: number) => {
    const _users = [...users!];
    const dragItem = _users.splice(dragStartItemIndex!, 1)[0];
    console.log(dragItem);
    _users.splice(dragOverItemIndex!, 0, dragItem);
    console.log(_users);
    setUsers!(_users);
  };

  const handleDragEnter = (index: number) => {
    // console.log(dragOverItemIndex);
    setDragOverItemIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverItemIndex(undefined);
  };

  const handleDragEnd = () => {
    setdragStartItemIndex(undefined);
    setDragOverItemIndex(undefined);
  };

  const { index, children } = props;

  return (
    <li
      key={index}
      className={
        dragOverItemIndex === index ? "list-item next-position" : "list-item"
      }
      draggable
      onDragStart={() => handleDragStart(index)}
      onDragOver={handleDragOver}
      onDrop={() => handleDrop(index, dragStartItemIndex!)}
      onDragEnter={() => handleDragEnter(index)}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragEnd}
    >
      {children}
    </li>
  );
};

export default DragItem;
