import {
  faFacebookF,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import API_URL from "~/api/Router";
import "./options.scss";

export default function Options() {
  const [specialists, setSpecialists] = useState([]);

  useEffect(() => {
    fetchSpecialists();
  }, []);

  const fetchSpecialists = () => {
    const fetchData = async () => {
      try {
        const res = await axios.get(API_URL+"/specialists");
        setSpecialists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  };
  
  return (
    <div className="topbarOptions">
      <div className="optionItem-wrapper container-xl">
        <div className="optionItem col-sm-2.5">
          <Link to="/intro">Giới thiệu</Link>
        </div>
        <div className="optionItem col-sm-2.5">
          <Link to="/doctors">Danh sách bác sĩ</Link>
        </div>
        <div className="optionItem col-sm-2.5">
          <Link to="/blogs">
            <span>Bài viết - Tin Tức</span>
          </Link>
        </div>
        <div className="optionItem">
          <span>
            <FontAwesomeIcon className="social-icon" icon={faFacebookF} />
          </span>
          <span>
            <FontAwesomeIcon className="social-icon youtube" icon={faYoutube} />
          </span>
        </div>
      </div>
    </div>
  );
}
