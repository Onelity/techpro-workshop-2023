import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./layouts/Navbar";
import { Users } from "./features/Users/Users";
import { NoPage } from "./pages/NoPage";
import { CreateUser } from "./features/Users/components/CreateUser";
import { EditUser } from "./features/Users/components/EditUser";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/new" element={<CreateUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

