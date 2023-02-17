import { useState } from "react";

// Used in the following components: SignIn.jsx and SignUp.jsx

// This hook checks if the caps lock is on or off in the corresponding input fields
const useCapsLockCheck = () => {
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  const checkCapsLock = (event) => {
    if (event.getModifierState("CapsLock")) {
      setIsCapsLockOn(true);
    } else {
      setIsCapsLockOn(false);
    }
  };

  return [isCapsLockOn, checkCapsLock];
};

export default useCapsLockCheck;
