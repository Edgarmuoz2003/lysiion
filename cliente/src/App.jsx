import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Nav1 from "./components/Nav1";
import AuthProvider from "./hooks/auth/AuthProvider";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AdminProductos from "./pages/AdminProductos";
import VistaProductos from "./pages/VistaProductos";
import ProductProvider from "./hooks/products/ProductProvider";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <Nav1 />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:gender/:category" element={<VistaProductos />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/productos" element={<AdminProductos />} />
            </Route>
          </Routes>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
