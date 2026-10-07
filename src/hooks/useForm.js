import { useState } from "react";

export const useForm = (initialValues) => {
  const [formState, setFormState] = useState(initialValues);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormState(initialValues);
  };

  return {
    formState,
    handleInputChange,
    handleReset,
  };
};