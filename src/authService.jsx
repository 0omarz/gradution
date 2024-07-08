import axios from 'axios';

const API_BASE_URL = 'https://lessa-ochre.vercel.app/';

const authService = {
  signUp: async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}user/signUp`, {
        userName: userData.username,
        email: userData.email,
        mobile: userData.phone,
        password: userData.password,
        confirmPass: userData.confirmPassword
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  signIn: async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}user/signIn`, {
        email: userData.email,
        password: userData.password
      });
      return response.data;
    } catch (error) {
      console.log(error) ; 
      
    }
  }
}; 
export const cardPayment = async (token, paymentData) => {
    try {
      console.log('Making card payment request with data:', paymentData); 
      const userToken  = localStorage.getItem("UserToken"); 
      console.log(userToken)
      const response = await axios
      .patch(`https://lessa-ochre.vercel.app/user/cardPayment`, paymentData, {
        headers: {
          authorization: `secretary__ ${userToken}`,
        },
      })
      return response.data;
    } catch (error) {
      console.error('Error during card payment:', error.response ? error.response.data : error.message);
      throw error;
    }
  };
  
  export const payPalPayment = async (token, paymentData) => {
    try {
        const userToken  = localStorage.getItem("UserToken"); 
        console.log(userToken)
        const response = await axios
        .patch(`https://lessa-ochre.vercel.app/user/payPalPayment`, paymentData, {
          headers: {
            authorization: `secretary__ ${userToken}`,
          },
        })
      return response.data;
    } catch (error) {
      console.error('Error during PayPal payment:', error);
      throw error;
    }
  };

export default authService;
