import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import RagisterPage from "./pages/RagisterPage";
import HomePage from "./pages/HomePage";
import PrivetRoute from "./routes/PrivetRoute";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivetRoute />}>
          <Route element={<HomePage />} path="/" exact />
          <Route element={<ProfilePage />} path="/me" />
        </Route>

        <Route element={<Login />} path="/login" />
        <Route element={<RagisterPage />} path="/register" />
        <Route element={<NotFoundPage />} path="/*" />
      </Routes>
    </>
  );
}

export default App;
