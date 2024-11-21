import TodoCountChart from "../components/Charts/TodoCountChart";
import { Link } from "react-router-dom";

const ChartPage = () => {
  return (
    <>
      <TodoCountChart />
      <div>
        <Link
          to={"/"}
          style={{
            border: "none",
            padding: "10px 30px",
            borderRadius: "10px",
            textAlign: "center",
            textDecoration: "none",
            fontSize: "14px",
            cursor: "pointer",
            color: "white",
            backgroundColor: "black",
          }}
        >
          Back
        </Link>
      </div>
    </>
  );
};

export default ChartPage;
