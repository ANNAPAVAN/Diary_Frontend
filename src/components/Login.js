import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND}/api/auth/login`, {
        email,
        password,
      });
      if (response.data.status === "success") {
        // alert("Login success");
        localStorage.setItem("diaryToken", response.data.token);
        localStorage.setItem("diaryUser", response.data.email);
        console.log(response.data);
        navigate("/home");
      } else {
        setError("Login Failure");
      }
    } catch (e) {
      setError("Login Failure---error");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          className="login-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label>Password:</label>
        <input
          className="login-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button className="login-btn" type="submit">
          Log In
        </button>
      </form>
      <Link className="login-link" to="/register">
        Don't have an account? Register here.
      </Link>
    </div>
  );
}

export default Login;






// const signIn = async (req, res) => {
//     const {email, password } = req.body;

//     const query = `select * from users where email = ?`;
//     console.log(query);
//     db.query(query,[email], async (err,results) => {
//         console.log(results);
//         if(err){
//             return res.json({status:"failure"});
//         }
//         if(results.length ==0 ){
//             console.log("no user");
//             return res.json({status:"failure"});
//         }

//         const user = results[0];
//         const hashedPassword = user.password;
//         console.log("hashed psswd ",hashedPassword)

//         bcrypt.compare(password,hashedPassword,(err,isMatch)=>{
//             if(err){
//                 console.log("errr")
//                 return res.json({status:"failure"});
//             }
//             console.log("-----",isMatch)
//             if(!isMatch){
//                 console.log("not matches")
//                 return res.json({status:"failure"});
//             }
//             console.log("Matched")
//             return res.json({status: "success"});
//         })

//         // return res.json({status: "success"});

//     })
// }