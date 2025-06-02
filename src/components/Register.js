import { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./Form.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const cadastrar = async () => {
    setErro("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );
      const uid = userCredential.user.uid;

      await setDoc(doc(db, "userProfiles", uid), {
        nomeCompleto: email,
        bioCurta: "Este é um perfil novo.",
        linkPortfolio: "https://meuportfolio.com",
      });

      navigate("/login");
    } catch (err) {
      setErro("Erro ao cadastrar: " + err.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Cadastro</h2>
      <input
        placeholder="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="form-input"
      />
      <input
        placeholder="Senha"
        type="password"
        onChange={(e) => setSenha(e.target.value)}
        value={senha}
        className="form-input"
      />
      <button onClick={cadastrar} className="form-button">
        Cadastrar
      </button>

      <button
        onClick={() => navigate("/login")}
        className="form-button"
        style={{ marginTop: "10px", backgroundColor: "#6c757d" }}
      >
        Ir para Login
      </button>

      {erro && <p className="form-error">{erro}</p>}
    </div>
  );
}
