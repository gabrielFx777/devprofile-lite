import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import "./Form.css";

export default function ProtectedRoute({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setCarregando(false);
    });
  }, []);

  if (carregando) return <p>Verificando login...</p>;
  if (!usuario) return <Navigate to="/login" />;
  return children;
}
