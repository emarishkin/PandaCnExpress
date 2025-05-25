import React from "react";
import '../Container/Container.css'

type Props = {
  children: React.ReactNode;
};

export default function Container({ children }: Props) {
  return <div className="container">{children}</div>;
}
