import React, { useState } from "react";
import { IInputs } from "../modules/Types";
interface IFormProps {
  formType: 'login' | 'register';
  onFormSubmit: (user: IInputs) => void;
}

const Form = ({ formType, onFormSubmit }: IFormProps) => {
  const [inputs, setInputs] = useState<IInputs>({
  name: "",
  email: "",
  password: "",
  address: {
    city: "",
    country: "",
    line1: "",
    postal_code: ""
  }
});
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const endpoint = `http://localhost:3001/api/auth/${formType}`;
    const body = formType === 'register' ? inputs : {
      email: inputs.email,
      password: inputs.password
    };
    
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      localStorage.setItem("customerId", data.customerId.toString());
      if (data.address) {
        localStorage.setItem("address", JSON.stringify(data.address));
      }
      onFormSubmit(data);
    }
  };

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;

  if (name === 'city' || name === 'country' || name === 'line1' || name === 'postal_code' && inputs.address !== undefined) {
    setInputs(prevState => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value
      }
    }));
  } else {
    setInputs(prevState => ({
      ...prevState,
      [name]: value
    }));
  }
};

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {formType === 'register' && (
          <>
           <input className="input-field" type="text" name="name" value={inputs.name} onChange={handleChange} placeholder="Name" />
          {Object.keys(inputs.address).map((key) => (
            <input className="input-field" key={key} type="text" name={key} value={inputs.address[key]
            } onChange={handleChange} placeholder={key.charAt(0).toUpperCase() + key.slice(1)} />
          ))}
          </>
        )}
        <input className="input-field" name="email" type="email" placeholder="Email" autoComplete="off" value={inputs.email} onChange={handleChange} />
        <input className="input-field" name="password" type="password" placeholder="Password" autoComplete="off" value={inputs.password} onChange={handleChange} />
        <button className="button" type="submit">
          {formType === "login" ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Form;