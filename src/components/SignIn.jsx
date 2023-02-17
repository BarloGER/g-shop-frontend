// Import necessary dependencies
import { useState, useRef } from "react";
import { Navigate, Link } from "react-router-dom";
import { FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";

// Import necessary custom hooks and functions
import { loginUser } from "../utils/auth";
import { togglePassword } from "../utils/showPassword";
import { handleBackendErrors } from "../utils/handleBackendErrors";
import { validateInput } from "../utils/validateInput";
import useCapsLockCheck from "../utils/checkCapsLock";

// Import used components
import SignInForm from "./SignInForm";
import Loading from "./Loading";

// This component displays a sign-in form and handles the user's submission

const SignIn = ({
  setIsAccClicked,
  setToken,
  loadingAuthRequest,
  setLoadingAuthRequest,
}) => {
  //--------------------------------------  Start States  --------------------------------------
  const [{ email, password }, setFormState] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
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
    setFormState((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setError(validateInput(id, value, password, error));
  };

  //--------------------------------------  Start Form Submission  --------------------------------------
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

      // Login the user
      const { data, error } = await loginUser({ email, password });

      // If there are any backend errors, handle it and set the error and the loading state
      if (error) {
        handleBackendErrors(errors, setError, error);
        setLoadingAuthRequest(false);
        return;
      }

      // Set the token and the isAuthenticated state and save the token in the local storage if the user was successfully logged in
      setToken(data.token);
      setLoadingAuthRequest(false);
      localStorage.setItem("token", data.token);
      setIsAccClicked(false);
    } catch (error) {
      setLoadingAuthRequest(false);
      console.log(error);
    }
  };
  //--------------------------------------  End Form Submission  --------------------------------------

  // If there is an ongoing authentication request, show the Loading component
  if (loadingAuthRequest) return <Loading />;

  const props = {
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
  };

  return <SignInForm {...props} />;
};

export default SignIn;
