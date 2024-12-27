import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { SignUpType } from "../types/User.types";
import { FirebaseError } from "firebase/app";
import { usersCol } from "../services/firebase";
import { useAddDocument } from "../hooks/useAddDocument";
import { Timestamp } from "@firebase/firestore";
import { updateProfile } from "@firebase/auth";
import LandingPageNavigation from "../components/navigation/LandingPageNavigation";

const SignupPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<SignUpType>();
  const { signup } = useAuth();
  const navigate = useNavigate();

  const { addDocument } = useAddDocument();

  const passwordRef = useRef("");
  passwordRef.current = watch("password");

  const onSignup: SubmitHandler<SignUpType> = async (data) => {
    setIsSubmitting(true);

    try {
      const userCredential = await signup(data.email, data.password);
      const user = userCredential.user;
      const dateJoined = Timestamp.fromDate(new Date());

      await updateProfile(user, {
        displayName: `${data.firstName}`,
      });

      await addDocument(usersCol, {
        _id: user.uid,
        id: user.uid,
        email: user.email || "",
        firstName: data.firstName,
        lastName: data.lastName,
        dateJoined: dateJoined,
        dob: "",
        bio: "",
        location: "",
        books: {
          currentlyReading: [],
          wantToRead: [],
          read: [],
        },
        following: [],
      });

      navigate("/home");
    } catch (err) {
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
          <h1 className="text-orange mb-4">SIGN UP</h1>
          <Form onSubmit={handleSubmit(onSignup)} className="mb-3 text-white">
            <Form.Group controlId="firstName">
              <Form.Label>First name</Form.Label>
              <Form.Control
                className="input-field"
                placeholder="First name"
                type="text"
                {...register("firstName", {
                  required: "Please enter your first name.",
                })}
              />
              {errors.firstName && (
                <p className="invalid">{errors.firstName.message || "Invalid value"}</p>
              )}
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                className="input-field"
                placeholder="Last name"
                type="text"
                {...register("lastName", {
                  required: "Please enter your last name.",
                })}
              />
              {errors.lastName && (
                <p className="invalid">{errors.lastName.message || "Invalid value"}</p>
              )}
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                className="input-field"
                placeholder="my-email@email.com"
                type="email"
                {...register("email", {
                  required: "Please enter an email.",
                })}
              />
              {errors.email && <p className="invalid">{errors.email.message || "Invalid value"}</p>}
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="input-field"
                placeholder="Password"
                type="password"
                autoComplete="new-password"
                {...register("password", {
                  required: "Please enter a password",
                  minLength: {
                    message: "Enter at least 6 characters",
                    value: 3,
                  },
                })}
              />
              {errors.password && (
                <p className="invalid">{errors.password.message || "Invalid value"}</p>
              )}
              <Form.Text>At least 6 characters</Form.Text>
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                className="input-field"
                placeholder="Confirm password"
                type="password"
                autoComplete="off"
                {...register("confirmPassword", {
                  required: "Enter your password again please.",
                  minLength: {
                    message: "Enter at least 6 characters",
                    value: 3,
                  },
                  validate: (value) => {
                    return (
                      value === passwordRef.current || "The passwords does not match, try again"
                    );
                  },
                })}
              />
              {errors.confirmPassword && <p>{errors.confirmPassword.message || "Invalid value"}</p>}
            </Form.Group>

            <Button disabled={isSubmitting} type="submit" className="btn-orange mt-4">
              {isSubmitting ? "Creating account..." : "Create Account"}
            </Button>
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

export default SignupPage;
