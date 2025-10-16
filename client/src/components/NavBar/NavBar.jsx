import "./navbar.scss";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SunnyIcon from "@mui/icons-material/Sunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Cart from "../Cart/Cart";
import { useSelector } from "react-redux";

function NavBar() {
  const [open, setOpen] = useState(false);
  const products = useSelector((state) => state.cart.products);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    }
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  function menuToggle() {
    setMenuOpen(!menuOpen);
  }

  function menuClose() {
    setMenuOpen(false);
  }
  return (
    <div className="navbar">
      <div className="wrapper">
        {/* Menu icon for mobile */}
        <div className="hamburger" onClick={menuToggle}>
          {menuOpen ? (
            <CloseIcon fontSize="large" />
          ) : (
            <MenuIcon fontSize="large" />
          )}
        </div>

        {/* Left section */}
        <div className="left">
          <div className="item">
            <img src="/images/indianFlag.png" alt="" />
            <KeyboardArrowDownIcon />
          </div>

          <div className="item">
            <span>Rupees</span>
            <KeyboardArrowDownIcon />
          </div>

          <div className="item">
            <Link to="/products/1?gender=Women Category">Women</Link>
            <KeyboardArrowDownIcon />
          </div>
          <div className="item">
            <Link to="/products/2?gender=Men Category">Men</Link>
            <KeyboardArrowDownIcon />
          </div>
          <div className="item">
            <div
              className={`theme-icon ${
                theme === "dark" ? "theme-icon-switch" : ""
              }`}
              onClick={toggleTheme}
            >
              {theme === "dark" ? (
                <SunnyIcon fontSize="large" />
              ) : (
                <DarkModeIcon fontSize="large" />
              )}
            </div>
          </div>
        </div>
        {/* Center section */}
        <div className="center">
          <img src="/images/logo.png" alt="brand_logo" />
          <Link to="./">Thread~Nova</Link>
        </div>

        {/* Right section */}
        <div className="right">
          <li>
            <Link to="./">Home</Link>
          </li>
          <li>
            <Link to="./">About</Link>
          </li>
          <li>
            <Link to="./">Contact</Link>
          </li>
          <li>
            <Link to="./">Stores</Link>
          </li>

          <div className="icons">
            <SearchIcon fontSize="large" />
            <PersonIcon fontSize="large" />
            <FavoriteBorderIcon fontSize="large" />

            <div className="cartIcon" onClick={() => setOpen(!open)}>
              <ShoppingCartOutlinedIcon fontSize="large" />
              <span>{products.length}</span>
            </div>
          </div>
        </div>

        {/* Mobile Cart Icon */}
        <div className="mobile-cart-icon" onClick={() => setOpen(!open)}>
          <ShoppingCartOutlinedIcon fontSize="large" />
          <span>{products.length}</span>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && <div className="overlay" onClick={menuClose}></div>}

      {/* Mobile sidebar menu */}
      <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
        <div className="mobile-menu-content">
          <div className="mobile-nav-links">
            <Link to="./" onClick={menuClose}>
              Home
            </Link>
            <Link to="./" onClick={menuClose}>
              About
            </Link>
            <Link to="./" onClick={menuClose}>
              Contact
            </Link>
            <Link to="./" onClick={menuClose}>
              Stores
            </Link>
          </div>

          <div className="mobile-categories">
            <h3>Categories</h3>
            <Link to="/products/1?gender=Women Category" onClick={menuClose}>
              Women
            </Link>
            <Link to="/products/2?gender=Men Category" onClick={menuClose}>
              Men
            </Link>
          </div>

          <div className="mobile-icons">
            <div className="mobile-icon-item">
              <SearchIcon fontSize="large" />
              <span>Search</span>
            </div>
            <div className="mobile-icon-item">
              <PersonIcon fontSize="large" />
              <span>Account</span>
            </div>
            <div className="mobile-icon-item">
              <FavoriteBorderIcon fontSize="large" />
              <span>Wishlist</span>
            </div>
          </div>

          {/* DarkMode and LightMode */}
          <div className="mobile-settings">
            <div className="mobile-setting-item">
              <img src="/images/indianFlag.png" alt="flag" />
              <span>India</span>
            </div>

            <div className="mobile-setting-item" onClick={toggleTheme}>
              {theme === "dark" ? (
                <SunnyIcon fontSize="large" />
              ) : (
                <DarkModeIcon fontSize="large" />
              )}

              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </div>
          </div>
        </div>
      </div>
      {open && <Cart />}
    </div>
  );
}

export default NavBar;
