import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/LandingPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <div className="pages">

          <Routes>

            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Landing />} />


          </Routes>

        </div>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
