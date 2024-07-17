import React from "react";
import Field from "../common/Field";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";

const LoginForm = () => {
  const navigate = useNavigate();

  const { setAuth } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = async (formData) => {
    // console.log(formData);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        formData
      );

      if (response.status === 200) {
        const { token, user } = response.data;
        if (token) {
          const authToken = token.token;
          const refreshToken = token.refreshToken;

          console.log(`login auth token : ${authToken}`);
          setAuth({ user, authToken, refreshToken });
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      setError("root.random", {
        type: "random",
        message: `user with email ${formData.email} not found`,
      });
    }
  };

  // const {password,email}=error
  return (
    <>
      <form
        className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
        onSubmit={handleSubmit(submitForm)}
      >
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
        <Field label="Submit">
          <button className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90">
            Login
          </button>
        </Field>
      </form>
    </>
  );
};

export default LoginForm;
