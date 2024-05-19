import React, { useState } from "react";
import { IInputs } from "../modules/IInputs";
interface IFormProps {
   formType: 'login' | 'register';
   onFormSubmit: (user: { email: string; customerId: number }) => void;
}

const Form = ({ formType, onFormSubmit }: IFormProps) => {
  const [inputs, setInputs] = useState<IInputs>({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const endpoint = `http://localhost:3001/api/auth/${formType}`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(inputs)
    });
    const data = await response.json();
    if (response.status === 200) {
      onFormSubmit(data);
    }
    setInputs({ email: "", password: "" }); 
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input className="input-field" name="email" type="email" placeholder="Email" autoComplete="off" value={inputs.email} onChange={handleChange} />
        <input className="input-field" name="password" type="password" placeholder="Password" autoComplete="off" value={inputs.password} onChange={handleChange} />
        <button className="button" type="submit">
          {formType === "login" ? "Login" : "Register"}
        </button>
      </form>
    </div>;
};

export default Form;
