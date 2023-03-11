import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { Posts } from "./Pages/Posts";
import { Users } from "./Pages/Users";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/home" element={<Posts />} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </>
  );
}

export default App;
