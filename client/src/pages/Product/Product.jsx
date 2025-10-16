import "./product.scss";
import { useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CompareSharpIcon from "@mui/icons-material/CompareSharp";
import { useParams } from "react-router-dom";
import useFetch from "../../components/Hooks/useFetch";
import { UPLOAD_URL } from "../../config";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";

function Product() {
  const id = useParams().id;
  const [selectedImage, setSelectedImage] = useState("img");
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { data, loading, error } = useFetch(
    `/products?filters[id][$eq]=${id}&populate=*`
  );

  const product = Array.isArray(data) && data.length > 0 ? data[0] : null;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading product</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product">
      <div className="left">
        <div className="images">
          {product?.img?.url && (
            <img
              src={UPLOAD_URL + product.img.url}
              alt="Thumbnail 1"
              onClick={() => setSelectedImage("img")}
            />
          )}
          {product?.img2?.url && (
            <img
              src={UPLOAD_URL + product.img2.url}
              alt="Thumbnail 2"
              onClick={() => setSelectedImage("img2")}
            />
          )}
        </div>
        <div className="mainImage">
          <img
            src={UPLOAD_URL + product[selectedImage]?.url}
            alt="Main product"
          />
        </div>
      </div>

      <div className="right">
        <h1>{product.title || "Title"}</h1>
        <span className="price">₹{product.price || "1,600"}</span>
        <p>
          {product.desc ||
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae ullam quidem mollitia, voluptate ipsum suscipit sed hic consequuntur vel eveniet!"}
        </p>

        <div className="quantity">
          <button onClick={() => setQuantity((p) => (p === 1 ? 1 : p - 1))}>
            -
          </button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity((p) => p + 1)}>+</button>
        </div>

        <button
          className="add"
          onClick={() =>
            dispatch(
              addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                desc: product.desc,
                img: product.img.url,
                quantity: quantity,
              })
            )
          }
        >
          <AddShoppingCartIcon />
          Add To Cart
        </button>

        <div className="links">
          <div className="items">
            <FavoriteBorderIcon fontSize="large" />
            Add To Wishlist
          </div>
          <div className="items">
            <CompareSharpIcon fontSize="large" />
            Add To Compare
          </div>
        </div>

        <div className="info">
          <span>Vender: Thread~Nova</span>
          <span>Product Type: {product.type || "Suit"}</span>
          <span>Fabric: Cotton</span>
        </div>
        <hr />
        <div className="info">
          <span>Description</span>
          <hr />
          <span>Additional Info</span>
          <hr />
          <span>FAQ</span>
        </div>
      </div>
    </div>
  );
}

export default Product;
