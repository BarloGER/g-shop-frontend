import "../styles/carousel.css";

export default function Carousel() {
  return (
    <section className="carousel" aria-label="Gallery">
      <ol className="carousel-viewport">
        <li id="carousel-slide1" tabindex="0" className="carousel-slide">
          <div className="carousel-snapper">
            <img
              src="https://www.tacwrk.com/img/96907/96907.jpg?options=rs:fill:1800:864/g:ce/dpr:1"
              alt="Tasmanian Tiger Base Carrier System"
            />
            <div className="content">
              <div className="text">
                <span>Tasmanian Tiger</span>
                <h2>Base Carrier System</h2>
              </div>
            </div>
          </div>
          <a href="#carousel-slide4" className="carousel-prev">
            Go to last slide
          </a>
          <a href="#carousel-slide2" className="carousel-next">
            Go to next slide
          </a>
        </li>

        <li id="carousel-slide2" tabindex="0" className="carousel-slide">
          <div className="carousel-snapper">
            <img
              src="https://www.tacwrk.com/img/98618/98618.jpg?options=rs:fill:1800:864/g:ce/dpr:1"
              alt="Carinthia  4.0 - Der LIG, MIG & HIG Winterjacken-Vergleich"
            />
            <div className="content">
              <div className="text">
                <span>Carinthia</span>
                <div>
                  <h2>Der Lig, Mig & Hig</h2>
                  <h3>Winterjacken Vergleich</h3>
                </div>
              </div>
            </div>
          </div>
          <a href="#carousel-slide1" className="carousel-prev">
            Go to previous slide
          </a>
          <a href="#carousel-slide3" className="carousel-next">
            Go to next slide
          </a>
        </li>

        <li id="carousel-slide3" tabindex="0" className="carousel-slide">
          <div className="carousel-snapper">
            <img
              src="https://www.tacwrk.com/img/92453/92453.jpg?options=rs:fill:1800:864/g:ce/dpr:1"
              alt="Helikon-Tex"
            />
            <div className="content">
              <div className="text">
                <span>Helikon-Tex</span>
                <h2>Journey To Perfection</h2>
              </div>
            </div>
          </div>
          <a href="#carousel-slide2" className="carousel-prev">
            Go to previous slide
          </a>
          <a href="#carousel-slide4" className="carousel-next">
            Go to next slide
          </a>
        </li>

        <li id="carousel-slide4" tabindex="0" className="carousel-slide">
          <div className="carousel-snapper">
            <img
              src="https://www.tacwrk.com/img/98348/98348.jpg?options=rs:fill:1800:864/g:ce/dpr:1"
              alt="TACWRK Winter Essentials"
            />
            <div className="content">
              <div className="text">
                <span>Tacwrk</span>
                <h2>Winter Essentials</h2>
              </div>
            </div>
          </div>
          <a href="#carousel-slide3" className="carousel-prev">
            Go to previous slide
          </a>
          <a href="#carousel-slide1" className="carousel-next">
            Go to first slide
          </a>
        </li>
      </ol>

      <aside className="carousel-navigation">
        <ol className="carousel-navigation-list">
          <li className="carousel-navigation-item">
            <a href="#carousel-slide1" className="carousel-navigation-button">
              Go to slide 1
            </a>
          </li>
          <li className="carousel-navigation-item">
            <a href="#carousel-slide2" className="carousel-navigation-button">
              Go to slide 2
            </a>
          </li>
          <li className="carousel-navigation-item">
            <a href="#carousel-slide3" className="carousel-navigation-button">
              Go to slide 3
            </a>
          </li>
          <li className="carousel-navigation-item">
            <a href="#carousel-slide4" className="carousel-navigation-button">
              Go to slide 4
            </a>
          </li>
        </ol>
      </aside>
    </section>
  );
}
