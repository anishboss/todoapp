import React, { ReactNode } from "react";

interface IButtonProps {
  children: ReactNode;
  styleType: object;
  onClick: () => void;
}

const Button: React.FC<IButtonProps> = ({ children, styleType, onClick }) => {
  return (
    <button style={styleType} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
