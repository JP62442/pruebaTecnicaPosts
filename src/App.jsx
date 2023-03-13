import { useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Login } from "./Pages/Login";

import { Posts } from "./Pages/Posts";

import { auth } from "./firebase-config-js";

export function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((loggedIn) => {
      setLoggedIn(loggedIn);
      setLoading(false);
    });
    return unsubscribe;
  }, [auth]);

  useEffect(() => {
    if (loggedIn) {
      navigate("/home");
    }
  }, [loggedIn, navigate]);

  if (loading) {
    return <h1>CARGANDO...</h1>;
  }

  return (
    <>
      <Routes>
        {loggedIn ? (
          <>
            <Route path="/home" element={<Posts />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </>
        ) : (
          <>
            <Route
              path="/login"
              element={<Login setLoggedIn={setLoggedIn} />}
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </>
  );
}
