// Import necessary dependencies
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaShoppingBasket,
  FaAngleDown,
  FaAngleUp,
  FaTimes,
} from "react-icons/fa";

// Import used components and styles
import SignIn from "./SignIn";
import NavBar from "./NavBar";
import "../styles/header.css";

// This component is the header of the website. It contains the search bar, the language selection, the account section and the navigation bar.

const Header = ({
  isAuthenticated,
  setToken,
  loadingAuthRequest,
  setLoadingAuthRequest,
  logOut,
}) => {
  const [isAccExpanded, setIsAccExpanded] = useState(false);
  const [isAccClicked, setIsAccClicked] = useState(false);
  const [isSearchBarExpanded, setIsSearchBarExpanded] = useState(false);

  return (
    <>
      {isAccClicked ? (
        <SignIn
          setIsAccClicked={setIsAccClicked}
          setToken={setToken}
          loadingAuthRequest={loadingAuthRequest}
          setLoadingAuthRequest={setLoadingAuthRequest}
        />
      ) : (
        console.log()
      )}
      <div className="top">
        <Link
          to="#"
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
        </Link>
        <div
          className={
            !isSearchBarExpanded ? "search-bar" : "search-bar-expanded"
          }
        >
          <form>
            <input type="text" placeholder="Suchbegriff eingeben..." />
          </form>
          <Link to="#">
            <FaTimes
              size="2.5rem"
              className="cross-icon"
              onClick={() => {
                setIsSearchBarExpanded(!isSearchBarExpanded);
              }}
            />
          </Link>
        </div>

        <ul>
          <li>
            <Link to="#">De</Link>
          </li>
          <li>
            <Link to="#">En</Link>
          </li>
          <li className={isAccExpanded ? "acc" : "acc-expanded"}>
            <Link
              to="#"
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
            </Link>
            <div className={!isAccExpanded ? "acc-div" : "acc-div-expanded"}>
              <Link to="#">Merkzettel (0)</Link>
              {!isAuthenticated ? (
                <button
                  onClick={() => {
                    setIsAccClicked(true);
                    setIsAccExpanded(false);
                  }}
                >
                  Anmelden
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setIsAccClicked(false);
                      setIsAccExpanded(false);
                    }}
                  >
                    <Link to="/auth">Mein Konto</Link>
                  </button>
                  <button
                    onClick={() => {
                      logOut();
                      setIsAccExpanded(false);
                    }}
                  >
                    <Link to="/">Ausloggen</Link>
                  </button>
                </>
              )}
            </div>
          </li>
          <li>
            <Link to="#" className="icon basket-icon" data-count="0">
              <FaShoppingBasket size="2rem" />
            </Link>
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
