import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Landing from "./pages/Landing/Landing";
import { Route, Routes } from "react-router-dom";
import MyNotes from "./pages/MyNotes/MyNotes";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CreateNote from "./pages/CreateNote/CreateNote";
import UpdateNote from "./pages/UpdateNote/UpdateNote";
import Profile from "./pages/Profile/Profile";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="*" element={<NotFound />}></Route>

        <Route path="/" element={<Landing />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/createnote" element={<CreateNote />}></Route>
        <Route path="/updatenote/:id" element={<UpdateNote />}></Route>
        <Route path="/mynotes" element={<MyNotes />}></Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
