import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg,rgb(227, 251, 253) 0%,rgb(166, 198, 254) 100%);
  padding: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #fff;
  padding: 2rem 2.5rem;
  border: 1px solid rgb(0, 0, 0);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  width: 100%;
  max-width: 350px;
  @media (max-width: 480px) {
    padding: 1.2rem 0.7rem;
    max-width: 98vw;
  }
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  background: #f9fafb;
  @media (max-width: 480px) {
    font-size: 0.98rem;
    padding: 0.65rem 0.7rem;
  }
  @media (max-width: 340px) {
    font-size: 0.92rem;
    padding: 0.55rem 0.5rem;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1rem;
  background:rgb(255, 220, 19);
  color: rgb(0, 0, 0);
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 800;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background:rgb(255, 230, 19);
  }
  @media (max-width: 480px) {
    font-size: 0.97rem;
    padding: 0.65rem 0.7rem;
  }
  @media (max-width: 340px) {
    font-size: 0.92rem;
    padding: 0.55rem 0.5rem;
  }
`;

const Error = styled.div`
  color: #ef4444;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
  @media (max-width: 340px) {
    font-size: 0.85rem;
  }
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  color: #1e293b;
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
  @media (max-width: 340px) {
    font-size: 1rem;
  }
`;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("https://js-project-api-4xto.onrender.com/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      console.log('Login/Register response:', data);
      if (!response.ok) {
        setError(data.message || "Registration failed");
      } else {
        localStorage.setItem("token", data.response.accessToken);
        localStorage.setItem("userId", data.response.userId);
        console.log('Token in localStorage:', localStorage.getItem('token'));
        navigate("/app");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Register:</Title>
        {error && <Error>{error}</Error>}
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
      </Form>
    </Container>
  );
};

export default Register;