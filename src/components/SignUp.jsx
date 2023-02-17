import { useState, useRef } from "react";
import { registerUser } from "../utils/auth";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";
import { handleBackendErrors } from "../utils/handleBackendErrors";
import { validateInput } from "../utils/validateInput";
import useCapsLockCheck from "../utils/checkCapsLock";
import "../styles/signUp.css";

// ToDo: Add Input Fields for business customer
// ToDo: Add second personal-data form for alternative address
// ToDo: Refactor
// ToDo: Fix error scroll useRef
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
  const errorRef = useRef();
  const [isCapsLockOn, checkCapsLock] = useCapsLockCheck();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState((prev) => ({ ...prev, [id]: value }));
    setError(validateInput(id, value, confirm_password, password, error));
  };

  // Submit the form
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Checking for missing values
      const errors = {};
      if (!email) {
        errors.email = "Bitte Email angeben.";
      }
      if (!password) {
        errors.password = "Bitte Passwort angeben.";
      }
      if (password !== confirm_password) {
        errors.confirm_password = "Passwort stimmt nicht überein.";
      }
      if (!salutation) {
        errors.salutation = "Bitte Anrede angeben.";
      }
      if (!firstname) {
        errors.firstname = "Bitte Vornamen angeben.";
      }
      if (!lastname) {
        errors.lastname = "Bitte Nachnamen angeben.";
      }
      if (!birth_date) {
        errors.birth_date = "Bitte Geburtsdatum angeben.";
      }
      if (!zip_code) {
        errors.zip_code = "Bitte Postleitzahl angeben.";
      }
      if (!city) {
        errors.city = "Bitte Stadt angeben.";
      }
      if (!street) {
        errors.street = "Bitte Straße angeben.";
      }
      if (!street_number) {
        errors.street_number = "Bitte Hausnummer angeben.";
      }
      if (!country) {
        errors.country = "Bitte Land angeben.";
      }

      // Set the error state if there are any errors
      setError(errors);

      // If there are any errors, stop the form submission
      if (Object.keys(errors).length > 0) {
        errorRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        return;
      }
      setLoadingAuthRequest(true);

      // Register the user
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

      // Handling backend errors
      if (error) {
        handleBackendErrors(errors, setError, error);
        setLoadingAuthRequest(false);
        return;
      }

      setToken(data.token);
      setIsAuthenticated(true);
      setLoadingAuthRequest(false);
      localStorage.setItem("token", data.token);
    } catch (error) {
      setLoadingAuthRequest(false);
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
          <div className="group">
            <input
              className={error.email ? "err" : "input"}
              id="email"
              type="email"
              placeholder="E-Mail Adresse"
              value={email}
              onBlur={handleChange}
              onChange={handleChange}
            />

            {error.email && (
              <small className="err" ref={errorRef}>
                {error.email}
              </small>
            )}
          </div>

          <div className="group">
            <input
              className={error.password ? "err" : "input"}
              id="password"
              type="password"
              placeholder="Passwort"
              value={password}
              onChange={handleChange}
              onBlur={handleChange}
              onKeyUp={checkCapsLock}
            />
            {error.password && (
              <small className="err" ref={errorRef}>
                {error.password}
              </small>
            )}
            {isCapsLockOn && <small>Feststelltaste ist aktiviert!</small>}
          </div>

          <div className="group">
            <input
              className={error.confirm_password ? "err" : "input"}
              id="confirm_password"
              type="password"
              placeholder="Passwort wiederholen"
              value={confirm_password}
              onChange={handleChange}
              onBlur={handleChange}
              onKeyUp={checkCapsLock}
            />
            {error.confirm_password && (
              <small className="err" ref={errorRef}>
                {error.confirm_password}
              </small>
            )}
            {isCapsLockOn && <small>Feststelltaste ist aktiviert!</small>}
          </div>
        </div>

        <div className="personal-data">
          <div className="buisness">
            <h4>Rechnungsadresse</h4>
            <a href="#">Sie sind ein Firmenkunde?</a>
          </div>

          <div className="group">
            <select
              className={error.salutation ? "err" : "input"}
              id="salutation"
              value={salutation}
              onChange={handleChange}
              onBlur={handleChange}
            >
              <option value="">- Bitte Anrede wählen -</option>
              <option value="Frau">Frau</option>
              <option value="Herr">Herr</option>
              <option value="Mensch">Mensch</option>
            </select>
            {error.salutation && (
              <small className="err" ref={errorRef}>
                {error.salutation}
              </small>
            )}
          </div>

          <div className="group">
            <input
              className={error.firstname ? "err" : "input"}
              id="firstname"
              type="text"
              placeholder="Vorname"
              value={firstname.charAt(0).toUpperCase() + firstname.slice(1)}
              onChange={handleChange}
              onBlur={handleChange}
            />
            {error.firstname && (
              <small className="err" ref={errorRef}>
                {error.firstname}
              </small>
            )}
          </div>

          <div className="group">
            <input
              className={error.lastname ? "err" : "input"}
              id="lastname"
              type="text"
              placeholder="Nachname"
              value={lastname.charAt(0).toUpperCase() + lastname.slice(1)}
              onChange={handleChange}
              onBlur={handleChange}
            />
            {error.lastname && (
              <small className="err" ref={errorRef}>
                {error.lastname}
              </small>
            )}
          </div>

          <div className="group">
            <div className="street">
              <input
                className={error.street ? "err2" : "item2"}
                id="street"
                type="text"
                placeholder="Straße"
                value={street.charAt(0).toUpperCase() + street.slice(1)}
                onChange={handleChange}
                onBlur={handleChange}
              />

              <input
                className={error.street_number ? "err1" : "item1"}
                id="street_number"
                type="text"
                placeholder="Nr./ID"
                value={street_number}
                onChange={handleChange}
                onBlur={handleChange}
              />
            </div>
            {error.street && (
              <small className="err" ref={errorRef}>
                {error.street}
              </small>
            )}
            {error.street_number && (
              <small className="err" ref={errorRef}>
                {error.street_number}
              </small>
            )}
          </div>

          <input type="text" placeholder="Adresszusatz/ Postnummer" />

          <div className="group">
            <div className="town">
              <input
                className={error.zip_code ? "err1" : "item1"}
                id="zip_code"
                type="text"
                placeholder="PLZ"
                value={zip_code}
                onChange={handleChange}
                onBlur={handleChange}
              />

              <input
                className={error.city ? "err2" : "item2"}
                id="city"
                type="text"
                placeholder="Stadt"
                value={city.charAt(0).toUpperCase() + city.slice(1)}
                onChange={handleChange}
                onBlur={handleChange}
              />
            </div>
            {error.zip_code && (
              <small className="err" ref={errorRef}>
                {error.zip_code}
              </small>
            )}
            {error.city && (
              <small className="err" ref={errorRef}>
                {error.city}
              </small>
            )}
          </div>

          <div className="group">
            <select
              className={error.country ? "err" : "input"}
              id="country"
              value={country}
              onChange={handleChange}
              onBlur={handleChange}
            >
              <option value="">- Bitte Land wählen -</option>
              <option value="Deutschland">Deutschland</option>
              <option value="Österreich">Österreich</option>
              <option value="Schweiz">Schweiz</option>
            </select>
            {error.country && (
              <small className="err" ref={errorRef}>
                {error.country}
              </small>
            )}
          </div>

          <input
            id="tel"
            type="text"
            placeholder="+4915114302718"
            value={tel}
            onChange={handleChange}
            onBlur={handleChange}
          />

          <div className="group">
            <input
              className={error.birth_date ? "err" : "input"}
              id="birth_date"
              type="date"
              placeholder="DD.MM.YYYY"
              value={birth_date}
              onChange={handleChange}
              onBlur={handleChange}
            />
            {error.birth_date && (
              <small className="err" ref={errorRef}>
                {error.birth_date}
              </small>
            )}
          </div>
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
