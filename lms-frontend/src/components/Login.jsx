import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import '../styles/style.login.css'
import api from "../api/api";



const Login = (onLogin) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()
  // const navigate=useNav
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("login/", {
  username,
  password,
});

console.log(response.data);
localStorage.setItem("role", response.data.role);

localStorage.setItem("token", response.data.access);
const token=localStorage.getItem('token')

navigate("/dashboard");


      
    } catch (error) {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-10 col-sm-8 col-md-6 col-lg-4">
                
                
                <div className="card shadow-sm border-0 rounded-3 px-3 py-4">
                    <div className="card-body">
                        
                        
                        <div className="text-center mb-4">
                            <h3 className="fw-bold text-dark">Welcome Back</h3>
                            <p className="text-muted small">Please sign in to your account</p>
                        </div>

                       
                        <form className="needs-validation"  onSubmit={handleSubmit}>
                            
                          
                          
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingEmail" placeholder="includes @#1A" required 
                                onChange={(e)=>setUsername(e.target.value)} value={username}/>
                                <label>Username</label>
                                <div className="invalid-feedback">Please enter a valid username</div>
                            </div>

                            
                            
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" required
                                onChange={(e)=>setPassword(e.target.value)} value={password}/>
                                <label>Password</label>
                                <div className="invalid-feedback">Password is required.</div>
                            </div>

                            
                            
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="rememberMe"/>
                                    <label className="form-check-label text-muted small">Remember me</label>
                                </div>
                                <a href="#" className="text-primary text-decoration-none small">Forgot password?</a>
                            </div>

                            
                            
                            <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold mb-3">{loading ? "Authenticating..." : "Sign In"}</button>

                            
                            
                            <div className="text-center">
                                <span className="text-muted small">Don't have an account? </span>
                                <Link to="/register" className="text-primary text-decoration-none small fw-semibold"> Sign Up</Link>
                            </div>

                        </form>
                    

                    </div>
                </div>
                

            </div>
        </div>
    </div>
  );
};

export default Login;
