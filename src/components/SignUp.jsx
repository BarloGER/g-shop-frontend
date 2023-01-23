import "../styles/signUp.css";

// ToDo: Add Input Fields for business customer
// ToDo: Add second personal-data form for alternative address
// ? Maybe add Datenschutz hint

export default function SignUp() {
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

      <form className="data">
        <div className="login-data">
          <h4>Login-Daten</h4>
          <input type="text" placeholder="E-Mail Adresse" />
          <input type="password" placeholder="Passwort" />
          <input type="password" placeholder="Passwort wiederholen" />
        </div>

        <div className="personal-data">
          <div className="buisness">
            <h4>Rechnungsadresse</h4>
            <a href="#">Sie sind ein Firmenkunde?</a>
          </div>
          <select>
            <option defaultValue={"selected"}>- Bitte Anrede wählen -</option>
            <option value="1">Frau</option>
            <option value="2">Herr</option>
            <option value="3">Mensch</option>
          </select>
          <input type="text" placeholder="Vorname" />
          <input type="text" placeholder="Nachname" />
          <div className="street">
            <input type="text" placeholder="Straße" className="item2" />
            <input type="text" placeholder="Nr./ID" className="item1" />
          </div>
          <input type="text" placeholder="Adresszusatz/ Postnummer" />
          <div className="town">
            <input type="text" placeholder="PLZ" className="item1" />
            <input type="text" placeholder="Stadt" className="item2" />
          </div>
          <select>
            <option defaultValue={"selected"}>- Bitte Land wählen -</option>
            <option value="1">Deutschland</option>
            <option value="2">Österreich</option>
            <option value="3">Schweiz</option>
          </select>
          <input type="text" placeholder="+49 39 53604246" />
          <input type="text" placeholder="DD.MM.YYYY" />
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
        <input type="submit" value="Kundenkonto anlegen" className="button" />
      </form>
    </section>
  );
}
