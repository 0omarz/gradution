import React, { useState } from "react";
import "./Payment.css"; 
import Navbar from './Navbar';
import { cardPayment, payPalPayment } from './authService';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const token = localStorage.getItem('UserToken');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      let response;
      if (paymentMethod === 'creditCard') {
        const paymentData = {
          card_Number: formData.cardNumber,
          expiry_Month: formData.expiryMonth,
          expiry_Year: formData.expiryYear,
          CVV: formData.cvv
        };
        response = await cardPayment(token, paymentData);
      } else {
        const paymentData = {
          email: formData.email,
          password: formData.password
        };
        response = await payPalPayment(token, paymentData);
      }

      if (response.message === 'Done') { 
        console.log(response)
        alert('Payment successful');
      } else {
        setError('Payment failed');
      }
    } catch (error) {
      setError('Error during payment');
    }
  };

  return ( 
    <> 
      <Navbar/>
      <div className="subscription-container">
        <h2 className="subscription-title">Subscription Fees</h2>
        <div className="subscription-form">
          <label className="subscription-method-title">Payment Method</label>
          <div className="subscription-methods">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="creditCard"
                checked={paymentMethod === "creditCard"}
                onChange={() => setPaymentMethod("creditCard")}
              />
              Credit Card
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={() => setPaymentMethod("paypal")}
              />
              PayPal
            </label>
          </div>
          <form onSubmit={handleSubmit}>
            {paymentMethod === "creditCard" ? (
              <div className="payment-fields">
                <p>
                  If you will pay with Credit Card you have to fill out the next
                  fields
                </p>
                <input
                  type="text"
                  placeholder="Card Number"
                  className="input-field"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                />
                <div className="card-expiry-cvc">
                  <input
                    type="text"
                    placeholder="MM*"
                    className="input-field"
                    name="expiryMonth"
                    value={formData.expiryMonth}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    placeholder="YY*"
                    className="input-field"
                    name="expiryYear"
                    value={formData.expiryYear}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    placeholder="CVV*/CVC*"
                    className="input-field"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                  />
                </div>
              </div>
            ) : (
              <div className="payment-fields">
                <p>
                  If you will pay with PayPal you have to fill out the next fields
                </p>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input-field"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input-field"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            )}
            <div className="subscription-buttons">
              <button type="button" className="cancel-button">Cancel</button>
              <button type="submit" className="ok-button">Ok</button>
            </div>
          </form>
          {error && <div className="error-text">{error}</div>}
        </div>
      </div> 
    </>
  );
};

export default Payment;
