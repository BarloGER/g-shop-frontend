// Import necessary dependencies
import { useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Import necessary custom hooks and functions
import { registerUser } from "../utils/auth";
import { handleBackendErrors } from "../utils/handleBackendErrors";
import { validateInput } from "../utils/validateInput";
import { togglePassword } from "../utils/showPassword";
import useCapsLockCheck from "../utils/checkCapsLock";

// Import used components
import SignUpForm from "./SignUpForm";
import Loading from "./Loading";

// ToDo: Add Input Fields for business customer
// ToDo: Add second personal-data form for alternative address
// ToDo: Refactor
// ToDo: Fix error scroll useRef
// ? Maybe add "Datenschutz" hint

// This component displays a sign-up form and handles the user's submission

const SignUp = ({
  isAuthenticated,
  setToken,
  setIsAuthenticated,
  loadingAuthRequest,
  setLoadingAuthRequest,
}) => {
  //--------------------------------------  Start States  --------------------------------------
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

  // Check if Caps Lock is on
  const [isCapsLockOn, checkCapsLock] = useCapsLockCheck();

  // Show or hide password
  const [passwordShown, setPasswordShown] = useState(false);

  // Ref for error scroll (not working)
  const errorRef = useRef();
  //--------------------------------------  End States  --------------------------------------

  // Handle form input changes and set the error state if there are any errors
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState((prev) => ({ ...prev, [id]: value }));
    setError(validateInput(id, value, confirm_password, password, error));
  };

  // --------------------------------------  Start Form Submission  --------------------------------------
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Check for missing values and add them to the errors object if necessary
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

      // Set the error state if there are any errors in the errors object
      setError(errors);

      // If there are any errors, the form wont be submitted and the user will be scrolled to the first error message
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

      // If there are any backend errors, handle it and set the error and the loading state
      if (error) {
        handleBackendErrors(errors, setError, error);
        setLoadingAuthRequest(false);
        return;
      }

      // Set the token and the isAuthenticated state and save the token in the local storage if the user was successfully registered
      setToken(data.token);
      setIsAuthenticated(true);
      setLoadingAuthRequest(false);
      localStorage.setItem("token", data.token);
    } catch (error) {
      setLoadingAuthRequest(false);
    }
  };
  // --------------------------------------  End Form Submission  --------------------------------------

  // If there is an ongoing authentication request, show the Loading component
  if (loadingAuthRequest) return <Loading />;

  // If the user is authenticated, redirect to the auth page
  if (isAuthenticated) return <Navigate to="/auth/me" />;

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
