/*
	Napraviti mini-library za drag & drop (D&D) koji u pozadini koristi context API.
	Implementacija treba da koristi HTML5 D&D API i da se ne oslanja na postojece D&D npm pakete.
	Sva logika (onDragStart, onDragEnd, onDragOver, itd.) treba da se nalazi u DragContext, DragArea i DragItem
	komponentama tako da nije izlozena korisniku library-a.
	
	U ovom slucaju event handler onDragStart trebao bi da bude na DragItem komponenti, dok bi
	onDrop i onDragOver trebali da budu na DragArea componenti. Te dvije komponente izmedju sebe
	trebaju da komuniciraju putem context API.
	
	Metode za komunikaciju mogu da se nalaze u DragContext ili DragArea komponenti.

	Pozeljno je napraviti stil za UserItem komponentu radi boljeg prikaza konacne aplikacije.
	
	Ispod je primjer komponente koja bi korista library na zeljeni nacin. Ukoliko ovakva struktura
	bude u browseru rezultovala renderovanju liste korisnika koja se moze sortirati, zadatak se smatra
	uspjesno zavrsenim.

	Za zadatak kreirati poseban projekat gdje ce sadrzaj App.tsx fajla biti ovaj fajl.
	
	Koristiti React i TypeScript.

	Puno srece ;-)
*/
import React, { useContext, useState } from "react";
import DragItem from "./components/DragItem";
import { UserContext } from "./context/userContext";
import DragArea from "./components/DragArea";
import { User } from "./context/userContext";
import userList from "./users.json";

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

const reduceduserList = userList.slice(0, 10);

export const App = () => {
  // Example
  const { users } = useContext(UserContext);
  const [exampleUsers, setExampleUsers] = useState<User[]>(reduceduserList!);

  return (
    <div className="wrapper">
      <DragArea usersList={exampleUsers!} setExampleUsers={setExampleUsers}>
        {users!.map((user, index) => (
          <DragItem index={index} key={user.id}>
            <UserItem name={user.firstName} email={user.email} id={user.id} />
          </DragItem>
        ))}
      </DragArea>
    </div>
  );
};

export default App;
