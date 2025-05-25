import React, { type FC } from "react";
import '../Container/Container.css'

type ContainerProps = {
  children: React.ReactNode;
};

export const Container:FC<ContainerProps> = ({ children }) => {
  return <div className="container">{children}</div>;
}
