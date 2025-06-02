import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h2>Login</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Senha" type="password" onChange={(e) => setSenha(e.target.value)} />
      <button onClick={entrar}>Entrar</button>
      {erro && <p>{erro}</p>}
    </div>
  );
}
