import { useEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import { SubmitHandler, useForm } from "react-hook-form";
import { UpdateProfileType } from "../types/User.types";
import useGetUserDoc from "../hooks/useGetUserDoc";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { Alert } from "react-bootstrap";
import useAddFiles from "../hooks/useAddFiles";
import Navigation from "../components/navigation/Navigation";
import CustomButton from "../components/CustomButton";
import ArrowLeft from "../assets/icons/arrow-left-green.svg";
import { useNavigate } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";

const UpdateProfilePage = () => {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const navigate = useNavigate();

  const {
    currentUser,
    userEmail,
    userName,
    userPhotoUrl,
    reloadUser,
    setDisplayName,
    setEmail,
    setPassword,
    setPhotoUrl,
  } = useAuth();

  const { data: userData, loading } = useGetUserDoc(currentUser?.uid);
  const profile = userData?.[0];
  const { uploadPhotos } = useAddFiles();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    reset,
  } = useForm<UpdateProfileType>();

  useEffect(() => {
    if (userName || profile) {
      reset({
        firstName: profile?.firstName ?? "",
        lastName: profile?.lastName ?? "",
        email: userEmail ?? "",
        dob: profile?.dob ?? "",
        bio: profile?.bio ?? "",
        location: profile?.location ?? "",
      });
    }
  }, [userName, profile, userEmail, reset]);

  const passwordRef = useRef("");
  passwordRef.current = watch("password");

  const userId = userData && userData.length > 0 ? userData[0]._id : null;

  const userDocRef = userId ? doc(db, "users", userId) : null;

  const onUpdate: SubmitHandler<UpdateProfileType> = async (data) => {
    try {
      setIsSubmitting(true);
      setIsError(false);
      setError(null);

      if (userDocRef) {
        if (data.photos.length) {
          const photoFile = data.photos;
          const folder = `profile-pictures/${currentUser?.uid}`;

          try {
            const photoUrls = await uploadPhotos(photoFile, folder);

            if (photoUrls && photoUrls.length > 0) {
              const photoURL = photoUrls[0];
              await setPhotoUrl(photoURL);
              await updateDoc(userDocRef, { photoUrls: photoURL });
            }
          } catch (err) {
            setIsError(true);
            if (err instanceof Error) {
              setError(err.message);
              console.error(err.message);
            } else {
              setError("Something went wrong trying to update profile");
            }
            return;
          }
        }
      }

      if (userDocRef) {
        if (data.firstName !== (userName ?? "")) {
          await setDisplayName(data.firstName);
          await updateDoc(userDocRef, { firstName: data.firstName });
        }

        if (data.lastName !== (profile?.lastName ?? "")) {
          await updateDoc(userDocRef, { lastName: data.lastName });
        }

        if (data.dob !== (profile?.dob ?? "")) {
          await updateDoc(userDocRef, { dob: data.dob });
        }

        if (data.bio !== (profile?.bio ?? "")) {
          await updateDoc(userDocRef, { bio: data.bio });
        }

        if (data.location !== (profile?.location ?? "")) {
          await updateDoc(userDocRef, { location: data.location });
        }
      }

      if (data.email !== (userEmail ?? "")) {
        await setEmail(data.email);
      }

      if (data.password) {
        await setPassword(data.password);
      }

      reloadUser();
    } catch (err) {
      console.error("Error when updating the profile:", err);
      setIsError(true);
    }
    setIsSubmitting(false);

    setIsUpdated(true);
  };

  return (
    <main>
      <div className="main-wrap">
        <Navigation />
        <div className="main-content">
          <div className="inline-buttons">
            <CustomButton
              classes="btn-green overline"
              hasIcon={true}
              iconLeading={true}
              iconSrc={ArrowLeft}
              textValue="Back"
              onClick={() => navigate(-1)}
            />
          </div>

          <div className="shelf-container">
            <h1>Update profile</h1>

            {loading && <LoadingSpinner />}
            {isError && error && <div className="error">{error}</div>}

            <div className="update-profile-form">
              <div className="text-center">
                <div className="user-profile-img-wrap mb-4">
                  <Image
                    src={userPhotoUrl || "https://via.placeholder.com/200"}
                    fluid
                    width={200}
                    className="image"
                    roundedCircle
                  />
                </div>
              </div>

              <Form onSubmit={handleSubmit(onUpdate)} className="mb-3">
                <Form.Group controlId="photos" className="mb-3">
                  <Form.Label className="bold">Photo</Form.Label>
                  <Form.Control
                    className="input-field bg-white"
                    accept="image/gif,image/jpeg,image/png,image/webp"
                    type="file"
                    {...register("photos")}
                  />
                  {errors.photos && (
                    <Alert variant="warning">{errors.photos.message || "Invalid"}</Alert>
                  )}
                </Form.Group>

                <Form.Group controlId="firstName" className="mb-3">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    className="input-field bg-white"
                    autoComplete="name"
                    placeholder="First name"
                    type="text"
                    {...register("firstName")}
                  />
                  {errors.firstName && (
                    <Alert variant="warning">{errors.firstName.message || "Invalid value"}</Alert>
                  )}
                </Form.Group>

                <Form.Group controlId="lastName" className="mb-3">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    className="input-field bg-white"
                    autoComplete="name"
                    placeholder="Last name"
                    type="text"
                    {...register("lastName")}
                  />
                  {errors.lastName && (
                    <Alert variant="warning">{errors.lastName.message || "Invalid value"}</Alert>
                  )}
                </Form.Group>

                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    className="input-field bg-white"
                    autoComplete="email"
                    placeholder="my-email@email.com"
                    type="email"
                    {...register("email", {
                      required: "Please enter an email.",
                    })}
                  />
                  {errors.email && (
                    <Alert variant="warning">{errors.email.message || "Invalid value"}</Alert>
                  )}
                </Form.Group>

                <Form.Group controlId="dob" className="mb-3">
                  <Form.Label>Date of birth</Form.Label>
                  <Form.Control
                    className="input-field bg-white"
                    placeholder="1995-02-20"
                    type="text"
                    {...register("dob", {
                      pattern: {
                        value: /^\d{4}-\d{2}-\d{2}$/,
                        message: "Date must be in the format YYYY-MM-DD",
                      },
                    })}
                  />
                  {errors.dob && (
                    <Alert variant="warning">{errors.dob.message || "Invalid value"}</Alert>
                  )}
                </Form.Group>

                <Form.Group controlId="bio" className="mb-3">
                  <Form.Label>Bio</Form.Label>
                  <Form.Control
                    className="input-field textarea-field bg-white"
                    placeholder="Write something about yourself!"
                    as="textarea"
                    {...register("bio")}
                  />
                  {errors.bio && (
                    <Alert variant="warning">{errors.bio.message || "Invalid value"}</Alert>
                  )}
                </Form.Group>

                <Form.Group controlId="location" className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    className="input-field bg-white"
                    placeholder="City, Country"
                    type="text"
                    {...register("location")}
                  />
                  {errors.location && (
                    <Alert variant="warning">{errors.location.message || "Invalid value"}</Alert>
                  )}
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    className="input-field bg-white"
                    type="password"
                    autoComplete="new-password"
                    {...register("password", {
                      minLength: {
                        message: "Enter at least 6 characters",
                        value: 6,
                      },
                    })}
                  />
                  {errors.password && (
                    <Alert variant="warning">{errors.password.message || "Invalid value"}</Alert>
                  )}
                  <Form.Text>At least 6 characters</Form.Text>
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    className="input-field bg-white"
                    type="password"
                    autoComplete="off"
                    {...register("confirmPassword", {
                      minLength: {
                        message: "Enter at least 6 characters",
                        value: 6,
                      },
                      validate: (value) => {
                        return (
                          !passwordRef.current ||
                          value === passwordRef.current ||
                          "The password does not match, please try again."
                        );
                      },
                    })}
                  />
                  {errors.confirmPassword && (
                    <Alert variant="warning">
                      {errors.confirmPassword.message || "Invalid value"}
                    </Alert>
                  )}
                </Form.Group>

                <Button
                  disabled={isSubmitting}
                  type="submit"
                  variant="primary"
                  className="btn-orange mt-3"
                >
                  {isSubmitting ? "Updating profile..." : "Save"}
                </Button>

                {isUpdated && !isError && (
                  <div className="update-success mt-3">Profile is now updated!</div>
                )}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UpdateProfilePage;
