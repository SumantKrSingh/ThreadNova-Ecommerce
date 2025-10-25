import "./card.scss";
import { Link } from "react-router-dom";
import { getImageUrl } from "../Utils/imageHelper";
function Card({ item }) {
  return (
    <>
      <Link to={`/product/${item.id}`}>
        <div className="card">
          <div className="images">
            {item?.isNew && <span>New Season</span>}
            <img
              src={getImageUrl(item.img2?.url)}
              alt="img"
              className="mainImg"
            />
            <img
              src={getImageUrl(item.img?.url)}
              alt=""
              className="secondImg"
            />
          </div>
          <h2>{item?.title}</h2>
        </div>
        <div className="prices">
          <h3>₹{item.oldPrice || item?.price + 150}</h3>
          <h3>₹{item?.price}</h3>
        </div>
      </Link>
    </>
  );
}

export default Card;
