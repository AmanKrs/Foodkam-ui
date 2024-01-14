import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Content from "./component/Content/Content";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Register from "./pages/Register/Register";
import AddResturant from "./pages/Resturants/RegisterResturant/AddResturant";

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId="1025033409866-etnntnch32pq8irn0aj4iq8ddn5nerk7.apps.googleusercontent.com">
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Content />}></Route>

            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/partner" element={<AddResturant />}></Route>
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
