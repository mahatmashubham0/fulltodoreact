import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import  axios  from "axios";
import { Context, server } from "../main";
import toast from "react-hot-toast";

const Register = () => {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const submitHandler = async (e) => {
    console.log("http://localhost:5000/api/v1/users/new");
    setLoading(true);
    e.preventDefault();
    console.log(":",name,email,password);
    try {
      const { data } = await axios.post(
        `${server}/users/new`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

   
      toast.success(data.message);
      console.log(data)
      setIsAuthenticated(true);  // it is show that use is created
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error)
      setIsAuthenticated(false);
      setLoading(false);
    }


  }

  if (isAuthenticated) return <Navigate to={"/"} /> // it will move to the navigate to the home page

  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            // required
          />
          <input
            type="email"
            placeholder="Email"
            // required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            // required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign Up</button>
          <h4>Or</h4>
          <Link to="/login">Log In</Link>
        </form>
      </section>
    </div>
  );
};

export default Register;
