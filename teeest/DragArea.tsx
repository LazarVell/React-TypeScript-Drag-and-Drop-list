import React, { ReactNode, useContext, useEffect, useState } from "react";
import { ChildrenProps } from "./DragItem";
import { UserContext } from "../userContext";

const DragArea = ({ children }: ChildrenProps) => {
  const { users, setUsers } = useContext(UserContext);
  const [childUser, setChildUser] = useState();

  useEffect(() => {
    setUsers!(childUser!);
  }, [users]);

  const modifiedChildren = React.Children.map(children, (child: ReactNode) => {
    return React.cloneElement(child as React.ReactElement, {
      setContextUserProp: setChildUser,
    });
  });

  return <div>{modifiedChildren}</div>;
};

export default DragArea;
