import { useState } from "react";
import { registerUser } from "../utils/auth";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";
import "../styles/signUp.css";

// ToDo: Add Input Fields for business customer
// ToDo: Add second personal-data form for alternative address
// ? Maybe add "Datenschutz" hint

const SignUp = ({
  isAuthenticated,
  setToken,
  setIsAuthenticated,
  loadingAuthRequest,
  setLoadingAuthRequest,
}) => {
  const [
    {
      email,
      password,
      salutation,
      firstname,
      lastname,
      birth_date,
      zip_code,
      city,
      street,
      street_number,
      country,
      tel,
    },
    setFormState,
  ] = useState({
    email: "",
    password: "",
    salutation: "",
    firstname: "",
    lastname: "",
    birth_date: "",
    zip_code: "",
    city: "",
    street: "",
    street_number: "",
    country: "",
    tel: "",
  });

  const handleChange = (e) =>
    setFormState((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (
        !email ||
        !password ||
        !salutation ||
        !firstname ||
        !lastname ||
        !birth_date ||
        !zip_code ||
        !city ||
        !street ||
        !street_number ||
        !country
      )
        throw new Error("Bitte alles ausfüllen.");
      setLoadingAuthRequest(true);
      const { data, error } = await registerUser({
        email,
        password,
        salutation,
        firstname,
        lastname,
        birth_date,
        zip_code,
        city,
        street,
        street_number,
        country,
      });
      if (error) throw error;
      setToken(data.token);
      setIsAuthenticated(true);
      setLoadingAuthRequest(false);
      localStorage.setItem("token", data.token);
    } catch (error) {
      setLoadingAuthRequest(false);
      console.log(error);
    }
  };

  if (loadingAuthRequest) return <Loading />;
  if (isAuthenticated) return <Navigate to="/auth" />;

  return (
    <section className="sign-up">
      <div className="description">
        <h1>Kundenkonto anlegen</h1>
        <p>
          Mit Ihrem eigenen Kundenkonto geht es schneller durch den
          Bestellvorgang, können Sie abweichende Versandadressen speichern und
          sind immer über Ihren Auftragsstatus informiert. Alle mit einem *
          markierten Felder sind Pflichtfelder.
        </p>
      </div>

      <form className="data" onSubmit={handleSubmit}>
        <div className="login-data">
          <h4>Login-Daten</h4>
          <input
            id="email"
            type="email"
            placeholder="E-Mail Adresse"
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
          {/* <input type="password" placeholder="Passwort wiederholen" /> */}
        </div>

        <div className="personal-data">
          <div className="buisness">
            <h4>Rechnungsadresse</h4>
            <a href="#">Sie sind ein Firmenkunde?</a>
          </div>
          <select id="salutation" value={salutation} onChange={handleChange}>
            <option value="">- Bitte Anrede wählen -</option>
            <option value="Frau">Frau</option>
            <option value="Herr">Herr</option>
            <option value="Mensch">Mensch</option>
          </select>
          <input
            id="firstname"
            type="text"
            placeholder="Vorname"
            value={firstname}
            onChange={handleChange}
          />
          <input
            id="lastname"
            type="text"
            placeholder="Nachname"
            value={lastname}
            onChange={handleChange}
          />
          <div className="street">
            <input
              id="street"
              type="text"
              placeholder="Straße"
              className="item2"
              value={street}
              onChange={handleChange}
            />
            <input
              id="street_number"
              type="text"
              placeholder="Nr./ID"
              className="item1"
              value={street_number}
              onChange={handleChange}
            />
          </div>
          <input type="text" placeholder="Adresszusatz/ Postnummer" />
          <div className="town">
            <input
              id="zip_code"
              type="text"
              placeholder="PLZ"
              className="item1"
              value={zip_code}
              onChange={handleChange}
            />
            <input
              id="city"
              type="text"
              placeholder="Stadt"
              value={city}
              onChange={handleChange}
              className="item2"
            />
          </div>
          <select id="country" value={country} onChange={handleChange}>
            <option value="">- Bitte Land wählen -</option>
            <option value="Deutschland">Deutschland</option>
            <option value="Österreich">Österreich</option>
            <option value="Schweiz">Schweiz</option>
          </select>
          <input
            id="tel"
            type="text"
            placeholder="+49 39 53604246"
            value={tel}
            onChange={handleChange}
          />
          <input
            id="birth_date"
            type="text"
            placeholder="DD.MM.YYYY"
            value={birth_date}
            onChange={handleChange}
          />
        </div>
        <div className="delivery-address">
          <h4>Lieferadresse</h4>
          <label>
            <input type="radio" defaultChecked />
            Lieferadresse entspricht Rechnungsadresse
          </label>
          <label>
            <input type="radio" />
            Abweichende Lieferadresse
          </label>
        </div>
        <button type="submit" className="button">
          Kundenkonto anlegen
        </button>
      </form>
    </section>
  );
};

export default SignUp;
