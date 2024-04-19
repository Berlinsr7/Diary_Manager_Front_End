import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Button, Form } from "react-bootstrap";
import AxiosService from "../utils/AxiosService";
import ApiRoutes from "../utils/ApiRoutes";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const SignUp = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const navigate = useNavigate();
  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const errors = {}

    try {
      const formData = new FormData(e.target);
      const formProps = Object.fromEntries(formData);
      console.log(formProps)

      if (!/\S+@\S+\.\S+/.test(formProps.email)) {
        errors.email = "Email is not valid";
      }
      if (!formProps.password) {
        errors.password = "Password is required";
      }

      console.log(errors)
      if (
        !errors.hasOwnProperty("email") &&
        !errors.hasOwnProperty("password")
      ) {
        let users = await AxiosService.get(`${ApiRoutes.USER.path}`, {
          authenticate: false,
        });
        var fetchedUsers = users.data.users;

        const userExist = fetchedUsers.find(
          (user) => user.email === formProps.email
        );
        if (!userExist) {
          var len = fetchedUsers.length;
          if (len == 0) {
            formProps.userId = 1;
          } else {
            formProps.userId = len + 1;
          }

          let res = await AxiosService.post(
            `${ApiRoutes.USER.path}`,
            formProps,
            {
              authenticate: false,
            }
          );
          toast.success("User Created Successfully");
          navigate("/login");
        } else {
          toast.error("User Already Exist");
        }
      } else if (formProps.email == "") {
        toast.error("Email should not be empty");
      } 
      else if (formProps.userName == "") {
        toast.error("Name should not be empty");
      }else if (formProps.password == "") {
        toast.error("Password should not be empty");
      }
       else {
        toast.error("Invalid Credentials");
      }
    } catch (error) {
      console.error("Error Creating User: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      {loading && <Spinner />}
      <div className="loginWrapper">
        <h3>Create New User</h3>
        <Form onSubmit={handleCreate}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your Name"
              name="userName"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Create User
          </Button>
        </Form>
      </div>
    </>
  );
};

export default SignUp;
