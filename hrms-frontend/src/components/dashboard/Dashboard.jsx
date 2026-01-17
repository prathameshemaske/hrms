import { useEffect, useState } from 'react';
import {
  getDashboardSummary,
  getTestPassPercentage,
  getDefectDensity,
} from '../../api/reports.api';

import SummaryCards from '../../components/dashboard/SummaryCards';
import PassPercentageChart from '../../components/charts/PassPercentageChart';
import DefectDensityChart from '../../components/charts/DefectDensityChart';

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [passData, setPassData] = useState(null);
  const [defectData, setDefectData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [summaryRes, passRes, defectRes] = await Promise.all([
          getDashboardSummary(),
          getTestPassPercentage(),
          getDefectDensity(),
        ]);

        setSummary(summaryRes);
        setPassData(passRes);
        setDefectData(defectRes);
      } catch (err) {
        console.error('Failed to load dashboard data', err);
      }
    };

    loadData();
  }, []);

  if (!summary || !passData || !defectData) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div>
      <h2>Dashboard</h2>

      <SummaryCards summary={summary} />

      <div style={{ display: 'flex', gap: '40px' }}>
        <div>
          <h4>Pass Percentage</h4>
          <PassPercentageChart data={passData} />
        </div>

        <div>
          <h4>Defect Density</h4>
          <DefectDensityChart data={defectData} />
        </div>
      </div>
    </div>
  );
};



export default Dashboard;
