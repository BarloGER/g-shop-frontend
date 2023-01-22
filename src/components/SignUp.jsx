import "../styles/signUp.css";

// ToDo: Add Input Fields for business customer
// ToDo: Add second personal-data form for alternative address
// ? Maybe add Datenschutz hint

export default function SignUp() {
  return (
    <main className="sign-up">
      <div className="description">
        <h1>Kundenkonto anlegen</h1>
        <p>
          Mit Ihrem eigenen Kundenkonto geht es schneller durch den
          Bestellvorgang, können Sie abweichende Versandadressen speichern und
          sind immer über Ihren Auftragsstatus informiert. Alle mit einem *
          markierten Felder sind Pflichtfelder.
        </p>
        geschäftskundeadresse
      </div>

      <form>
        <div className="login-data">
          <h2>Login-Daten</h2>
          <input type="text" placeholder="E-Mail Adresse" />
          <input type="password" placeholder="Passwort" />
          <input type="password" placeholder="Passwort wiederholen" />
        </div>

        <div className="personal-data">
          <h2>Rechnungsadresse</h2>
          <a href="#">Sie sind ein Firmenkunde?</a>
          <select>
            <option value selected="selected">
              - Bitte Anrede wählen -
            </option>
            <option value="1">Frau</option>
            <option value="2">Herr</option>
            <option value="3">Mensch</option>
          </select>
          <input type="text" placeholder="Vorname" />
          <input type="text" placeholder="Nachname" />
          <div className="street">
            <input type="text" placeholder="Straße" />
            <input type="text" placeholder="Nr./ID" />
          </div>
          <input type="text" placeholder="Adresszusatz/ Postnummer" />
          <div className="town">
            <input type="text" placeholder="PLZ" />
            <input type="text" placeholder="Stadt" />
          </div>
          <select>
            <option value selected="selected">
              - Bitte Land wählen -
            </option>
            <option value="1">Deutschland</option>
            <option value="2">Österreich</option>
            <option value="3">Schweiz</option>
          </select>
          <input type="text" placeholder="+49 39 53604246" />
          <input type="text" placeholder="DD.MM.YYYY" />
        </div>
        <div className="delivery-address">
          <label>
            <input type="radio" checked="checked" />
            Lieferadresse entspricht Rechnungsadresse
          </label>
          <label>
            <input type="radio" />
            Abweichende Lieferadresse
          </label>
        </div>
        <input type="submit" value="Kundenkonto anlegen" />
      </form>
    </main>
  );
}
