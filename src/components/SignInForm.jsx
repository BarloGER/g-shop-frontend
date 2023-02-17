import "../styles/login.css";

// This component displays a sign-in form that is used in the SignIn component

const SignInForm = ({
  email,
  password,
  handleChange,
  handleSubmit,
  error,
  errorRef,
  isCapsLockOn,
  checkCapsLock,
  passwordShown,
  setPasswordShown,
  togglePassword,
  FaTimes,
  FaEye,
  FaEyeSlash,
  Link,
  setIsAccClicked,
}) => {
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

export default SignInForm;
