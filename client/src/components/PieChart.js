import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";

// const randColor = () =>  {
//     return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
// }

// console.log(randColor());

const PieChart = (props) => {
    const [chartData1, setChartData1] = useState({});
    const [chartData2, setChartData2] = useState({});
    const [haveData, setHaveData] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get("http://localhost:4000/getData/limit");
                
                const result = response.data.data.transactions;
                const labels = result.map((transaction) => transaction.sender);
                const data1 = result.map((transaction) => parseInt(transaction.credit_amount));
                const data2 = result.map((transaction) => transaction.debit_amount);

                setChartData1({ 
                    labels: labels,
                    datasets: [
                        {
                        data: data1,
                        backgroundColor: ['#004c6d', '#1d5e7e', '#327190', '#4584a2', '#5897b4', '#6babc7', '#7ec0d9', '#92d5ec', '#a6eaff'],
                        }
                    ],
                });

                setChartData2({ 
                    labels: labels,
                    datasets: [
                        {
                        data: data2,
                         backgroundColor: ['#004c6d', '#1d5e7e', '#327190', '#4584a2', '#5897b4', '#6babc7', '#7ec0d9', '#92d5ec', '#a6eaff'],
                        }
                    ],
                });
                

                let valueSum = data1.reduce((a, b) => a + b, 0);
                let thresholdPercent = 3;

                let slices = data1.map((v, i) => ({ label: labels[i], value: v }))
                .reduce((accumulator, currObj) => {
                    const percent = 100 * currObj.value / valueSum;
                    if (percent < thresholdPercent) {
                    const others = accumulator.find(o => o.label === 'Others');
                    if (!others) {
                        return accumulator.concat({ label: 'Others', value: currObj.value });
                    }
                    others.value += currObj.value;
                    } else {
                    accumulator.push(currObj);
                    }
                    return accumulator;
                }, []);

                setChartData1({
                    labels: slices.map(o => o.label),
                    datasets: [
                        {
                        backgroundColor: ['#004c6d', '#1d5e7e', '#327190', '#4584a2', '#5897b4', '#6babc7', '#7ec0d9', '#92d5ec', '#a6eaff'],
                        data: slices.map(o => o.value),
                        }
                    ],
                });

                // valueSum = data2.reduce((a, b) => a + b, 0);

                //  slices = data2.map((v, i) => ({ label: labels[i], value: v }))
                // .reduce((accumulator, currObj) => {
                //     const percent = 100 * currObj.value / valueSum;
                //     if (percent < thresholdPercent) {
                //     const others = accumulator.find(o => o.label === 'Others');
                //     if (!others) {
                //         return accumulator.concat({ label: 'Others', value: currObj.value });
                //     }
                //     others.value += currObj.value;
                //     } else {
                //     accumulator.push(currObj);
                //     }
                //     return accumulator;
                // }, []);

                // setChartData2({
                //     labels: slices.map(o => o.label),
                //     datasets: [
                //         {
                //         backgroundColor: ['#004c6d', '#1d5e7e', '#327190', '#4584a2', '#5897b4', '#6babc7', '#7ec0d9', '#92d5ec', '#a6eaff'],
                //         data: slices.map(o => o.value),
                //         }
                //     ],
                // });
                setHaveData(true);

            }catch(err){
                setHaveData(false);
                console.log(err);
            }
        }
        fetchData();
    }, []);

 

        if (!haveData) { // here
            return <div>Loading...</div>;
          } else {
            return (
                <div style={{ display:"flex", width:'20%', height:'20%', margin: 'auto', 'justifyContent': 'center'}}>
                <Pie data={chartData1} 
                options = {{
                    plugins:  {
                        legend : {display: false}, 
                        title : { display: true, text: props.t('PieChart1')},
                    }
                }} />
                 <Pie data={chartData2} 
                options = {{
                    plugins:  {
                        legend : {display: false}, 
                        title : { display: true, text: props.t('PieChart2')}
                    }
                }} />
                </div>
                
            );
          }
}

export default PieChart;