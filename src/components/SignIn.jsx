import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../utils/auth";
import { FaTimes } from "react-icons/fa";
import Loading from "./Loading";
import "../styles/login.css";

const SignIn = ({
  setIsAccClicked,
  setToken,
  loadingAuthRequest,
  setLoadingAuthRequest,
}) => {
  const [{ email, password }, setFormState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormState((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!email || !password)
        throw new Error("Email und Passwort sind erforderlich.");
      setLoadingAuthRequest(true);
      const { data, error } = await loginUser({ email, password });
      if (error) throw error;
      setToken(data.token);
      setLoadingAuthRequest(false);
      localStorage.setItem("token", data.token);
      setIsAccClicked(false);
    } catch (error) {
      setLoadingAuthRequest(false);
      console.log(error);
    }
  };

  if (loadingAuthRequest) return <Loading />;

  return (
    <section className="background">
      <div className="login-form">
        <a href="#" className="cross">
          <FaTimes
            className="cross-icon"
            size="2rem"
            onClick={() => setIsAccClicked(false)}
          />
        </a>
        <div className="new-customer">
          <h3>Neues Kundenkonto erstellen</h3>
          <p>
            Mit Ihrem eigenen Kundenkonto geht es schneller durch den
            Bestellvorgang, können Sie abweichende Versandadressen speichern und
            sind immer über Ihren Auftragsstatus informiert.
          </p>
          <Link
            to="/signup"
            className="button"
            onClick={() => setIsAccClicked(false)}
          >
            Kundenkonto anlegen
          </Link>
        </div>
        <div className="login-box">
          <h3>Einloggen</h3>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <input
                id="email"
                type="email"
                placeholder="E-Mail"
                value={email}
                onChange={handleChange}
              />
              <input
                id="password"
                type="password"
                placeholder="Passwort"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className="button-wrapper">
              <button className="button" type="submit">
                Anmelden
              </button>
              <a href="#" className="button forgotten">
                Passwort vergessen?
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
