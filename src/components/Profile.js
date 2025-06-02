import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [perfil, setPerfil] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "userProfiles", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPerfil(docSnap.data());
        } else {
          setPerfil({
            nomeCompleto: "",
            bioCurta: "Perfil ainda não configurado",
            linkPortfolio: "",
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
    <div>
      <h2>Meu Perfil</h2>
      {perfil ? (
        <div>
          <p>
            <strong>Nome:</strong> {perfil.nomeCompleto}
          </p>
          <p>
            <strong>Bio:</strong> {perfil.bioCurta}
          </p>
          <p>
            <strong>Portfólio:</strong>{" "}
            <a href={perfil.linkPortfolio}>{perfil.linkPortfolio}</a>
          </p>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
      <button onClick={sair}>Sair</button>
    </div>
  );
}
