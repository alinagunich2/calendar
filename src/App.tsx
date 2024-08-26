import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Sign from "./components/sign/Sign";

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<Sign />} />
          <Route
            path="/home"
            element={
              <>
                <Header />
                <main className="page">
                  <Home />
                </main>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
