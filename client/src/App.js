import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./vistas/about/about.component";
import Detail from "./vistas/detail/detail.component";
import Form from "./vistas/form/form.component";
import Home from "./vistas/home/home.component";
import Landing from "./vistas/landing/landing.component";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/:id" element={<Detail />} />
          <Route path="/form" element={<Form />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
