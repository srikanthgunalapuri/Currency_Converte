import React, { useState } from 'react'
import ConverterSelect from './ConverterSelect'

const ConverterForm = () => {

    const [formCurrency, setFormCurrency] = useState("USD")
    const [toCurrency, setToCurrency] = useState("INR")
    const [exchangeRate, setExchangeRate] = useState(null);
    const [amount, setAmount] = useState(0);
     
    const handleCurrencies = () => {
            setFormCurrency(toCurrency)
            setToCurrency(formCurrency)
    }
 
    const getExchangeRate = async () => {
      const API_KEY = '7256d1d638d9c13b599408b8';  // Added API key here
      const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${formCurrency}/${toCurrency}`;

      try {
          const response = await fetch(API_URL);
          const data = await response.json();

          if (data.result === "success") {
              setExchangeRate(data.conversion_rate);
          } else {
              alert("Error fetching exchange rate.");
          }
      } catch (error) {
          alert("Error fetching data: " + error);
      }
  };


    const handleFormSubmit = (e) => {
      e.preventDefault()
      getExchangeRate()
    }

    const handleAmountChange = (e) => {
      setAmount(e.target.value);
  };

  return (
    <form className="converter_form" onSubmit={handleFormSubmit}>
    <div className="form_group">
      <label className="form_label">Enter Amount</label>
      <input type="number" 
      className="form_input" 
      value={amount}
      onChange={handleAmountChange}
      required/>
    </div>

    <div className="form_group form_currency_group">

      <div className="form_section">
        <label className="form_label">From</label>
        <ConverterSelect 
          selectedCurrency={formCurrency}
          handleCurrency={e => setFormCurrency(e.target.value)}
        />
      </div>

      <div className="swap_icon" onClick={handleCurrencies}>
      <svg width="16" viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg">
<path
  d="M19.13 11.66H.22a.22.22 0 0 0-.22.22v1.62a.22.22 0 0 0 .22.22h16.45l-3.92 4.94a.22.22 0 0 0 .17.35h1.97c.13 0 .25-.06.33-.16l4.59-5.78a.9.9 0 0 0-.7-1.43zM19.78 5.29H3.34L7.26.35A.22.22 0 0 0 7.09 0H5.12a.22.22 0 0 0-.34.16L.19 5.94a.9.9 0 0 0 .68 1.4H19.78a.22.22 0 0 0 .22-.22V5.51a.22.22 0 0 0-.22-.22z"
  fill="#fff"
/>
</svg>
      </div>

      <div className="form_section">
        <label className="form_label">To</label>
        <ConverterSelect 
          selectedCurrency={toCurrency}
          handleCurrency={e => setToCurrency(e.target.value)}

        />
      </div>

     

    </div>
    <button type='submit' className='submit_button'>Get Exchange Rate</button>
    {exchangeRate && (
                <p className="exchange_rate_result">
                    {amount} {formCurrency} = {(amount * exchangeRate).toFixed(2)} {toCurrency}
                </p>
            )}
  </form>
  )
}

export default ConverterForm