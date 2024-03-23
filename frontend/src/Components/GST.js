import React, { useEffect, useState } from 'react'
import axios from 'axios'

function GST() {
    const currentDate = new Date();
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth() + 1)
    const currentYear = currentDate.getFullYear()
    const [year, setYear] = useState(currentYear)
    const [quartSum, setQuartSum] = useState(0)
    const [mmonthSum, setMonthSum] = useState(0)
    const [companyDetails, setCompanyDetails] = useState({});
    const [month, setMonth] = useState(currentMonth)
    const [regMonth, setRegMonth] = useState(currentMonth)
    const [minYear, setMinYear] = useState(0)

    // console.log(currentYear)
    useEffect(() => {
        loadSumOfQuart()
        loadSumOfMonth()
        loadCompanyDetail()
        loadMinYear()
    }, [])
    const loadMinYear = async () => {
        try {
            const minYearValue = await axios.get(`http://localhost:8080/sales/date/${JSON.parse(localStorage.getItem('companyName')).companyName}`,
                {
                    headers: {
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('login')).token}`
                    }
                })
            setMinYear(parseInt(minYearValue.data.split('-')[0]))
            // console.log(minYearValue.data.split('-')[0],typeof(parseInt(minYearValue.data.split('-')[0])))
        } catch (e) {
            console.log("Some error Occurs")
        }
    }

    function quaterMonthFInder(month, currentYear) {
        if (6 >= month && month >= 4) {
            return {
                month1: 4,
                month2: 5,
                month3: 6,
                year: parseInt(year),
                companyName: JSON.parse(localStorage.getItem('companyName')).companyName
            }
        } else if (9 >= month && month >= 7) {
            return {
                month1: 7,
                month2: 8,
                month3: 9,
                year: parseInt(year),
                companyName: JSON.parse(localStorage.getItem('companyName')).companyName
            }
        } else if (12 >= month && month >= 10) {
            return {
                month1: 10,
                month2: 11,
                month3: 12,
                year: parseInt(year),
                companyName: JSON.parse(localStorage.getItem('companyName')).companyName
            }
        } else if (3 >= month && month >= 1) {
            return {
                month1: 1,
                month2: 2,
                month3: 3,
                year: parseInt(year),
                companyName: JSON.parse(localStorage.getItem('companyName')).companyName
            }
        }

    }
    const loadCompanyDetail = async () => {
        const companyDetail = await axios.post(`http://localhost:8080/company/byname/${JSON.parse(localStorage.getItem('companyName')).companyName}`,
            {},
            {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('login')).token}`
                }
            }

        )
        setCompanyDetails(companyDetail.data)
    }
    const loadSumOfQuart = async () => {
        try {
            const sumofQuart = await axios.post('http://localhost:8080/sales/quart',
                quaterMonthFInder(month, year),
                {
                    headers: {
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('login')).token}`
                    }
                }

            )
            setQuartSum(sumofQuart.data)
        }
        catch (e) {
            if (document.getElementById('compositionGst')) {
                document.getElementById('compositionGst').innerHTML = "Choose Correct Quarter for Choosen Year"
                console.log(quaterMonthFInder(month, year))
            }
        }
    }

    const loadSumOfMonth = async () => {
        try {
            const sumofMonth = await axios.post('http://localhost:8080/sales/monthsum',
                {
                    month: regMonth,
                    year: parseInt(year),
                    companyName: JSON.parse(localStorage.getItem('companyName')).companyName
                },
                {
                    headers: {
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('login')).token}`
                    }
                }

            )
            setMonthSum(sumofMonth.data)
        } catch (e) {
            if(document.getElementById('regularGst')){
                document.getElementById('regularGst').innerHTML = "Choose Correct Month for Choosen Year";
            }
           
        }
    }

    const selectValue = () => {
        var selectedQuarter = document.getElementById('quarter') ? document.getElementById('quarter').value : currentMonth
        var selectedYear = document.getElementById('year').value
        var selectRegMonth = document.getElementById('regMonth') ? document.getElementById('regMonth').value : currentMonth
        setMonth(selectedQuarter)
        setYear(selectedYear)
        setRegMonth(parseInt(selectRegMonth))
    }

    const loadSelectedGst = () => {
        loadSumOfQuart()
    }
    const loadRegularGst = () => {
        loadSumOfMonth()
        console.log("Clicked")
    }
    console.log(currentYear === year, typeof (currentYear), typeof (year))
    let yearsList = []
    for (let yr = currentYear; yr >= minYear; yr--) {
        yearsList.push(yr)
    }

    return (
        <div style={{ height: 557}} className="mt-4 text-center">
            <div className='text-2xl font-bold text-gray-500 mt-10'>Your Payable GST Detials :</div>
            {companyDetails.gstType === "Composition" ?
                <div>
                    <div className=' flex justify-center text-center mt-40'>
                        <div className='flex flex-col mx-5'>
                            <label className='font-bold rounded-lg w-60' htmlFor="Quarter month">Select Year </label>
                            <select onChange={selectValue} name="quarter" className='border border-blue-600 p-2 m-2 rounded-lg w-60' id="year">
                                {
                                    yearsList.map((year) => (
                                       <option key={year} value={year}>{year}</option> 
                                    ))
                                }
                            </select>
                        </div>
                        <div className='flex flex-col'>
                            <label className='font-bold rounded-lg w-60' htmlFor="Quarter month">Select Quarter </label>
                            <select onChange={selectValue} name="quarter" className='border border-blue-600 p-2 m-2 rounded-lg w-60' id="quarter">
                                <option disabled={currentMonth < 4 && currentYear === parseInt(year)} value="4">Quarter 1 (Aprail-june)</option>
                                <option disabled={currentMonth < 4 && currentYear === parseInt(year)} value="7">Quarter 2 (July-Sep)</option>
                                <option disabled={currentMonth < 4 && currentYear === parseInt(year)} value="10">Quarter 3 (Oct-Dec)</option>
                                <option value="1">Quarter 4 (Jan-March)</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <button className="border border-blue-600 mt-6 p-2 rounded-lg text-center w-40 bg-blue-400 text-white hover:bg-blue-600" onClick={loadSelectedGst}>Click to select value</button>

                    </div>
                </div> : ''
            }
            {companyDetails.gstType === "Regular" ?
                <div className='mt-36'>
                    <div className='flex justify-center'>
                        <div className='flex flex-col'>
                            <label className='font-bold rounded-lg w-60' htmlFor="Quarter month">Select Month </label>
                            <select onChange={selectValue} name="regMonth" className='border border-blue-600 p-2 m-2 rounded-lg w-60' id="regMonth">
                                <option value="1">January</option>
                                <option disabled={currentMonth < 2 && currentYear === parseInt(year)} value="2">February</option>
                                <option disabled={currentMonth < 3 && currentYear === parseInt(year)} value="3">March</option>
                                <option disabled={currentMonth < 4 && currentYear === parseInt(year)} value="4">Aprail</option>
                                <option disabled={currentMonth < 5 && currentYear === parseInt(year)} value="5">May</option>
                                <option disabled={currentMonth < 6 && currentYear === parseInt(year)} value="6">June</option>
                                <option disabled={currentMonth < 7 && currentYear === parseInt(year)} value="7">July</option>
                                <option disabled={currentMonth < 8 && currentYear === parseInt(year)} value="8">August</option>
                                <option disabled={currentMonth < 9 && currentYear === parseInt(year)} value="9">September</option>
                                <option disabled={currentMonth < 10 && currentYear === parseInt(year)} value="10">October</option>
                                <option disabled={currentMonth < 11 && currentYear === parseInt(year)} value="11">November</option>
                                <option disabled={currentMonth < 12 && currentYear === parseInt(year)} value="12">December</option>

                            </select>
                        </div>
                        <div className='flex flex-col'>
                            <label className='font-bold rounded-lg w-60' htmlFor="Quarter month">Select Year </label>
                            <select onChange={selectValue} name="quarter" className='border border-blue-600 p-2 m-2 rounded-lg w-60' id="year">
                                {
                                    yearsList.map((year) => (
                                        <option key={year} value={year}>{year}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <button className="borde border-blue-600 mt-6 p-2 rounded-lg bg-blue-400 text-white hover:bg-blue-600" onClick={loadRegularGst}>Click to select value</button>

                </div> : ''

            }
            <div className='w-full flex justify-center mt-8 text-center'>
                {
                    companyDetails.gstType === "Composition" &&
                    <div className='flex border border-green-600 m-2 w-96  p-1 rounded-lg shadow-orange-800'>
                        <div className='Text-xl font-bold mt-3 mb-2 pl-2 text-green-600'>Your Composition GST is :-</div>
                        <div id="compositionGst" className="text-x font-bold mt-3 pl-4 text-green-700 rounded-lg">{quartSum * 1 / 100}</div>
                    </div>
                }
                {
                    companyDetails.gstType === "Regular" &&
                    <div className='flex border border-green-600 m-2 w-96 p-2 rounded-lg shadow-orange-800'>
                        <div className='Text-xl font-bold mt-3 mb-2 pl-2 text-green-600'>Your Regular Gst is :-</div>
                        <div id="regularGst" className="text-xl font-bold mt-3 pl-4 text-green-700 rounded-lg">{mmonthSum * 18 / 100}</div>
                    </div>
                }


            </div>

        </div>

    )
}

export default GST
