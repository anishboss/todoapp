import { useContext } from "react";
import { TodoContext } from "../../contexts/TodoContext";
import Chart from "react-google-charts";

const TodoCountChart = () => {
  const { total, completed } = useContext(TodoContext);
  const data = [
    ["Todo", "Completed Vs Remaining"],
    ["Completed", completed],
    ["Remaining", total - completed],
  ];

  const options = {
    title: "Todo Completed Vs Remaining",
  };

  return (
    <div style={{ margin: "20px" }}>
      <h1>Todo Pie Chart</h1>
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"600px"}
      />
    </div>
  );
};

export default TodoCountChart;
