import "./categories.scss";
import { Link } from "react-router-dom";
function Categories() {
  return (
    <div className="categories">
      <div className="cols">
        <div className="row">
          <img src="/images/categ1.jpg" alt="categ1" />
          <button>
            <Link to="./products/1" className="Sale">
              Sale
            </Link>
          </button>
        </div>
        <div className="row">
          <img src="/images/categ2.jpg" alt="categ2" />
          <button>
            <Link to="./products/1" className="sale">
              Sale
            </Link>
          </button>
        </div>
      </div>
      <div className="cols">
        <div className="row">
          <img src="/images/categ3.jpg" alt="categ3" />
          <button>
            <Link to="./products/1" className="sale">
              Sale
            </Link>
          </button>
        </div>
      </div>
      <div className="cols cols-large">
        <div className="row">
          <div className="cols">
            <div className="row">
              <img src="/images/categ4.jpg" alt="categ4" />
              <button>
                <Link to="./products/1" className="sale">
                  Sale
                </Link>
              </button>
            </div>
          </div>
          <div className="cols">
            <div className="row">
              <img src="/images/categ5.jpg" alt="categ5" />
              <button>
                <Link to="./products/1" className="sale">
                  Sale
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <img src="/images/categ6.jpg" alt="" />
          <button>
            <Link to="./products/1" className="sale">
              Sale
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Categories;
