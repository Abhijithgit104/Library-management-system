import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";



const Register = () => {

const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "reader",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
    const response=  await api.post("api/register/", formData);
       console.log(response.data);
      alert("Registration successful! Please login.");
      navigate("/");
    } catch (error) {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section
      className="min-vh-100 d-flex align-items-center"
      style={{ backgroundColor: "#8fc4b7" }}
    >
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-6">
            <div className="card shadow rounded-3">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp"
                className="card-img-top"
                alt="Registration"
              />

              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 text-center">
                  Registration Information
                </h3>

                <form onSubmit={handleSubmit} method="POST">
                  {/* Name */}
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                     Username
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.username}
                      onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
                      className="form-control"
                      placeholder="Enter Username"
                    />
                  </div>

                  {/* Date and Gender */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="pwd" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        id="pwd"
                        value={formData.password}
                        onChange={(e)=>setFormData({...formData,password:e.target.value})}
                        className="form-control"
                      />
                    </div>
                  </div>

                   <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="form-label"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e)=>setFormData({...formData,email:e.target.value})}
                      className="form-control"
                      placeholder="Enter Email"
                    />
                  </div>

                  {/* Class */}
                  <div className="mb-3">
                    <label className="form-label">
                      Role
                    </label>
                    <select className="form-select" value={formData.role} onChange={(e)=>setFormData({...formData,role:e.target.value})}>
                      <option value="">Select Role</option>
                      <option value="reader">Reader</option>
                      <option value="author">Author</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  {/* Registration Code */}
                 

                  {/* Submit Button */}
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-success btn-lg px-5"

                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;