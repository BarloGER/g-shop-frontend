import Header from "./Header";
import Carousel from "./Carousel";
import "../styles/home.css";

export default function Home() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Carousel />
      </main>
    </>
  );
}
