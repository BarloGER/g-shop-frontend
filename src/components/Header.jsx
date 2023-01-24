import { useState } from "react";
import {
  FaSearch,
  FaShoppingBasket,
  FaAngleDown,
  FaAngleUp,
  FaTimes,
} from "react-icons/fa";
import Login from "./Login";
import NavBar from "./NavBar";
import "../styles/header.css";

const Header = () => {
  const [isAccExpanded, setIsAccExpanded] = useState(false);
  const [isAccClicked, setIsAccClicked] = useState(false);
  const [isSearchBarExpanded, setIsSearchBarExpanded] = useState(false);

  return (
    <>
      {isAccClicked ? (
        <Login changeStatus={(isAccClicked) => setIsAccClicked(isAccClicked)} />
      ) : (
        console.log()
      )}
      <div className="top">
        <a
          href="#"
          className={
            !isSearchBarExpanded
              ? "icon search-icon"
              : "icon search-icon-expanded"
          }
          onClick={() => {
            setIsSearchBarExpanded(!isSearchBarExpanded);
          }}
        >
          <FaSearch size="2.5rem" />
        </a>
        <div
          className={
            !isSearchBarExpanded ? "search-bar" : "search-bar-expanded"
          }
        >
          <form>
            <input type="text" placeholder="Suchbegriff eingeben..." />
          </form>
          <a href="#">
            <FaTimes
              size="2.5rem"
              className="cross-icon"
              onClick={() => {
                setIsSearchBarExpanded(!isSearchBarExpanded);
              }}
            />
          </a>
        </div>

        <ul>
          <li>
            <a href="#">De</a>
          </li>
          <li>
            <a href="#">En</a>
          </li>
          <li className={isAccExpanded ? "acc" : "acc-expanded"}>
            <a
              href="#"
              onClick={() => {
                setIsAccExpanded(!isAccExpanded);
              }}
            >
              Konto
              {!isAccExpanded ? (
                <FaAngleDown className="arrow-icon" />
              ) : (
                <FaAngleUp className="arrow-icon" />
              )}
            </a>
            <div className={!isAccExpanded ? "acc-div" : "acc-div-expanded"}>
              <a href="#">Merkzettel (0)</a>
              <button
                onClick={() => {
                  setIsAccClicked(true);
                  setIsAccExpanded(false);
                }}
              >
                Anmelden
              </button>
            </div>
          </li>
          <li>
            <a href="#" className="icon basket-icon" data-count="0">
              <FaShoppingBasket size="2rem" />
            </a>
          </li>
        </ul>
      </div>

      <nav>
        <NavBar />
      </nav>
    </>
  );
};

export default Header;
