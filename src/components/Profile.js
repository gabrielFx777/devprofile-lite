import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Form.css";

export default function Profile() {
  const [perfil, setPerfil] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "userProfiles", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPerfil({
            ...docSnap.data(),
            email: user.email, // <-- inclui o email aqui
          });
        } else {
          setPerfil({
            nomeCompleto: "",
            bioCurta: "Perfil ainda não configurado",
            linkPortfolio: "",
            email: user.email, // <-- mesmo se o Firestore estiver vazio
          });
        }
      } else {
        navigate("/login");
      }
    });
  }, [navigate]);

  const sair = () => {
    signOut(auth);
    navigate("/login");
  };

  return (
    <div className="form-container">
      <h2>Meu Perfil</h2>

      {perfil ? (
        <div className="perfil-info">
          <p>
            <strong>Nome:</strong> {perfil.nomeCompleto}
          </p>
          <p>
            <strong>Email:</strong> {perfil.email}
          </p>
          <p>
            <strong>Bio:</strong> {perfil.bioCurta}
          </p>
          <p>
            <strong>Portfólio:</strong>{" "}
            <a href={perfil.linkPortfolio} target="_blank" rel="noreferrer">
              {perfil.linkPortfolio}
            </a>
          </p>
        </div>
      ) : (
        <p>Carregando...</p>
      )}

      <button onClick={sair} className="form-button">
        Sair
      </button>
    </div>
  );
}
