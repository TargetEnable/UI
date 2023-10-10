import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SupDash.css'; // You can import your CSS styles here
import Navbar from './Navibar.js';
import { getCount, getIncidentsByWeek, getIncidentPriorityCounts} from './services/userService';
import { PieChart } from '@mui/x-charts/PieChart';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';



const IncidentCircle = ({ count, title, color, handleStatusClick }) => {
  return (
    <div className="incident-circle" onClick={handleStatusClick}>
      <div className="white-square">
        <div className="incident-count" style={{ backgroundColor: color }}>
          {count}
        </div>
      </div>
      <div className="white-title-square">
        <div className="incident-title">{title}</div>
      </div>
    </div>
  );
};

const SupDash = () => {
  const [incidentCounts, setIncidentCounts] = useState({});
  const [lineGraphData, setLineGraphData] = useState([]);
  const [incidentPriorityCounts, setIncidentPriorityCounts] = useState({});
 

  

  const handleStatusClick = (status) => {
    // Check if the provided status is one of the available options
    const validStatusOptions = ['All', 'Open', 'In Progress', 'Closed'];
    const selectedStatus = validStatusOptions.includes(status) ? status : 'All';

    // Navigate to the Incident Assignment page with the selected status
    window.location.href = `/admin/incident_assignment?status=${selectedStatus}`;
  };

  useEffect(() => {
    getCount()
      .then((data) => {
        // Update the state with the fetched data
        setIncidentCounts(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    // Fetch data for the line graph
    getIncidentsByWeek()
      .then((data) => {
        setLineGraphData(data);
      })
      .catch((error) => {
        console.error('Error fetching line graph data:', error);
      });

      getIncidentPriorityCounts()
      .then((data) => {
        setIncidentPriorityCounts(data);
      })
      .catch((error) => {
        console.error('Error fetching line graph data:', error);
      });

     
  }, []);

  return (
    <div className="non-scrollable-container">
  <Navbar />
  <div className="button">
    {/* Use Link component to navigate to the Incident Assignment page with the filter */}
    <Link to={`/admin/incident_assignment?status=In Progress`} style={{ textDecoration: 'none' }}>
      {/* Add any content inside the Link component if needed */}
    </Link>
  </div>
  <div className="circle-row">
    <IncidentCircle
      title="Open Incidents"
      count={incidentCounts.openCount || 0}
      color="#52d0f0e7"
      handleStatusClick={() => handleStatusClick('Open')}
    />
    <IncidentCircle
      title="Closed Incidents"
      count={incidentCounts.closedCount || 0}
      color="#52d0f0e7"
      handleStatusClick={() => handleStatusClick('Closed')}
    />
    <IncidentCircle
      title="In Progress"
      count={incidentCounts.inProgressCount || 0}
      color="#52d0f0e7"
      handleStatusClick={() => handleStatusClick('In Progress')}
    />
  </div>

  <div className="charts-container">
    <div className="line-graph-container">
      <LineChart
        width={600}
        height={400}
        data={lineGraphData}
        margin={{ top: 20, right: 50, left: 30, bottom: 50 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="startDate" tick={{ fontSize: 12, fontWeight: 'bold' }} />
        <YAxis tick={{ fontSize: 12, fontWeight: 'bold' }} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="incidentCount"
          stroke="#03a9f4" // Change the line color to blue
          strokeWidth={2} // Increase line width
          name="Incidents Per Week"
          dot={{ stroke: '#03a9f4', strokeWidth: 4, r: 4 }}
        />
      </LineChart>
    </div>

    <div className="priority-chart-container">
      <div className="pie-chart">
        <PieChart
          series={[
            {
              innerRadius: 60,
              outerRadius: 150,
              paddingAngle: 5,
              cornerRadius: 5,
              startAngle: -180,
              endAngle: 180,
              cx: 160,
              cy: 145,
              data: [
                { id: 0, value: incidentPriorityCounts.High || 0, color: '#2979ff', label: 'High' },
                { id: 1, value: incidentPriorityCounts.Medium || 0, color: '#00b0ff', label: 'Medium' },
                { id: 2, value: incidentPriorityCounts.Low || 0, color: '#00e5ff', label: 'Low' },
              ],
            },
          ]}
          width={500}
          height={350}
        />
      </div>
    </div>
  </div>
</div>
  
  );
};

export default SupDash;






