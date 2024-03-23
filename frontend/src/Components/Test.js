import React, { useRef } from 'react';
import {QRCodeSVG} from 'qrcode.react';
import emailjs from "@emailjs/browser";


function Test() {
  // // UPI details
  // const upiId = 'mauryaravi599-4@okicici'; // Replace with the receiver's UPI ID
  // const amount = '2990'; // Optional: Replace with the payment amount
  // const note = 'Payment for check upi code'; // Optional: Payment note

  // // UPI URL format: upi://pay?pa=UPI_ID&am=AMOUNT&cu=INR&pn=NAME&tn=NOTE
  // const upiUrl = `upi://pay?pa=${upiId}&am=${amount}&cu=INR&pn=Name&tn=${note}`;
  const form =useRef()
const sendMail=(e)=>{
  e.preventDefault()
  console.log("Submited Form")
  emailjs.sendForm(
    'service_nssug1z',
    'template_cs2zpq4',
    form.current,
    'gRnAhI6GS0Gzlw9Ec'
  ).then((result)=>{
console.log("Result ",result)
  })
}
  return (

    <div >
      {/* <h2>UPI QR Code</h2> */}
      {/* <QRCodeSVG value={upiUrl} /> */}
      <div className="container mx-auto mt-10 w-80 h-screen">
        <form ref={form} onSubmit={(e)=>sendMail(e)} className="max-w-lg mx-auto bg-white p-8 rounded shadow-md">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user_name">User Name</label>
                <input className="appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-700" id="user_name" name='user_name' type="text" placeholder="Enter your username"/>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">Message</label>
                <input className="appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-700" id="message" name='message' type="text" placeholder="Enter your message"/>
            </div>
            <div className="flex justify-center">
                <button  type="submit">
                    Click to send mail of your data
                </button>
            </div>
        </form>
    </div>
    </div>
  );
}

export default Test;
