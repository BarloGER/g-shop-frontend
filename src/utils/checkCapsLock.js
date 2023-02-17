import { useState } from "react";

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
