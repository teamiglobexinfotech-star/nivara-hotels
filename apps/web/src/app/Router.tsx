import { BrowserRouter, Route, Routes } from "react-router-dom";

import Landing from "@/pages/public/Landing";
import Login from "@/pages/auth/Login";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
