import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../utils/auth";
import { FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import { togglePassword } from "../utils/showPassword";
import useCapsLockCheck from "../utils/checkCapsLock";
import { handleBackendErrors } from "../utils/handleBackendErrors";
import { validateInput } from "../utils/validateInput";
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
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const errorRef = useRef();
  const [isCapsLockOn, checkCapsLock] = useCapsLockCheck();
  const [passwordShown, setPasswordShown] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setError(validateInput(id, value, password, error));
  };

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

      const { data, error } = await loginUser({ email, password });
      if (error) {
        handleBackendErrors(errors, setError, error);
        setLoadingAuthRequest(false);
        return;
      }
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
                  type={passwordShown ? "text" : "password"}
                  placeholder="Passwort"
                  value={password}
                  onChange={handleChange}
                  onBlur={handleChange}
                  onKeyUp={checkCapsLock}
                />
                <i
                  onClick={() =>
                    togglePassword(passwordShown, setPasswordShown)
                  }
                >
                  {!passwordShown ? (
                    <FaEye size="2.5rem" />
                  ) : (
                    <FaEyeSlash size="2.5rem" />
                  )}
                </i>
                {error.password && (
                  <small className="err" ref={errorRef}>
                    {error.password}
                  </small>
                )}
                {isCapsLockOn && <small>Feststelltaste ist aktiviert!</small>}
              </div>
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
