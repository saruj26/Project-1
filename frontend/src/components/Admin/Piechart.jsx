import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Legend,
  Tooltip,
  Title,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Legend,
  Tooltip,
  Title
);






function Piechart() {


  const [pendingCount, setPendingCount] = useState(0);
  const [deliveredCount, setDeliveredCount] = useState(0);
  const [processingCount, setProcessingCount] = useState(0);

useEffect(()=>{
  count();
},[]);

useEffect(() => {
  console.log('Updated pending count:', pendingCount);
  console.log('Updated delivered count:', deliveredCount);
  console.log('Updated processing count:', processingCount);
}, [pendingCount, deliveredCount, processingCount]);

const count =async() =>{
   try {
    const response = await axios.post('http://localhost:8080/backend/api/Admin/chart.php');
    const jsonData = response.data;
    //console.log(response);
    console.log('API response:', jsonData);
    console.log(jsonData.pending);
    console.log(jsonData.delivered);
    console.log(jsonData.processing);
    setPendingCount(jsonData.pending);
    setDeliveredCount(jsonData.delivered);
    setProcessingCount(jsonData.processing)
    //console.log({pendingCount});
    //console.log({deliveredCount});
    
  } catch (error) {
    console.error('Error  order details count:', error);
  }
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: '',
    },
  },
};

const data = {
  labels: ['Pending','Delivered', 'Processing'],
  datasets: [
    {
      label: 'Order',
      data: [pendingCount, deliveredCount, processingCount],
      backgroundColor: [
        '#ff4d043d',  // Pending
        '#ff9999',  // Delivered
        '#ff6666',  // Processing
        
      ],
      borderColor: [
        'rgba(255, 77, 73, 1)',   // Pending border
        'rgba(255, 153, 153, 1)', // Delivered border
        'rgba(255, 102, 102, 1)',   // Processing border
        
      ],
      borderWidth: 1,
    },
  ],
};

  return (
    // <div >
    <div className='d-flex' style={{width:'60%', marginLeft:'16%'}}>
      <Pie data={data} options={options} />
     
    </div>
  );
}

export default Piechart;