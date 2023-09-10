import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
  Alert,
} from "@material-tailwind/react";
import Nav from "../components/navigation";
import Head from "next/head";
import Lottie from "lottie-react";

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
      />
    </svg>
  );
}

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [bgAnimationData, setBgAnimationData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [open, setOpen] = React.useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setAlertType("success");
        setShowAlert(true);
        setOpen(true);
        router.push("/admindashboard");
      } else {
        setAlertType("error");
        setShowAlert(true);
        setOpen(true);
        console.log("somethign went wrong", data);
        // alert("something went wrong");
      }
    } catch (error) {
      console.error("error loggin in: ", error);
    }
  };

  useEffect(() => {
    fetch("/bganimation.json")
      .then((response) => response.json())
      .then((data) => setBgAnimationData(data));
  }, []);
  return (
    <>
      <div className="text-gray-800 min-h-screen">
        <Head>
          <title>MedSched.ai</title>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
          />
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
            rel="stylesheet"
          />
        </Head>

        {/* Navbar */}
        <Nav />

        <main className="text-center  relative">
          {bgAnimationData && (
            <div className="absolute inset-0 overflow-hidden h-screen w-screen">
              <Lottie
                animationData={bgAnimationData}
                loop={true}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: -1,
                  height: "100%",
                  minWidth: "100%",
                  height: "auto",
                  width: "auto",
                }}
              />
            </div>
          )}
          <div className="relative h-screen flex flex-col justify-center items-center">
            {showAlert && alertType === "success" && (
              <Alert
                className="w-96 animate__animated animate__fadeInUp"
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 100 },
                }}
                icon={<Icon />}
                color="green"
                open={open}
                onClose={() => setOpen(false)}
              >
                Success
              </Alert>
            )}

            {showAlert && alertType === "error" && (
              <Alert
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 100 },
                }}
                className="w-96 animate__animated animate__fadeInUp"
                icon={<Icon />}
                color="red"
                open={open}
                onClose={() => setOpen(false)}
              >
                Something went wrong {":("}
              </Alert>
            )}
            <div className="mb-24"></div>
            <Card className="w-96">
              <form onSubmit={handleLogin}>
                <CardHeader
                  variant="gradient"
                  color="blue"
                  className="mb-4 grid h-28 place-items-center"
                >
                  <Typography variant="h3" color="white">
                    Sign In
                  </Typography>
                </CardHeader>
                <CardBody className="flex items-start flex-col gap-4">
                  <Input
                    label="Email"
                    size="lg"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <Input
                    label="Password"
                    size="lg"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <div className="-ml-2.5">
                    <Checkbox label="Remember Me" />
                  </div>
                </CardBody>
                <CardFooter className="pt-0">
                  <Button
                    type="submit"
                    variant="gradient"
                    color="blue"
                    fullWidth
                  >
                    Sign In
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </main>

        <footer className="bg-gradient-to-r from-blue-100 via-white to-blue-100 text-gray-800 text-center p-5 animate__animated animate__fadeInUp">
          <p>MedSched.ai &copy; 2023. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
