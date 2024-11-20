import { ReactNode } from "react";

interface IFormModelProps {
  children: ReactNode;
  setIsModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoFormModel = ({ children, setIsModelOpen }: IFormModelProps) => {
  return (
    <div
      style={{
        position: "relative",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        justifyItems: "center",
        width: "500px",
        height: "200px",
        backgroundColor: "grey",
        borderRadius: "20px",
      }}
    >
      <button
        style={{ position: "absolute", top: "0", right: "0" }}
        onClick={() => {
          setIsModelOpen(false);
        }}
      >
        close
      </button>
      {children}
    </div>
  );
};

export default TodoFormModel;
