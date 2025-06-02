import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import "./Form.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false); // Estado de carregamento
  const navigate = useNavigate();

  const entrar = async () => {
    setErro("");
    setCarregando(true); // Inicia a animação

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/perfil");
    } catch (err) {
      setErro("Erro ao fazer login: " + err.message);
    } finally {
      setCarregando(false); // Encerra animação (caso ocorra erro)
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

      <button
        onClick={entrar}
        className="form-button"
        disabled={carregando} // Evita clique duplo
      >
        {carregando ? <span className="spinner"></span> : "Entrar"}
      </button>

      <p className="p">
        Não tem conta?{" "}
        <a onClick={() => navigate("/cadastro")} style={{ cursor: "pointer" }}>
          Cadastre-se
        </a>
      </p>

      {erro && <p className="form-error">{erro}</p>}
    </div>
  );
}
