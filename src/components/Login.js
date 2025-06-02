import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import "./Form.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const entrar = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/perfil");
    } catch (err) {
      setErro("Erro ao fazer login: " + err.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
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
      <button onClick={entrar} className="form-button">Entrar</button>
      <p className="p">Não tem conta? <a onClick={() => navigate("/cadastro")}>Cadastre-se</a></p>
      {erro && <p className="form-error">{erro}</p>}
    </div>
  );
}
