import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2'
import { faker } from '@faker-js/faker'
import "./revenuechart.css"
import axios from "axios";
import ROUTER from "~/api/adminRouter";

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController
);

function RevenueChart() {

    const [dataBooked, setDataBooked] = useState([]);

    const getAllBookedService = async () => {
        try {
            const res = await axios.get(`${ROUTER}/api/bookedservices`);
            setDataBooked(res.data.result)
            console.log(dataBooked)
        } catch (error) {
            console.log(error);
            // toast.warning(error)
        }
    };

    const months = [...Array(12)].map((_, i) => i + 1);

    const dataPatientsHandle = months.map((month) => {
        const bookingsInMonth = dataBooked.filter((booking) => {
            const bookingMonth = new Date(booking.date).getMonth() + 1;
            return bookingMonth === month;
        });

        const totalBookings = bookingsInMonth.reduce((total, booking) => {
            return total + 1;
        }, 0);

        return totalBookings;
    });

    const dataRevenueHandle = months.map((month) => {
        const bookingsInMonth = dataBooked.filter((booking) => {
            const bookingMonth = new Date(booking.date).getMonth() + 1;
            return bookingMonth === month && booking.total_price;
        });

        console.log('bookingsInMonth', bookingsInMonth)
        const total = bookingsInMonth.reduce((acc, item) => {
            return acc + item.total_price;
        }, 0);
        return total;
    });

    useEffect(() => {
        getAllBookedService()
    }, []);

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dataPatients = {
        height: '100%',
        labels: labels,
        datasets: [
            // {
            //     type: 'line',
            //     label: 'Revenue',
            //     borderColor: 'rgb(255, 99, 132)',
            //     pointBorderColor: 'rgb(255, 99, 132)',
            //     borderWidth: 2,
            //     fill: false,
            //     data: dataRevenueHandle,
            //     tension: 0.1,
            //     backgroundColor: "rgb(255, 99, 132)"
            // },

            {
                type: 'bar',
                label: 'Patients',
                backgroundColor: '#5fb2ff',
                data: dataPatientsHandle,
                barPercentage: 0.6
            },
        ],
    };

    const optionPatients = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },

        },
    }

    const dataRevenue = {
        height: '100%',
        labels: labels,
        datasets: [
            {
                type: 'line',
                label: 'Revenue',
                borderColor: 'rgb(255, 99, 132)',
                pointBorderColor: 'rgb(255, 99, 132)',
                borderWidth: 2,
                fill: false,
                data: dataRevenueHandle,
                tension: 0.1,
                backgroundColor: "rgb(255, 99, 132)"
            },
        ],
    };

    const optionRevenue = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },

        },
    }

    return (
        <div className='barchart d-flex flex-column justify-content-center gap-1'>
            <h4>Business situation</h4>
            <div className='h-85'>
                <Chart type='bar' data={dataRevenue} options={optionRevenue} />
            </div>

            <div className='h-85'>
                <Chart type='bar' data={dataPatients} options={optionPatients} />
            </div>
            
            {/* <div className=' d-flex justify-content-end gap-2 pt-1'>
                <button type="button" className="btn btn-secondary">Quarter </button>
                <button type="button" className="btn btn-secondary">Month</button>
                <button type="button" className="btn btn-secondary">Year</button>
            </div> */}
        </div>
    )
}

export default RevenueChart