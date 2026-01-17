import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const DefectDensityChart = ({ data }) => {
  const chartData = [
    {
      name: 'Defects',
      value: Number(data.defect_density),
    },
  ];

  return (
    <BarChart width={300} height={300} data={chartData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" />
    </BarChart>
  );
};

export default DefectDensityChart;
