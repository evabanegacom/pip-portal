
import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";

interface IdleTimeoutProps {
  timeout: number; // Time in milliseconds before triggering timeout
  warningTime: number; // Time in milliseconds before showing warning
  onTimeout: () => void; // Callback to handle timeout
}

const IdleTimeout: React.FC<IdleTimeoutProps> = ({
  timeout,
  warningTime,
  onTimeout,
}) => {
  const [idleTime, setIdleTime] = useState<number>(0);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [toastShown, setToastShown] = useState<boolean>(false);

  // Reset idle time and states
  const resetIdleTime = useCallback(() => {
    setIdleTime(0);
    setShowWarning(false);
    setToastShown(false);
  }, []);

  // Debounce user activity to prevent excessive resets
  const debounce = (func: () => void, delay: number) => {
    let timeoutId: number;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(func, delay);
    };
  };

  const handleUserActivity = debounce(resetIdleTime, 200);

  // Timer for idle time increment
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIdleTime((prevIdleTime) => {
        const newIdleTime = prevIdleTime + 1000;

        if (newIdleTime >= warningTime && !showWarning) {
          setShowWarning(true);
        }

        if (newIdleTime >= timeout) {
          onTimeout();
          clearInterval(intervalId); // Stop timer on timeout
          return prevIdleTime; // Prevent further updates
        }

        return newIdleTime;
      });
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [warningTime, timeout, onTimeout, showWarning]);

  // Event listeners for user activity
  useEffect(() => {
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
    };
  }, [handleUserActivity]);

  // Show warning toast
  useEffect(() => {
    if (showWarning && !toastShown) {
      toast.success("You've been idle too long. Logging out soon.", {
        // toastId: "idle-warning", // Prevent duplicate toasts
      });
      setToastShown(true);
    }
  }, [showWarning, toastShown]);

  return (
    <div>
      <div className="sr-only">Idle Time: {idleTime} milliseconds</div>
    </div>
  );
};

export default IdleTimeout;
