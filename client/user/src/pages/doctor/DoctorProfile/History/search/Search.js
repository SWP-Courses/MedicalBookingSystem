import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faMagnifyingGlass,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react/headless";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { hanlderRequest } from "~/utils";
import  PopperWrapper  from '~/components/popper/Wrapper'
import AccountItem from "~/components/user/AccountItem/AccountItem";
import API_URL from "~/api/Router";
import useDebounce from "~/hooks/useDebounce";
// import "./Search.scss";

function Search(props) {
  const [showResult, setShowResult] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRef = useRef();
  const debounced = useDebounce(searchValue, 600);

  useEffect(() => {
    const searchUsers = async () => {
      if (debounced.trim()) {
        setLoading(true);
        const [error, res] = await hanlderRequest(axios.get(API_URL + `/users/booked-service-done?name=${encodeURIComponent(debounced)}`));
        if(res?.data) {
          setSearchResult(res.data);  
          setLoading(false);
        }else {
          setLoading(false);
          console.log(error.message);
        }
      }else {
        setSearchResult([]);
      }
    }
    searchUsers();
  }, [debounced]);

  const hanldeClearInput = () => {
    setSearchValue("");
    setSearchResult([]);
    inputRef.current.focus();
  };

  const hanldeSelectUser = (result) => {
    props.setUserSearched(result);
    setShowResult(false)
  }

  return (
    <div className="header">
      <Tippy
        visible={showResult && searchResult.length > 0}
        render={(attrs) => (
          <div className="box" tabIndex="-1" {...attrs}>
            <PopperWrapper>
              {searchResult.map((result) => {
                return <AccountItem key={result._id} data={result} getUser={hanldeSelectUser}/>;
              })}
            </PopperWrapper>
          </div>
        )}
        onClickOutside={() => setShowResult(false)}
        interactive
        placement="bottom-start"
      >
        <div className="search">
          <input
            type="text"
            placeholder="Tìm bệnh nhân"
            style={{ lineHeight: "30px" }}
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            onFocus={() => setShowResult(true)}
            ref={inputRef}
          />
          {searchValue && !loading && (
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="circle-xmark"
              onClick={hanldeClearInput}
            />
          )}
          {loading && (
            <FontAwesomeIcon icon={faSpinner} className="fa-spinner-third" />
          )}
          <div className="separate-line"></div>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="fa-magnifying-glass"
          />
        </div>
      </Tippy>
    </div>
  );
}

export default Search;
