import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage';
import Layout from "./components/Layout";
import CategoriaPage from "./Pages/CategoriaPage";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/categoria/:nombre" element={<CategoriaPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App