import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Details from "../pages/Detail";

export default function route() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/detail/:user' element={<Details />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
}
