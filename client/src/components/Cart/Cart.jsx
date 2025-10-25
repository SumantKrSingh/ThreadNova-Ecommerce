import "./cart.scss";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, resetCart } from "../../redux/cartReducer";
import { stripeRequest } from "../../stripeRequest";
import { getImageUrl } from "../Utils/imageHelper";

function Cart() {
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => (total += item.quantity * item.price));
    return total.toFixed(2);
  };

  async function handlePayment() {
    try {
      const res = await stripeRequest.post("/orders", {
        products,
      });
      window.location.href = res.data.stripeSession.url;
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="cart">
      <h1>Products In Your Cart</h1>

      <div className="cartItems">
        {products?.map((item) => (
          <div className="item" key={item.id}>
            <img src={getImageUrl(item.img)} alt={item.title} />
            <div className="details">
              <h1>{item.title}</h1>
              <p>
                {item.desc?.length > 50
                  ? item.desc.substring(0, 50) + "..."
                  : item.desc}
              </p>
              <div className="price">
                {item.quantity} x ₹{item.price}
              </div>
            </div>
            <DeleteOutlineIcon
              className="delete"
              onClick={() => dispatch(removeItem(item.id))}
            />
          </div>
        ))}
      </div>

      <div className="cartFooter">
        <div className="total">
          <span>Sub Total</span>
          <span>₹{totalPrice()}</span>
        </div>
        <button onClick={handlePayment}>Proceed To Checkout</button>
        <span className="reset" onClick={() => dispatch(resetCart())}>
          Reset Cart
        </span>
      </div>
    </div>
  );
}

export default Cart;
