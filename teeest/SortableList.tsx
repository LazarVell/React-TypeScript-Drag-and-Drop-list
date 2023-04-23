import { useState } from "react";

const SortableList: React.FC = () => {
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
  const [dragItemIndex, setDragItemIndex] = useState<number>();
  const [dragOverItemIndex, setDragOverItemIndex] = useState<number>();

  const handleDragStart = (index: number) => {
    setDragItemIndex(index);
  };

  const handleDragOver = (event: React.DragEvent<HTMLLIElement>) => {
    event.preventDefault();
  };

  const handleDrop = (index: number) => {
    const _sports = [...sports];
    const dragItem = _sports.splice(dragItemIndex!, 1)[0];
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
    setDragItemIndex(undefined);
    setDragOverItemIndex(undefined);
  };

  return (
    <div>
      <h1>Favorite Sports</h1>
      <div className="list">
        {sports.map((sport, index) => (
          <li
            key={index}
            className={
              dragOverItemIndex === index
                ? "list-item next-position"
                : "list-item"
            }
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            onDragEnter={() => handleDragEnter(index)}
            onDragLeave={handleDragLeave}
            onDragEnd={handleDragEnd}
          >
            <span>{index}</span>
            <h3>{sport}</h3>
          </li>
        ))}
      </div>
    </div>
  );
};

export default SortableList;
