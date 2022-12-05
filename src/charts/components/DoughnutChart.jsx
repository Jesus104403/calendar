import {useMemo} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);

const scores = [12, 19, 3, 5];
const labels = ['Shopping', 'Family', 'Food & Drink', 'Transportation'];

const options = {
    responsive: false,
}

export default function DoughnutChart() {
   const data = useMemo(function () {
        return {
            datasets: [
                {
                    label: 'Datos income',
                    data: scores,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                      ],
                      borderWidth: 1,
                }
            ],

         labels,
        }
   },[]);

   return <Doughnut data={data} options={options}/>;

}
