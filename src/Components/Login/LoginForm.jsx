import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../Firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import "./LoginForm.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Mark user as active in Firestore
      await setDoc(doc(db, "activeUsers", user.uid), {
        email: user.email,
        lastActive: new Date().toISOString(),
      });

      // Check if admin
      const adminDoc = await getDoc(doc(db, "admin", user.uid));
      if (adminDoc.exists()) {
        navigate("/admin-dashboard");
      } else {
        navigate("/User-Dashboard");
      }
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="body">
      <table className="login-container">
        <tr>
          <td className="logo">
            <img src="logo2.png" alt="Logo"/>
          </td>
        </tr>
        <tr>
          <td>
            <h1>Login</h1>
          </td>
        </tr>
        <tr>
          <td>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td>
            <button onClick={handleLogin} className="login-button">Login</button>
          </td>
        </tr>
        <tr>
          <td>
            <p>Not registered? <a href="/register">Register here</a></p>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default LoginForm;
