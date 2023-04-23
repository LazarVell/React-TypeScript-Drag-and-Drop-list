import React, { useState } from "react";
import { UserContext } from "../userContext";

interface MyComponentProps {
  children: React.ReactNode;
  index: number;
}

const DragItem = (props: MyComponentProps) => {
  const [sports, setSports] = useState<string[]>([
    "Football",
    "Basketball",
    "Baseball",
    "Soccer",
    "Hockey",
    "Running",
    "Chess",
    "Karate",
    "Kungfu",
  ]);

  const [dragStartItemIndex, setdragStartItemIndex] = useState<number>();
  const [dragOverItemIndex, setDragOverItemIndex] = useState<number>();

  const handleDragStart = (index: number) => {
    setdragStartItemIndex(index);
  };

  const handleDragOver = (event: React.DragEvent<HTMLLIElement>) => {
    event.preventDefault();
  };

  const handleDrop = (index: number) => {
    const _sports = [...sports];
    const dragItem = _sports.splice(dragStartItemIndex!, 1)[0];
    _sports.splice(index, 0, dragItem);
    setSports(_sports);
  };

  const handleDragEnter = (index: number) => {
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
      onDrop={() => handleDrop(index)}
      onDragEnter={() => handleDragEnter(index)}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragEnd}
    >
      {children}
    </li>
  );
};

export default DragItem;
