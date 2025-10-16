import "./home.scss";
import Slider from "../../components/Slider/Slider";
import FeatureProduct from "../../components/FeatureProducts/FeatureProduct";
import Categories from "../../components/Categories/Categories";
import Contact from "../../components/Contact/Contact";

function Home() {
  return (
    <div className="home">
      <Slider />
      <FeatureProduct type="featured" />
      <Categories />
      <FeatureProduct type="trending" />
      <Contact />
    </div>
  );
}

export default Home;
