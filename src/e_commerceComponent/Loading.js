import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Loading() {
  // state
  const [count, setCount] = useState(3);
  // hook
  const navigate = useNavigate();

  useEffect(() => {
    // run
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count is equal to 0
    count === 0 && navigate("/auth/signin");
    // cleanup interval
    return () => clearInterval(interval);
  }, [count]);

  return <div>Redirecting You in {count} seconds</div>;
}
