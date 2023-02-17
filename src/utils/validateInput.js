const validateInput = (e, error, confirm_password, password) => {
  let { id, value } = e.target;
  const stateObj = { ...error, [id]: "" };

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
        stateObj[id] = "Bitte Nachnamen angeben.";
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
};

export default validateInput;
