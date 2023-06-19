import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { url } from "../slices/Api";

const PayButton = ({ cartItems }) => {
const user = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleCheckout = () => {
    const formData = new FormData();
    formData.append("name", cartItems);
    try {
      axios
        .post(`${url}/stripe/create-checkout-session`, {
          cartItems,
          userId: user._id
        })
        .then((response) => {
          if (response.data.url) {
            console.log(response.data.url);
            // ye humy check out page pr le jye ga
          window.location.href = response.data.url;
          }
        })
        .catch((err) => console.log(err.message));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <button className="btn btn-primary" onClick={() => handleCheckout()}>
        Checkout
      </button>

 
    </>
  );
};

export default PayButton;
