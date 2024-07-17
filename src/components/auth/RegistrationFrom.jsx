import React from "react";
import Field from "../common/Field";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegistrationFrom = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = async (formData) => {
    console.log(formData);
    try {
      let response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`,
        formData
      );
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      setError("root.random", {
        type: "random",
        message: `Something went wrong: ${error.message} `,
      });
    }
  };
  return (
    <form
      class="border-b border-[#3F3F3F] pb-10 lg:pb-[30px]"
      onSubmit={handleSubmit(submitForm)}
    >
      <Field label="First Name" error={errors.firstName}>
        <input
          {...register("firstName", { required: "First Name Id is Required" })}
          className={`auth-input ${
            !!errors.firstName ? "border-red-500 " : "border-gray-200"
          }`}
          type="firstName"
          name="firstName"
          id="firstName"
        />
      </Field>

      <Field label="Last Name" error={errors.firstName}>
        <input
          {...register("lastName", { required: "Last Name Id is Required" })}
          className={`auth-input ${
            !!errors.lastName ? "border-red-500 " : "border-gray-200"
          }`}
          type="lastName"
          name="lastName"
          id="lastName"
        />
      </Field>

      <Field label="Email" error={errors.email}>
        <input
          {...register("email", { required: "Email Id is Required" })}
          className={`auth-input ${
            !!errors.email ? "border-red-500 " : "border-gray-200"
          }`}
          type="email"
          name="email"
          id="email"
        />
      </Field>
      <Field label="Password" error={errors.password}>
        <input
          {...register("password", {
            required: "Password  is Required",
            minLength: {
              value: 8,
              message: "Your password mast be al least 8 characters",
            },
          })}
          className={`auth-input ${
            !!errors.password ? "border-red-500 " : "border-gray-200"
          }`}
          type="password"
          name="password"
          id="password"
        />
      </Field>
      <p>{errors?.root?.random?.message}</p>

      <button
        class="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
        type="submit"
      >
        Register
      </button>
    </form>
  );
};

export default RegistrationFrom;
