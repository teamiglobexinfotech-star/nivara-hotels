import { BrowserRouter, Route, Routes } from "react-router-dom";

import Landing from "@/pages/public/Landing";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}
