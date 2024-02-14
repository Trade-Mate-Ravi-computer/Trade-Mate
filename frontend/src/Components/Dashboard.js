import React, { useEffect } from 'react'
import Navigationbuttons from './Navigationbuttons'
import LeftSidbar from './LeftSidbar'
import RightSidebar from './RightSidebar'
import Home from './Home'
import axios from 'axios'

function Dashboard() {
    let store = JSON.parse(localStorage.getItem('login'))
    useEffect(() => {
        loadProducts();
    }, [])
    const loadProducts = async () => {
        const productDetails = await axios.get("http://localhost:8080/stock/all", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).token : ""}`
            }
        });
        localStorage.setItem('saleDetails', JSON.stringify(productDetails.data))
    }
    return (
        <>
            {store && store.login ? <div>
                <div><h1 className='flex justify-center text-3xl text-gray-800 font-semibold'>Welcome to Trade<span className='text-red-600'>Mate</span></h1></div>
                <div className='gridstyle grid grid-cols-4'>

                    <LeftSidbar opendash="bold" />
                    <div className='border border-gray-100 justify-center col-span-2'>
                        <Navigationbuttons />

                    </div>
                    <div className='border border-gray-100 justify-center'>
                        <RightSidebar />
                    </div>
                </div>
            </div> : <Home />}
        </>
    )
}

export default Dashboard
