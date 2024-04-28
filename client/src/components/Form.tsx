import React, { useState } from "react";
import { IInputs } from "../modules/IInputs";

interface IFormProps {
  onClick: (inputs: IInputs) => void;
}

const Form = ({ onClick }: IFormProps) => {
  const [inputs, setInputs] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(inputs);
    if (!inputs.email || !inputs.password) {
      return;
    }
    onClick(inputs);
  };

  return (
    <div>
      <form onClick={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="email"
          autoComplete="off"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          autoComplete="off"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
