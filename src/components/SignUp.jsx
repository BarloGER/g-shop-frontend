import { useState } from "react";
import { registerUser } from "../utils/auth";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";
import "../styles/signUp.css";

// ToDo: Add Input Fields for business customer
// ToDo: Add second personal-data form for alternative address
// ToDo: Refactor
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
      confirm_password,
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
    confirm_password: "",
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
  const [error, setError] = useState({
    email: "",
    password: "",
    confirm_password: "",
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
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    validateInput(e);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (
        !email ||
        !password ||
        password !== confirm_password ||
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

  // Validating the input.
  const validateInput = (e) => {
    let { id, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [id]: "" };

      switch (id) {
        case "email":
          if (!value) {
            stateObj[id] = "Bitte Email angeben.";
          }
          break;

        case "password":
          if (!value) {
            stateObj[id] = "Bitte Passwort angeben.";
          } else if (confirm_password && value !== confirm_password) {
            stateObj["confirm_password"] = "Passwort stimmt nicht überein.";
          } else {
            stateObj["confirm_password"] = confirm_password
              ? ""
              : error.confirm_password;
          }
          break;

        case "confirm_password":
          if (!value) {
            stateObj[id] = "Bitte Passwort wiederholen.";
          } else if (password && value !== password) {
            stateObj[id] = "Passwort stimmt nicht überein.";
          }
          break;

        case "salutation":
          if (!value) {
            stateObj[id] = "Bitte Anrede angeben.";
          }
          break;

        case "firstname":
          if (!value) {
            stateObj[id] = "Bitte Vornamen angeben.";
          }
          break;

        case "lastname":
          if (!value) {
            stateObj[id] = "Bitte Nachidn angeben.";
          }
          break;

        case "birth_date":
          if (!value) {
            stateObj[id] = "Bitte Geburtsdatum angeben.";
          }
          break;

        case "zip_code":
          if (!value) {
            stateObj[id] = "Bitte Postleitzahl angeben.";
          }
          break;

        case "city":
          if (!value) {
            stateObj[id] = "Bitte Stadt angeben.";
          }
          break;

        case "street":
          if (!value) {
            stateObj[id] = "Bitte Straße angeben.";
          }
          break;

        case "street_number":
          if (!value) {
            stateObj[id] = "Bitte Hausnummer angeben.";
          }
          break;

        case "country":
          if (!value) {
            stateObj[id] = "Bitte Land angeben.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  const checkCapsLock = (event) => {
    if (event.getModifierState("CapsLock")) {
      setIsCapsLockOn(true);
    } else {
      setIsCapsLockOn(false);
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
            required
            value={email}
            onBlur={validateInput}
            onChange={handleChange}
          />
          {error.email && <span className="err">{error.email}</span>}
          <input
            id="password"
            type="password"
            placeholder="Passwort"
            required
            value={password}
            onChange={handleChange}
            onBlur={validateInput}
            onKeyUp={checkCapsLock}
          />
          {error.password && <span className="err">{error.password}</span>}
          {isCapsLockOn && (
            <p className="caps-lock-warning">Feststelltaste ist aktiviert!</p>
          )}
          <input
            id="confirm_password"
            type="password"
            placeholder="Passwort wiederholen"
            value={confirm_password}
            onChange={handleChange}
            onBlur={validateInput}
            onKeyUp={checkCapsLock}
          />
          {error.confirm_password && (
            <span className="err">{error.confirm_password}</span>
          )}
          {isCapsLockOn && (
            <p className="caps-lock-warning">Feststelltaste ist aktiviert!</p>
          )}
        </div>

        <div className="personal-data">
          <div className="buisness">
            <h4>Rechnungsadresse</h4>
            <a href="#">Sie sind ein Firmenkunde?</a>
          </div>
          <select
            id="salutation"
            required
            value={salutation}
            onChange={handleChange}
            onBlur={validateInput}
          >
            <option value="">- Bitte Anrede wählen -</option>
            <option value="Frau">Frau</option>
            <option value="Herr">Herr</option>
            <option value="Mensch">Mensch</option>
          </select>
          {error.salutation && <span className="err">{error.salutation}</span>}
          <input
            id="firstname"
            type="text"
            placeholder="Vorname"
            required
            value={firstname}
            onChange={handleChange}
            onBlur={validateInput}
          />
          {error.firstname && <span className="err">{error.firstname}</span>}
          <input
            id="lastname"
            type="text"
            placeholder="Nachname"
            required
            value={lastname}
            onChange={handleChange}
            onBlur={validateInput}
          />
          {error.lastname && <span className="err">{error.lastname}</span>}
          <div className="street">
            <input
              id="street"
              type="text"
              placeholder="Straße"
              className="item2"
              required
              value={street}
              onChange={handleChange}
              onBlur={validateInput}
            />

            <input
              id="street_number"
              type="text"
              placeholder="Nr./ID"
              className="item1"
              required
              value={street_number}
              onChange={handleChange}
              onBlur={validateInput}
            />
          </div>
          {error.street && <span className="err">{error.street}</span>}
          {error.street_number && (
            <span className="err">{error.street_number}</span>
          )}
          <input type="text" placeholder="Adresszusatz/ Postnummer" />
          <div className="town">
            <input
              id="zip_code"
              type="text"
              placeholder="PLZ"
              className="item1"
              required
              value={zip_code}
              onChange={handleChange}
              onBlur={validateInput}
            />

            <input
              id="city"
              type="text"
              placeholder="Stadt"
              required
              value={city}
              onChange={handleChange}
              onBlur={validateInput}
              className="item2"
            />
          </div>
          {error.zip_code && <span className="err">{error.zip_code}</span>}
          {error.city && <span className="err">{error.city}</span>}
          <select
            id="country"
            required
            value={country}
            onChange={handleChange}
            onBlur={validateInput}
          >
            <option value="">- Bitte Land wählen -</option>
            <option value="Deutschland">Deutschland</option>
            <option value="Österreich">Österreich</option>
            <option value="Schweiz">Schweiz</option>
          </select>
          {error.country && <span className="err">{error.country}</span>}
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
            required
            value={birth_date}
            onChange={handleChange}
            onBlur={validateInput}
          />
          {error.birth_date && <span className="err">{error.birth_date}</span>}
        </div>
        <div className="delivery-address">
          <h4>Lieferadresse</h4>
          <label>
            <input
              type="radio"
              id="same-address"
              name="address"
              defaultChecked
            />
            Lieferadresse entspricht Rechnungsadresse
          </label>
          <label>
            <input type="radio" id="other-address" name="address" />
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
