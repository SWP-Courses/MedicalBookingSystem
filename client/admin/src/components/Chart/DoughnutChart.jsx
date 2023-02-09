import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import "./doughnutchart.css";
import { FcCalendar, FcCancel, FcCheckmark } from "react-icons/fc"

ChartJS.register(ArcElement, Tooltip, Legend);
function DoughnutChart() {
    const data = {
        height: "100px",
        labels: ['Attended', 'Absent', 'Empty'],
        datasets: [
            {
                label: '# of Votes',
                data: [30, 30, 40],
                backgroundColor: [
                    '#5fb2ff',
                    'rgb(255, 99, 132)',
                    '#cccccc',
                ],
                borderColor: [
                    '#5fb2ff',
                    'rgb(255, 99, 132)',
                    '#cccccc',
                ],
                borderWidth: 1,
            },
        ],
    };

    const option = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                display: false
            },

        },
    }

    return (
        <>
            <div className='doughnut'>
                <Doughnut data={data} options={option} />
            </div>
            <div className='custom-legend d-flex flex-column justify-content-around py-3' style={{ paddingLeft: "20px" }}>
                <div className='h-25 d-flex px-3 align-items-center justify-content-between'>
                    <div className='legend-logo'>
                        <FcCheckmark />
                    </div>
                    <div className='legend-title text-end'>
                        <h6 className='legend-title_attended'>Attended</h6>
                        <h5 className='ml-auto fs-3 m-0'>
                            230
                        </h5>
                        <span>
                            (week)
                        </span>
                    </div>
                </div>

                <div className='h-25 d-flex px-3 align-items-center justify-content-between'>
                    <div className='legend-logo'>
                        <FcCancel />
                    </div>
                    <div className='legend-title text-end'>
                        <h6 className='legend-title_absent'>Absent</h6>
                        <h5 className='ml-auto fs-3 m-0'>
                            300
                        </h5>
                        <span>
                            (week)
                        </span>
                    </div>
                </div>

                <div className='h-25 d-flex px-3 align-items-center justify-content-between'>
                    <div className='legend-logo'>
                        <FcCalendar />
                    </div>
                    <div className='legend-title text-end'>
                        <h6 className='legend-title_empty'>Empty</h6>
                        <h5 className='ml-auto fs-3 m-0'>
                            10
                        </h5>
                        <span>
                            (week)
                        </span>
                    </div>
                </div>

            </div>
        </>
    )
}

export default DoughnutChart
