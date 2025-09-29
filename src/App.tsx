import React from "react";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { Container } from "./components";
import { User } from "./types";
import { Home } from "./pages/Home";
import { Start } from "./pages/Onboarding";
import { Dashboard } from "./pages/Dashboard";
import { Signin } from "./pages/Signin";
import { ShareholderPage } from "./pages/Shareholder";

export const AuthContext = React.createContext<{
  user: User | undefined;
  authorize: (user: User) => void;
  deauthroize: () => void;
}>({
  user: undefined,
  authorize: () => {},
  deauthroize: () => {},
});

function App() {
  const [user, setUser] = React.useState<User | undefined>(() => {
    try {
      return JSON.parse(localStorage.getItem("session") || "bad json");
    } catch (e) {
      return undefined;
    }
  });

  React.useEffect(() => {
    if (user) {
      localStorage.setItem("session", JSON.stringify(user));
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        authorize: setUser,
        deauthroize: () => setUser(undefined),
      }}
    >
      <Routes>
        {user ? (
          <>
            <Route
              path="/dashboard"
              element={<Navigate to="/dashboard/investor" replace={true} />}
            />
            <Route path="/dashboard/:mode" element={
              <Container paddingTop="4" paddingBottom="4">
                <Dashboard />
              </Container>
            } />
            <Route
              path="/shareholder/:shareholderID"
              element={
                <Container paddingTop="4" paddingBottom="4">
                  <ShareholderPage />
                </Container>
              }
            />
            <Route path="/*" element={<Navigate to="/dashboard" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/start/*" element={<Start />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
