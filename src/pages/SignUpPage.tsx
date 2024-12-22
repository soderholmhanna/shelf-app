import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { SignUpType } from "../types/User.types";
import { FirebaseError } from "firebase/app";
import { usersCol } from "../services/firebase";
import { useAddDocument } from "../hooks/useAddDocument";
import { Timestamp } from "@firebase/firestore";
import { updateProfile } from "@firebase/auth";

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
    <Container className="py-3 center-y">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title className="mb-3">Sign Up</Card.Title>

              <Form onSubmit={handleSubmit(onSignup)} className="mb-3">
                <Form.Group controlId="firstName">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
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
                    placeholder="my-email@email.com"
                    type="email"
                    {...register("email", {
                      required: "Please enter an email.",
                    })}
                  />
                  {errors.email && (
                    <p className="invalid">{errors.email.message || "Invalid value"}</p>
                  )}
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
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
                  {errors.confirmPassword && (
                    <p>{errors.confirmPassword.message || "Invalid value"}</p>
                  )}
                </Form.Group>

                <Button disabled={isSubmitting} type="submit" variant="primary">
                  {isSubmitting ? "Creating account..." : "Create Account"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
