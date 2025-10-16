import Card from "../Card/Card";
import "./featureProduct.scss";
import useFetch from "../Hooks/useFetch";

function FeatureProduct({ type }) {
  const { data, loading, error } = useFetch(
    `products?populate=*&[filters][type][$eq]=${type}`
  );
  return (
    <div className="featureProducts">
      <div className="top">
        <h1>{type} products</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa illum
          tempore sed amet autem quam rem suscipit.
        </p>
      </div>
      <div className="bottom">
        {error && <p>Something Went Wrong !</p>}
        {loading
          ? "loading"
          : data?.map((item) => <Card item={item} key={item.id} />)}
      </div>
    </div>
  );
}

export default FeatureProduct;
