import { useState } from "react";
import Carousel from "./Carousel";
import {
  FaSearch,
  FaShoppingBasket,
  FaAngleDown,
  FaAngleUp,
  FaTimes,
} from "react-icons/fa";
import "../styles/home.css";

// ToDo: Install Browser Router and change a to LINK
// ToDo: Move Searchbar to own component

export default function Home() {
  const [isAccExpanded, setIsAccExpanded] = useState(false);
  const [isSearchBarExpanded, setIsSearchBarExpanded] = useState(false);

  return (
    <>
      <header>
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
                <button>Anmelden</button>
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
          <div className="placeholder-for-navbar">
            <h1>Placeholder</h1>
          </div>
        </nav>
      </header>

      <main>
        {/* <div className="carousel">
          <img
            src="https://www.tacwrk.com/img/96907/96907.jpg?options=rs:fill:1800:864/g:ce/dpr:1"
            alt="Tasmanian Tiger Base Carrier System"
          />
          <div className="content">
            <span>Tasmanian Tiger</span>
            <h2>Base Carrier System</h2>
          </div>
        </div> */}

        <Carousel />
      </main>
    </>
  );
}
