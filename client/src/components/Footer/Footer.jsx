import "./footer.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="top">
        <div className="item">
          <h1>Categories</h1>
          <span>Men</span>
          <span>Women</span>
          <span>Shoes</span>
          <span>Accessories</span>
          <span>New Arrivals</span>
        </div>

        <div className="item">
          <h1>Links</h1>
          <span>FAQ</span>
          <span>Pages</span>
          <span>Stores</span>
          <span>Compares</span>
          <span>Cookies</span>
        </div>

        <div className="item">
          <h1>About</h1>
          <span>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae
            quam porro iusto, quas eos consequatur!
          </span>
        </div>

        <div className="item">
          <h1>Contact</h1>
          <span>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae
            quam porro iusto, quas eos consequatur!
          </span>
        </div>
      </div>
      <div className="bottom">
        <div className="left">
          <div className="brand">
            <img src="/images/logo.png" alt="brand_logo" />
          </div>
          <span className="logo">Thread~Nova</span>
          <span className="copyright">
            © Copyright 2025. All Rights Reserved
          </span>
        </div>
        <div className="right">
          <img src="/images/payments.png" alt="payment-banner" />
        </div>
      </div>
    </div>
  );
}

export default Footer;
