import "./sidebar.css";
import { useState, useEffect } from "react";
import axios from "axios";
import aboutimg from "../../asset/img/about.png";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("https://my-blogging-website.onrender.com/api/categories");
      setCats(res.data);
    };
    getCats();
  }, []);

  return (
    <div className="sideBar">
      <div className="sideBarItem">
        <span className="sideBarTitle">ABOUT ME</span>
        <img className="sideBarImg" src={aboutimg} alt="" />
        <p>
          Lorem ipsum dolor sit amet consect adipisicing elit. Recusandae,
          modiew. Consequatur ad quod illo ipsam rerum voluptatum.
        </p>
      </div>
      <div className="sideBarItem">
        <span className="sideBarTitle">CATEGORIES</span>
        <ul className="sideBarList">
          {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link">
              <li className="sideBarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sideBarItem">
        <span className="sideBarTitle">FOLLOW US</span>
        <div className="sideBarSocial">
          <i className="sideBarIcon fa-brands fa-square-facebook"></i>
          <i className="sideBarIcon fa-brands fa-square-twitter"></i>
          <i className="sideBarIcon fa-brands fa-square-pinterest"></i>
          <i className="sideBarIcon fa-brands fa-square-instagram"></i>
        </div>
      </div>
    </div>
  );
}
