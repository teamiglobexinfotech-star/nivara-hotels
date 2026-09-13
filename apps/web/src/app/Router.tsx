import { BrowserRouter, Route, Routes } from "react-router-dom";

import Landing from "@/pages/public/Landing";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}
