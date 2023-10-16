import React, { useEffect } from "react";
import "./NavigationCss/navigation.css";
import CartIcon from "../Cart/CartIcon";
import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";

const Navigation = () => {
  const navigate = useNavigate();
  const searchText = useRef();
  const searchTextOne = useRef();
  const { que } = useParams();

  const onEnterKeyPress = (event)=>{
    if(event.key == "Enter"){
      if(searchText.current.value == "")return;
      onSearchBtnClick()
    }
  }
  const onEnterKeyPressOne = (event)=>{
    if(event.key == "Enter"){
      if(searchTextOne.current.value == "")return;
      onSearchBtnClickOne()
    }
  }

  const onSearchBtnClick = () => {
    if (searchText.current.value) {
      navigate(`/search/${searchText.current.value}`, {
        state: { param: searchText.current.value },
      });
    } else {
      navigate("/search/q");
    }
  };
  const onSearchBtnClickOne = () => {
    if (searchTextOne.current.value) {
      navigate(`/search/${searchTextOne.current.value}`, {
        state: { param: searchTextOne.current.value },
      });
    } else {
      navigate("/search/q");
    }
  };



  return (
    <div className="nav">
      <div className="logo">
        <p className="logo__yodan" onClick={() => navigate("/")}>
          Yodan {!que &&<span className="logo__yodan_cosmotics">Cosmotics</span>}
        </p>
      </div>
      <div className="nav__sec__cont">
        <div className="nav__rigthside__mobile">
          {que &&    <input
              type="search"
              name=""
              ref={searchTextOne}
              placeholder="Search..."
              onKeyPress={onEnterKeyPressOne}
              className="nav__search__input aaa"
              id=""
            /> }
          <div className="nav__search__icon" onClick={onSearchBtnClick}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 21L16.65 16.65"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11 8V14"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 11H14"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="nav__menu__icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 6H21"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 12H21"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 18H21"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="nav__rightside">
          <div className="nav__search">
            <input
              type="search"
              name=""
              ref={searchText}
              onKeyPress={onEnterKeyPress}

              placeholder="Search..."
              className="nav__search__input onealsdkj"
              id=""
            />

            <div className="nav__search__icon" onClick={onSearchBtnClick}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 21L16.65 16.65"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 8V14"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 11H14"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
        <CartIcon />
      </div>
    </div>
  );
};

export default Navigation;
