import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import "../styles/login.css";

export default function Login(props) {
  return (
    <section className="background">
      <div className="login-form">
        <a href="#" className="cross">
          <FaTimes
            className="cross-icon"
            size="2rem"
            onClick={() => props.changeStatus(false)}
          />
        </a>
        <div className="new-customer">
          <h3>Neues Kundenkonto erstellen</h3>
          <p>
            Mit Ihrem eigenen Kundenkonto geht es schneller durch den
            Bestellvorgang, können Sie abweichende Versandadressen speichern und
            sind immer über Ihren Auftragsstatus informiert.
          </p>
          <Link to="/SignUp" className="button">
            Kundenkonto anlegen
          </Link>
        </div>
        <div className="login-box">
          <h3>Einloggen</h3>
          <form>
            <div className="input-wrapper">
              <input type="text" placeholder="E-Mail" />
              <input type="password" placeholder="Passwort" />
            </div>
            <div className="button-wrapper">
              <input type="submit" className="button" value="ANMELDEN" />
              <a href="#" className="button forgotten">
                Passwort vergessen?
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
