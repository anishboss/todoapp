import React, { ReactNode } from "react";

interface IButtonProps {
  children: ReactNode;
  styleType: object;
  onClickfunc: () => void;
}

const Button: React.FC<IButtonProps> = ({
  children,
  styleType,
  onClickfunc,
}) => {
  return (
    <button style={styleType} onClick={onClickfunc}>
      {children}
    </button>
  );
};

export default Button;
