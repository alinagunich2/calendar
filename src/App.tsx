import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Sign from "./components/sign/Sign";
import { StorageType } from "./types/enum";

const GuardHome = ({ children }) => {
  const activeUser = localStorage.getItem(StorageType.ActiveUser);
  return !activeUser ? <Navigate to="/" replace /> : children;
};

const GuardSign = ({ children }) => {
  const activeUser = localStorage.getItem(StorageType.ActiveUser);
  return activeUser ? <Navigate to="/home" replace /> : children;
};

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Routes>
          <Route
            path="/"
            element={
              <GuardSign>
                <Sign />
              </GuardSign>
            }
          />
          <Route
            path="/home"
            element={
              <GuardHome>
                <>
                  <Header />
                  <main className="page">
                    <Home />
                  </main>
                </>
              </GuardHome>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
