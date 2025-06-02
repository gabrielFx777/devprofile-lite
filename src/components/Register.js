import { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const cadastrar = async () => {
    setErro(""); // limpa mensagens anteriores

    try {
      // Cria o usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );
      const uid = userCredential.user.uid;

      // Cria documento de perfil no Firestore com dados padrão
      await setDoc(doc(db, "userProfiles", uid), {
        nomeCompleto: "Novo Usuário",
        bioCurta: "Este é um perfil recém-criado.",
        linkPortfolio: "https://meuportfolio.com",
      });

      // Redireciona para login
      navigate("/login");
    } catch (err) {
      setErro("Erro ao cadastrar: " + err.message);
    }
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <input
        placeholder="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <br />
      <input
        placeholder="Senha"
        type="password"
        onChange={(e) => setSenha(e.target.value)}
        value={senha}
      />
      <br />
      <button onClick={cadastrar}>Cadastrar</button>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
    </div>
  );
}
