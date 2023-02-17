import { useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import { registerUser } from "../utils/auth";
import { handleBackendErrors } from "../utils/handleBackendErrors";
import { validateInput } from "../utils/validateInput";
import { togglePassword } from "../utils/showPassword";
import useCapsLockCheck from "../utils/checkCapsLock";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SignUpForm from "./SignUpForm";
import Loading from "./Loading";
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
  const [passwordShown, setPasswordShown] = useState(false);

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

  const props = {
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
    handleChange,
    handleSubmit,
    error,
    errorRef,
    isCapsLockOn,
    passwordShown,
    setPasswordShown,
    checkCapsLock,
    togglePassword,
    FaEye,
    FaEyeSlash,
  };

  return <SignUpForm {...props} />;
};

export default SignUp;
