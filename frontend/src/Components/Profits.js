import React, { useEffect, useState } from 'react';
import LeftSidbar from './LeftSidbar';
import RightSidebar from './RightSidebar';
import axios from 'axios';

function Profits() {
    const [profitData, setProfitData] = useState({});
    const [yearlyData, setYearlyData] = useState({});
    const [allReport, setAllReport] = useState({});
    const todayDate = new Date();
    const currentMonth = todayDate.getMonth();
    const currentYear = todayDate.getFullYear();
    const currentDate = todayDate.getDate();
    const [dateState, setDateState] = useState({
        year: currentYear,
        month: currentMonth + 1,
        day: currentDate,
        companyName: JSON.parse(localStorage.getItem('companyName')).companyName
    });

    const monthInLetter = changeNumberToMonth(dateState.month);

    function changeNumberToMonth(months) {
        let month = "";
        switch (months) {
            case 1:
                month = "January";
                break;
            case 2:
                month = "February";
                break;
            case 3:
                month = "March";
                break;
            case 4:
                month = "April";
                break;
            case 5:
                month = "May";
                break;
            case 6:
                month = "June";
                break;
            case 7:
                month = "July";
                break;
            case 8:
                month = "August";
                break;
            case 9:
                month = "September";
                break;
            case 10:
                month = "October";
                break;
            case 11:
                month = "November";
                break;
            case 12:
                month = "December";
                break;
            default:
                month = null;
        }
        return month;
    }

    useEffect(() => {
        loadData();
        loadYearData();
        loadAllReport();
    }, []);

    const loadData = async () => {
        try {
            const profits = await axios.post(
                `http://localhost:8080/sales/profit`,
                dateState,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).token : ""}`
                    }
                }
            );
            setProfitData(profits.data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const loadYearData = async () => {
        try {
            const response = await axios.post(
                `http://localhost:8080/sales/byyear`,
                dateState,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).token : ""}`
                    }
                }
            );
            setYearlyData(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const loadAllReport = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8080/sales/totalsum',
                dateState,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).token : ""}`
                    }
                }
            );
            setAllReport(response.data);
        } catch (error) {
            console.log("Something went wrong");
        }
    }

    return (
        <div>
            <div><h1 className='flex justify-center text-3xl font-bold text-green-600'>Profits</h1></div>
            <div className='grid grid-cols-4'>
                <LeftSidbar />
                <div className='border border-blue-900 rounded-lg col-span-2'>
                    <div className='w-full bg-green-700 p-1 text-white rounded-md text-center'>{` ${monthInLetter}, ${currentYear} `} Report</div>
                    <div className='flex '>
                        <div className='flex flex-col w-60 h-40 m-2 border border-green-600 rounded-xl shadow-lg'>
                            <div className="text-green-600 font-bold border border-x-2 h-10 flex justify-center items-center shadow-lg w-full rounded-xl">Profit in {` ${monthInLetter}`}</div>
                            <div className="flex justify-center m-6 font-bold text-3xl text-green-600">₹ {profitData.sumOfProfit}</div>
                        </div>
                        <div className='flex flex-col w-60 h-40 m-2 border border-green-600 rounded-xl shadow-lg'>
                            <div className="text-green-600 font-bold border border-x-2 h-10 flex justify-center items-center shadow-lg w-full rounded-xl">Revenue in {` ${monthInLetter}`}</div>
                            <div className="flex justify-center m-6 font-bold text-3xl text-green-600">₹ {profitData.sumOfTotalAmmount}</div>
                        </div>
                        <div className='flex flex-col w-60 h-40 m-2 border border-green-600 rounded-xl shadow-lg'>
                            <div className="text-green-600 font-bold border border-x-2 h-10 flex justify-center items-center shadow-lg w-full rounded-xl">Remaining in {` ${monthInLetter}`}</div>
                            <div className="flex justify-center m-6 font-bold text-3xl text-red-600">₹ {profitData.sumOfRemaining}</div>
                        </div>
                    </div>
                    <div className='w-full bg-green-700 p-1 text-white rounded-md text-center'>{`${currentYear} `} Report</div>
                    <div className='flex '>
                        <div className='flex flex-col w-60 h-40 m-2 border border-green-600 rounded-xl shadow-lg'>
                            <div className="text-green-600 font-bold border border-x-2 h-10 flex justify-center items-center shadow-lg w-full rounded-xl">Profit in {` ${currentYear}`}</div>
                            <div className="flex justify-center m-6 font-bold text-3xl text-green-600">₹ {yearlyData.sumOfProfit}</div>
                        </div>
                        <div className='flex flex-col w-60 h-40 m-2 border border-green-600 rounded-xl shadow-lg'>
                            <div className="text-green-600 font-bold border border-x-2 h-10 flex justify-center items-center shadow-lg w-full rounded-xl">Revenue in {` ${currentYear}`}</div>
                            <div className="flex justify-center m-6 font-bold text-3xl text-green-600">₹ {yearlyData.sumOfTotalAmmount}</div>
                        </div>
                        <div className='flex flex-col w-60 h-40 m-2 border border-green-600 rounded-xl shadow-lg'>
                            <div className="text-green-600 font-bold border border-x-2 h-10 flex justify-center items-center shadow-lg w-full rounded-xl">Remaining in {` ${currentYear}`}</div>
                            <div className="flex justify-center m-6 font-bold text-3xl text-red-600">₹ {yearlyData.sumOfRemaining}</div>
                        </div>
                    </div>
                    <div className='w-full bg-green-700 p-1 text-white rounded-md text-center'>All Time Report</div>
                    <div className='flex '>
                        <div className='flex flex-col w-60 h-40 m-2 border border-green-600 rounded-xl shadow-lg'>
                            <div className="text-green-600 font-bold border border-x-2 h-10 flex justify-center items-center shadow-lg w-full rounded-xl">Total Profit</div>
                            <div className="flex justify-center m-6 font-bold text-3xl text-green-600">₹ {allReport.sumOfProfit}</div>
                        </div>
                        <div className='flex flex-col w-60 h-40 m-2 border border-green-600 rounded-xl shadow-lg'>
                            <div className="text-green-600 font-bold border border-x-2 h-10 flex justify-center items-center shadow-lg w-full rounded-xl">Total Revenue</div>
                            <div className="flex justify-center m-6 font-bold text-3xl text-green-600">₹ {allReport.sumOfTotalAmmount}</div>
                        </div>
                        <div className='flex flex-col w-60 h-40 m-2 border border-green-600 rounded-xl shadow-lg'>
                            <div className="text-green-600 font-bold border border-x-2 h-10 flex justify-center items-center shadow-lg w-full rounded-xl">Total Remaining</div>
                            <div className="flex justify-center m-6 font-bold text-3xl text-red-600">₹ {allReport.sumOfRemaining}</div>
                        </div>
                    </div>
                </div>
                <div className='border border-blue-100'>
                    <RightSidebar />
                </div>
            </div>
        </div>
    )
}

export default Profits;
