import LandingPageNavigation from "../components/navigation/LandingPageNavigation";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { LoginType } from "../types/User.types";
import { FirebaseError } from "@firebase/util";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";

const SignInPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginType>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onLogin: SubmitHandler<LoginType> = async (data) => {
    setIsSubmitting(true);

    try {
      await login(data.email, data.password);
      navigate("/home");
    } catch (err) {
      setIsError(true);

      if (err instanceof FirebaseError) {
        console.error(err.message);
      } else if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("Something went wrong, try again.");
      }
    }

    setIsSubmitting(false);
  };

  return (
    <div className="homepage">
      <div className="homepage-half bg-burgundy">
        <LandingPageNavigation />
        <div className="homepage-text-wrap">
          <h1 className="text-orange mb-4">SIGN IN</h1>
          <Form onSubmit={handleSubmit(onLogin)} className="text-white">
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                className="input-field"
                placeholder="my-email@email.com"
                type="email"
                {...register("email", {
                  required: "Please enter your email.",
                })}
              />
              {errors.email && <p className="invalid">{errors.email.message || "Invalid value"}</p>}
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label className="form-label">Password</Form.Label>
              <Form.Control
                className="input-field"
                type="password"
                autoComplete="new-password"
                {...register("password", {
                  required: "Please enter your password",
                })}
              />
              {errors.password && <p>{errors.password.message || "Invalid value"}</p>}
            </Form.Group>

            <Button disabled={isSubmitting} type="submit" className="btn-orange mt-4">
              {isSubmitting ? "Logging in..." : "Log in"}
            </Button>
            {isError && (
              <p style={{ color: "red" }}>Email or password incorrect, please try again!</p>
            )}
          </Form>
        </div>
      </div>

      <div className="homepage-half homepage-image bg-white" id="landing-page-img">
        <svg
          width="127"
          height="358"
          viewBox="0 0 127 358"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="63.5" y1="340.037" x2="63.5" y2="18.0001" stroke="black" />
          <path d="M63.5 18.1296V18.1296C63.5 8.6692 71.1692 1 80.6296 1H82" stroke="black" />
          <path d="M82 1H127" stroke="black" />
          <path d="M63.5 18.1296V18.1296C63.5 8.6692 55.8308 1 46.3704 1H45" stroke="black" />
          <path d="M45 1H3.57628e-07" stroke="black" />
          <path d="M63.5 340V340C63.5 349.46 71.1692 357.13 80.6296 357.13H82" stroke="black" />
          <path d="M82 357.13H127" stroke="black" />
          <path d="M63.5 340V340C63.5 349.46 55.8308 357.13 46.3704 357.13H45" stroke="black" />
          <path d="M45 357.13H3.57628e-07" stroke="black" />
          <line x1="25" y1="178.5" x2="102" y2="178.5" stroke="black" />
        </svg>
      </div>
    </div>
  );
};

export default SignInPage;
