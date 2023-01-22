import { FaSearch, FaShoppingBasket, FaAngleDown } from "react-icons/fa";
import "../styles/home.css";

// ToDo: Install Browser Router and change a to LINK

export default function Home() {
  return (
    <>
      <header>
        <div className="top">
          <a href="/" className="icon search-icon">
            <FaSearch size="2.5rem" />
          </a>

          <ul>
            <li>
              <a href="/">De</a>
            </li>
            <li>
              <a href="/">En</a>
            </li>
            <li>
              <a href="/">
                Konto
                <FaAngleDown className="arrow-icon" />
              </a>
            </li>
            <li>
              <a href="/" className="icon basket-icon" data-count="0">
                <FaShoppingBasket size="2rem" />
              </a>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
