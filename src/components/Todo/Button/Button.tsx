import React from "react";

interface IButtonProps {
  children: any;
  styleType: any;
  onClickfunc: any;
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
