import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import crossImage from './cross.png'
import UpdateSale from './UpdateSale';
import loder from './loader.gif'

function Remaining() {
    const [saleDetails, setSaleDetails] = useState([])
    const [shortData, setShortData] = useState('')
    const [update, setUpdate] = useState(false)
    const [itemName, setItemName] = useState('')
    const [itemId, setItemId] = useState(0)
    const [loading, setLoading] = useState(true)

    const remainings = []
    useEffect(() => {
        loadSaleDetails();
    }, [])
    function sumArray(arr) {
        let sum = 0;
        arr.forEach(num => {
            sum += num;
        });
        return sum;
    }
    const loadSaleDetails = async () => {
        const saleDetail = await axios.post("http://localhost:8080/sales/allsaledetails",
            { companyName: JSON.parse(localStorage.getItem('companyName')).companyName },
            {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('login')).token}`
                }
            });
        setSaleDetails(saleDetail.data.reverse())

        // console.log(saleDetail.data.reverse())
    }

    const shortEvent = (e) => {
        setShortData(e.target.value)
    }
    const handleOnClickUpdate = (id, itemName) => {
        setUpdate(true)
        setItemName(itemName)
        setItemId(id)

    }
    const handleOnclickBody = () => {
        setUpdate(false)
        loadSaleDetails()
    }
    return (
        <div>
            <div className='w-full font-bold text-3xl text-green-600 underline text-center'>Remaing Details</div>
            <div className="short w-full  h-10 flex justify-between pr-10">
                <div className='m-2 pl-28 '><NavLink to={`/dashboard/${JSON.parse(localStorage.getItem('companyName')).companyName}`} className=" hover:bg-blue-400 hover:text-black rounded-md px-3 py-2 text-sm font-medium bg-blue-800 text-white border border-blue-200 w-10">{localStorage.getItem('login') ? "⇐ Company Dashboard" : "Home"}</NavLink></div> <div>
                    <span className='mr-4 font-semibold text-md'>Search By Name</span>
                    <input type='text' className='border border-blue-600 rounded-md m-1 p-1' placeholder='Enter Customer Name' value={shortData} onChange={(e) => shortEvent(e)}></input>
                </div>

            </div>
            {update && (
                            <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50" onClick={handleOnclickBody}></div>
                        )}
            {/* UpdateSale component */}
            {update &&
                <div className="fixed flex justify-center top-40 left-1/2 bg-white border border-black shadow-md rounded-md z-50">
                    <div className='fixed h-80 p-10 bg-blue-50 rounded-lg  shadow-2xl' id='updateProduct'>
                        <div className='w-full h-10 text-right'> <button className='h-6 w-6 m-2 transition-all hover:h-8 hover:w-8 hover:m-1' onClick={handleOnclickBody}><img src={crossImage} alt="" /></button></div>
                        <UpdateSale itemName={`${itemName}`} id={`${itemId}`} setUpdate={setUpdate} myFunction={loadSaleDetails} />
                    </div>
                </div>
            }
            <div style={{ height: 521 }} className="col-span-3 overflow-y-auto">

                <table className="w-full text-sm text-left rtl:text-right text-blue-500 dark:text-blue-400 ">

                    <thead className="text-xs text-blue-700 uppercase dark:text-blue-400 sticky z-10 top-0">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-white bg-blue-400 text-center">
                                Sr no.
                            </th>
                            <th scope="col" className="px-6 py-3 text-white bg-blue-400 text-center">
                                Customer Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-white bg-blue-400 text-center">
                                Product
                            </th>
                            <th scope="col" className="px-6 py-3 text-white bg-blue-400 text-center">
                                Total Ammount
                            </th>
                            <th scope="col" className="px-6 py-3 text-white bg-blue-400 text-center">
                                Received Ammount                </th>
                            <th scope="col" className="px-6 py-3 text-white bg-blue-400 text-center">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-white bg-blue-400 text-center">
                                Remaining
                            </th>
                            <th scope="col" className="px-6 py-3 text-white bg-blue-400  text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className='border border-x-2 my-1'>
                        {(() => {
                            const items = []
                            let j = 0;
                            let k = 0
                            for (let i = saleDetails.length - 1; i >= 0; i--) {
                                if (i === 0 && loading !== false) {
                                    setLoading(false)
                                }
                                if (saleDetails[i].remaining > 0) {
                                    k++
                                    if (shortData && saleDetails[i].customerName.toLowerCase().includes(shortData.toLowerCase())) {
                                        remainings.push(saleDetails[i].remaining)
                                        j++
                                    }
                                }

                                items.push(saleDetails[i].remaining > 0 ? shortData ? !saleDetails[i].customerName.toLowerCase().includes(shortData.toLowerCase()) ? '' :
                                    <tr className="border-b border-blue-200 dark:border-blue-700">
                                        <th scope="row" className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                            {shortData ? j : k}
                                        </th>
                                        <th scope="row" className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                            {saleDetails[i].customerName.length > 25 ? saleDetails[i].customerName.slice(0, 22) + "..." : saleDetails[i].customerName}
                                        </th>
                                        <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                            {saleDetails[i].itemName.length > 19 ? saleDetails[i].itemName.slice(0, 16) + "..." : saleDetails[i].itemName}
                                        </td>

                                        <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center `}>
                                            {saleDetails[i].totalAmmount}
                                        </td>
                                        <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                            {saleDetails[i].receivedAmmount}
                                        </td>
                                        <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                            {saleDetails[i].date.split('-')[2] + "/" + saleDetails[i].date.split('-')[1] + '/' + saleDetails[i].date.split('-')[0]}
                                        </td>
                                        <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                            {saleDetails[i].remaining}
                                        </td>

                                        <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                            <NavLink className='border border-x-2 py-2 px-4 rounded-xl bg-red-300 hover:bg-green-600 hover:text-white transition-all' onClick={() => handleOnClickUpdate(saleDetails[i].id, saleDetails[i].customerName)}>Received</NavLink>
                                        </td>
                                    </tr>


                                    :
                                    <tr className="border-b border-blue-200 dark:border-blue-700">
                                        <th scope="row" className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                            {shortData ? j : k}
                                        </th>
                                        <th scope="row" className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                            {saleDetails[i].customerName.length > 25 ? saleDetails[i].customerName.slice(0, 22) + "..." : saleDetails[i].customerName}
                                        </th>
                                        <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                            {saleDetails[i].itemName.length > 19 ? saleDetails[i].itemName.slice(0, 16) + "..." : saleDetails[i].itemName}
                                        </td>

                                        <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center `}>
                                            {saleDetails[i].totalAmmount}
                                        </td>
                                        <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                            {saleDetails[i].receivedAmmount}
                                        </td>
                                        <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                            {saleDetails[i].date.split('-')[2] + "/" + saleDetails[i].date.split('-')[1] + '/' + saleDetails[i].date.split('-')[0]}
                                        </td>
                                        <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                            {saleDetails[i].remaining}
                                        </td>

                                        <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                            <NavLink className='border border-x-2 py-2 px-4 rounded-xl bg-red-300 hover:bg-green-600 hover:text-white transition-all' onClick={() => handleOnClickUpdate(saleDetails[i].id, saleDetails[i].customerName)}>Received</NavLink>

                                        </td>
                                    </tr> : ''
                                );



                            }
                            return items;

                        })()}
                      
                    </tbody>
                </table>
                <div className='w-full flex justify-center'> {
                    loading ? <div className='w-full flex justify-center'><img className='' src={loder} alt="" /></div> : ''
                }</div>
                {!shortData ? '' : <div className='w-full text-center mt-3'><span className='text-red-600 font-bold border border-red-300 p-2 '>Total Remaining on Screen :-<span className='text-xl'> {sumArray(remainings)}</span></span></div>}
            </div>


        </div>

    )
}

export default Remaining
