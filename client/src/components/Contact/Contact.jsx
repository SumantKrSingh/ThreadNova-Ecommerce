import "./contact.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import XIcon from "@mui/icons-material/X";
function Contact() {
  return (
    <div className="contact">
      <div className="wrapper">
        <span>BE IN TOUCH WITH US:</span>
        <div className="mail">
          <input type="email" placeholder="enter your e-mail" />
          <button>Join Us</button>
        </div>
        <div className="icons">
          <FacebookIcon fontSize="large" />
          <InstagramIcon fontSize="large" />
          <PinterestIcon fontSize="large" />
          <WhatsAppIcon fontSize="large" />
          <XIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
}

export default Contact;
