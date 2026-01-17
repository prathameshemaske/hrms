import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const PassPercentageChart = ({ data }) => {
  const chartData = [
    { name: 'Passed', value: data.passed },
    { name: 'Failed', value: data.failed },
  ];

  const COLORS = ['#4caf50', '#f44336'];

  return (
    <PieChart width={300} height={300}>
      <Pie
        data={chartData}
        dataKey="value"
        nameKey="name"
        outerRadius={100}
        label
      >
        {chartData.map((_, index) => (
          <Cell key={index} fill={COLORS[index]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default PassPercentageChart;
