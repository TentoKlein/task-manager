import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("https://task-manager-backend-6y80.onrender.com/users/login", {
        email,
        password
      });

      setLoading(false);
      window.location.href = "/dashboard";

      console.log(res.data);

      // save token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", email);

    } catch (err) {
      setLoading(false);
      alert("Login failed");
      console.error(err);
    }
  };

 return (
  <div
    style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f4f4f4"
    }}
  >
    <div
      style={{
        width: "350px",
        padding: "30px",
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0 0 15px rgba(0,0,0,0.1)"
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px"
        }}
      >
        Task Manager Login
      </h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          boxSizing: "border-box"
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "20px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          boxSizing: "border-box"
        }}
      />

       <button
         onClick={handleLogin}
         disabled={loading}
         style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          opacity: loading ? 0.7 : 1
         }}
         >
          {loading ? "Loading..." : "Login"}
         </button>

       <p style={{ textAlign: "center", marginTop: "15px" }}>
        Don't have an account?
      <span
        onClick={() => window.location.href = "/register"}
        style={{
        color: "blue",
        cursor: "pointer"
       }}
       >
       Register
       </span>
       </p>
    </div>
  </div>
 );
}

export default Login;