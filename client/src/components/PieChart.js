import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";

const PieChart = (props) => {
    const [chartData1, setChartData1] = useState({});
    const [chartData2, setChartData2] = useState({});
    const [haveData, setHaveData] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get("http://localhost:4000/getData/pieChart");
                
                const result = response.data.data.transactions;
                const labels = result.map((transaction) => transaction.sender);
                const data1 = result.map((transaction) => parseInt(transaction.sum_credit));
                const data2 = result.map((transaction) => transaction.sum_debit);
                const backgroundColor = ['#004c6d', '#1d5e7e', '#327190', '#4584a2', '#5897b4', '#6babc7', '#7ec0d9', '#92d5ec', '#a6eaff'];

                setChartData1({ 
                    labels: labels,
                    datasets: [
                        {
                            data: data1,
                            backgroundColor: backgroundColor,
                        }
                    ],
                });

                setChartData2({ 
                    labels: labels,
                    datasets: [
                        {
                            data: data2,
                            backgroundColor: backgroundColor,
                        }
                    ],
                });
                
                setHaveData(true);

            }catch(err){
                setHaveData(false);
                console.log(err);
            }
        }
        fetchData();
    }, []);

 

        if (!haveData) { 
            return <div>Loading...</div>;
          } else {
            return (
                <div style={{ display:"flex", width:'20%', height:'20%', margin: 'auto', 'justifyContent': 'center'}}>
                <Pie data={chartData1} 
                options = {{
                    plugins:  {
                        legend : { display: false }, 
                        title : { display: true, text: props.t('PieChart1')},
                    }
                }} />
                 <Pie data={chartData2} 
                options = {{
                    plugins:  {
                        legend : { display: false }, 
                        title : { display: true, text: props.t('PieChart2')}
                    }
                }} />
                </div>
                
            );
          }
}

export default PieChart;