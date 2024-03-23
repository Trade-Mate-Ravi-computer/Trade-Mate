import React, { useState } from 'react';

const CompositionGSTCalculator = () => {
  const [quarterlySales, setQuarterlySales] = useState([0, 0, 0]);
  const [gstRate, setGstRate] = useState(0);
  const [quarterlyTotalSales, setQuarterlyTotalSales] = useState(0);
  const [quarterlyGST, setQuarterlyGST] = useState(0);

  const handleSalesChange = (index, value) => {
    const newSales = [...quarterlySales];
    newSales[index] = value;
    setQuarterlySales(newSales);
  };

  const calculateQuarterlyTotalSales = () => {
    const total = quarterlySales.reduce((acc, cur) => acc + parseFloat(cur), 0);
    setQuarterlyTotalSales(total.toFixed(2));
  };

  const calculateQuarterlyGST = () => {
    const gstAmount = (parseFloat(quarterlyTotalSales) * gstRate) / 100;
    setQuarterlyGST(gstAmount.toFixed(2));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Quarterly Composition GST Calculator</h2>
      {[0, 1, 2].map((index) => (
        <div key={index} className="mb-4">
          <label htmlFor={`month${index + 1}`} className="block mb-1">Month {index + 1} Sales:</label>
          <input
            type="number"
            id={`month${index + 1}`}
            value={quarterlySales[index]}
            onChange={(e) => handleSalesChange(index, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      ))}
      <div className="mb-4">
        <label htmlFor="gstRate" className="block mb-1">GST Rate (%):</label>
        <select
          id="gstRate"
          value={gstRate}
          onChange={(e) => setGstRate(parseInt(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="0">0</option>
          <option value="5">5</option>
          <option value="12">12</option>
          <option value="18">18</option>
          <option value="28">28</option>
        </select>
      </div>
      <button onClick={() => { calculateQuarterlyTotalSales(); calculateQuarterlyGST(); }} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Calculate Quarterly GST</button>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Quarterly Total Sales: {quarterlyTotalSales}</h3>
        <h3 className="text-lg font-semibold">Quarterly GST: {quarterlyGST}</h3>
      </div>
    </div>
  );
};

export default CompositionGSTCalculator;
