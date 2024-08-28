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
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { ReactNode } from "react";

interface GuardType {
  children: ReactNode;
}

const GuardHome: React.FC<GuardType> = ({ children }) => {
  const activeUser = useSelector((stare: RootState) => stare.user);
  return !activeUser.email ? <Navigate to="/" replace /> : children;
};

const GuardSign: React.FC<GuardType> = ({ children }) => {
  const activeUser = useSelector((stare: RootState) => stare.user);
  return activeUser.email ? <Navigate to="/home" replace /> : children;
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
