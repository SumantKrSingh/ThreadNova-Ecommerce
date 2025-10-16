import "./products.scss";
import { useParams } from "react-router-dom";
import List from "../../components/List/List";
import { useState } from "react";
import useFetch from "../../components/Hooks/useFetch";

function Products() {
  const catId = parseInt(useParams().id);
  const [maxPrice, setMaxPrice] = useState(8000);
  const [sort, setSort] = useState(null);
  const [selectedSubCats, setSelectedSubCats] = useState([]);
  const [genderFilter, setGenderFilter] = useState("all"); // all, Men, Women

  const { data, loading, error } = useFetch(
    `/sub-categories?populate=categories`
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading product</div>;

  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    setSelectedSubCats(
      isChecked
        ? [...selectedSubCats, value]
        : selectedSubCats.filter((item) => item !== value)
    );
  };

  console.log(selectedSubCats);

  return (
    <div className="products">
      <div className="left">
        {/* Gender Filter Section */}
        <div className="filterItem">
          <h2>Gender</h2>
          <div className="inputItem">
            <input
              type="radio"
              name="gender"
              id="all"
              value="all"
              checked={genderFilter === "all"}
              onChange={(e) => setGenderFilter(e.target.value)}
            />
            <label htmlFor="all">All</label>
          </div>
          <div className="inputItem">
            <input
              type="radio"
              name="gender"
              id="men"
              value="Men Category"
              checked={genderFilter === "Men Category"}
              onChange={(e) => setGenderFilter(e.target.value)}
            />
            <label htmlFor="men">Men</label>
          </div>
          <div className="inputItem">
            <input
              type="radio"
              name="gender"
              id="women"
              value="Women Category"
              checked={genderFilter === "Women Category"}
              onChange={(e) => setGenderFilter(e.target.value)}
            />
            <label htmlFor="women">Women</label>
          </div>
        </div>

        <div className="filterItem">
          <h2>Product Categories</h2>

          {data?.map((item) => (
            <div className="inputItem" key={item.id}>
              <input
                type="checkbox"
                id={`item-${item.id}`}
                value={item.id}
                onChange={handleChange}
              />
              <label htmlFor={`item-${item.id}`}>{item.title}</label>
            </div>
          ))}
        </div>
        <div className="filterItem">
          <h2>Filter By Price</h2>
          <div className="inputItem">
            <span>{maxPrice}</span>
            <input
              type="range"
              min={0}
              max={10000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="filterItem">
          <h2>Sort By</h2>
          <div className="inputItem">
            <input
              type="radio"
              name="price"
              id="asc"
              value="asc"
              onChange={() => setSort("asc")}
            />
            <label htmlFor="asc">Price (Lowest First)</label>
          </div>

          <div className="inputItem">
            <input
              type="radio"
              name="price"
              id="desc"
              value="desc"
              onChange={() => setSort("desc")}
            />
            <label htmlFor="desc">Price (Highest First)</label>
          </div>
        </div>
      </div>

      <div className="right">
        <img
          className="catImg"
          src="/images/category.jpeg"
          alt="category-img"
        />

        <List
          catId={catId}
          maxPrice={maxPrice}
          sort={sort}
          subCat={selectedSubCats}
          gender={genderFilter}
        />
      </div>
    </div>
  );
}

export default Products;
