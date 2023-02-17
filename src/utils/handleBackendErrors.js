// Used in the following components: SignIn.jsx and SignUp.jsx

// This function handles the backend errors and sets the error messages to the corresponding input fields
export const handleBackendErrors = (errors, setError, error) => {
  const updatedErrors = { ...errors };
  if (error.includes("E-Mail")) {
    updatedErrors.email = error;
    setError(updatedErrors);
  } else if (error.includes("Passwort")) {
    updatedErrors.password = error;
    setError(updatedErrors);
  } else if (error.includes("Anrede")) {
    updatedErrors.salutation = error;
    setError(updatedErrors);
  } else if (error.includes("Vorname")) {
    updatedErrors.firstname = error;
    setError(updatedErrors);
  } else if (error.includes("Nachname")) {
    updatedErrors.lastname = error;
    setError(updatedErrors);
  } else if (error.includes("Geburtsdatum")) {
    updatedErrors.birth_date = error;
    setError(updatedErrors);
  } else if (error.includes("Postleitzahl")) {
    updatedErrors.zip_code = error;
    setError(updatedErrors);
  } else if (error.includes("Stadt")) {
    updatedErrors.city = error;
    setError(updatedErrors);
  } else if (error.includes("Straße")) {
    updatedErrors.street = error;
    setError(updatedErrors);
  } else if (error.includes("Hausnummer")) {
    updatedErrors.street_number = error;
    setError(updatedErrors);
  } else if (error.includes("Land")) {
    updatedErrors.country = error;
    setError(updatedErrors);
  }
};
