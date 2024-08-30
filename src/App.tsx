import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Sign from "./pages/sign/Sign";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
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
                    <motion.main
                      className="page"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Home />
                    </motion.main>
                  </>
                </GuardHome>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
