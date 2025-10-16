import "./list.scss";
import Card from "../Card/Card";
import useFetch from "../Hooks/useFetch";

function List({ subCat, maxPrice, sort, gender }) {
  const buildQuery = () => {
    let query = `/products?populate=*`;

    if (gender && gender !== "all") {
      query += `&filters[categories][title][$eq]=${gender}`;
    }

    if (subCat && subCat.length > 0) {
      subCat.forEach((item, index) => {
        query += `&filters[sub_categories][id][$in][${index}]=${item}`;
      });
    }

    // price filter
    if (maxPrice) {
      query += `&filters[price][$lte]=${maxPrice}`;
    }

    // sort filter
    if (sort) {
      query += `&sort=price:${sort}`;
    }

    return query;
  };

  const { data, loading, error } = useFetch(buildQuery());

  if (error) {
    console.error("API Error:", error);
    return <div>Error loading products</div>;
  }

  return (
    <div className="list">
      {loading ? (
        "Loading..."
      ) : data && data.length > 0 ? (
        data.map((item) => <Card item={item} key={item.id} />)
      ) : (
        <div>No products found</div>
      )}
    </div>
  );
}

export default List;
