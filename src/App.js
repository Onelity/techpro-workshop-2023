import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./layouts/Navbar";
import { Users } from "./features/Users/Users";
import { NoPage } from "./pages/NoPage";
import { CreateUser } from "./features/Users/components/CreateUser";
import { EditUser } from "./features/Users/components/EditUser";
import { Devices } from "./features/Devices/Devices";
import { CreateDevice } from "./features/Devices/components/CreateDevice";
import { EditDevice } from "./features/Devices/components/EditDevice";

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
          <Route path="/devices" element={<Devices />} />
          <Route path="/devices/new" element={<CreateDevice />} />
          <Route path="/devices/edit/:id" element={<EditDevice />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

