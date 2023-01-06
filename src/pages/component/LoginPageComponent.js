// import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Spinner from "react-bootstrap/Spinner";
// import { useAuth } from "../../hooks";




// const LoginPageComponent = ({ loginUserApiRequest,reduxDispatch, setReduxUserState  }) => {
//   const { handleLogin, authInfo } = useAuth();


//   const [validated, setValidated] = useState(false);
//   const [loginUserResponseState, setLoginUserResponseState] = useState({
//     success: "",
//     error: "",
//     loading: false,
//   });

//   const navigate = useNavigate();

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     event.stopPropagation();
//     const form = event.currentTarget.elements;

//     const email = form.email.value;
//     const password = form.password.value;
//     const doNotLogout = form.doNotLogout.checked;

//     if (event.currentTarget.checkValidity() === true && email && password) {
//         setLoginUserResponseState({ loading: true });
//         handleLogin(email, password, doNotLogout)
//         .then((res) => {
//             setLoginUserResponseState({ success: res.success, loading: false, error: "" });

//             if (res.userLoggedIn) {
//                 reduxDispatch(setReduxUserState(res.userLoggedIn));
//             }


//             // if (res.success === "user logged in" && !res.userLoggedIn.isAdmin) navigate("/user", { replace: true });
//             // else navigate("/admin/orders", { replace: true });

//         })
//         .catch((er) =>
//           setLoginUserResponseState({ error: er.response.data.message ? er.response.data.message : er.response.data })
//         );
//     }

//     setValidated(true);
//   };
  
//   return (
//     <Container>
//       <Row className="mt-5 justify-content-md-center">
//         <Col md={6}>
//           <h1>Login</h1>
//           <Form noValidate validated={validated} onSubmit={handleSubmit}>
//             <Form.Group className="mb-3" controlId="formBasicEmail">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control
//                 name="email"
//                 required
//                 type="email"
//                 placeholder="Enter email"
//               />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formBasicPassword">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 name="password"
//                 required
//                 type="password"
//                 placeholder="Password"
//               />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formBasicCheckbox">
//               <Form.Check
//                 name="doNotLogout"
//                 type="checkbox"
//                 label="Do not logout"
//               />
//             </Form.Group>

//             <Row className="pb-2">
//               <Col>
//                 Don't you have an account?
//                 <Link to={"/register"}> Register </Link>
//               </Col>
//             </Row>

//             <Button variant="primary" type="submit">
//               {loginUserResponseState &&
//               loginUserResponseState.loading === true ? (
//                 <Spinner
//                   as="span"
//                   animation="border"
//                   size="sm"
//                   role="status"
//                   aria-hidden="true"
//                 />
//               ) : (
//                 ""
//               )}
//               Login
//             </Button>
//             <Alert
//               show={
//                 loginUserResponseState &&
//                 loginUserResponseState.error === "wrong credentials"
//               }
//               variant="danger"
//             >
//               Wrong credentials
//             </Alert>
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default LoginPageComponent;






import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Checkbox } from "antd";
import {
  commonModalClasses,
  commonUserImageModalClasses,
} from "../../utils/theme";
import Container from "../../containers/Container";
import Title from "../../form/Title";
import FormInput from "../../form/FormInput";
import Submit from "../../form/Submit";
import CustomLink from "../../containers/CustomLink";
import { isValidEmail } from "../../utils/helper";
import { useAuth, useNotification } from "../../hooks";
import FormContainer from "../../containers/FormContainer";

const validateUserInfo = ({ email, password }) => {
  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };

  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 6)
    return { ok: false, error: "Password must be 6 characters long!" };

  return { ok: true };
};

export default function LoginPageComponent({ loginUserApiRequest, reduxDispatch,setReduxUserState }) {
  // const reduxDispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    doNotLogout: ""
  });

  const { updateNotification } = useNotification();
  const { handleLogin, authInfo } = useAuth();
  const { isPending, isLoggedIn } = authInfo;

 

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget.elements;

    // const email = form.email.value;
    // const password = form.password.value;
    const doNotLogout = form.doNotLogout.checked;

    const { ok, error } = validateUserInfo(userInfo);

    if (!ok) return updateNotification("error", error)
    
    handleLogin(userInfo.email, userInfo.password, doNotLogout)
    // handleLogin(userInfo.email, userInfo.password, userInfo.doNotLogout);


    // if (userInfo) {
    //   reduxDispatch(setReduxUserState(userInfo));
    // }
  };

  // useEffect(() => {
  //   // we want to move our user to somewhere else
  //   if (isLoggedIn) navigate("/cart-details");
  // }, [isLoggedIn]);

  return (
    <FormContainer>
      <div>
        <div className={commonUserImageModalClasses + " md:flex w-full"}>
          {/* <div className={commonModalUserClasses}>
            <img src="/Login_illustrator.png" alt="Login" />
          </div> */}

          <div className="p-0 m-0">
            <div>
              <Container>
                <div
                  className={
                    commonModalClasses +
                    " font-semibold font-serif text-center text-3xl "
                  }
                >
                  <h2 className="dark:text-white text-primary shadow-light-button">
                    Welcome Back!
                  </h2>
                </div>
                <form
                  onSubmit={handleSubmit}
                  className={
                    commonModalClasses +
                    " w-72 shadow-light-card dark:shadow-md"
                  }
                >
                  <Title>Sign in</Title>
                  <FormInput
                    value={userInfo.email}
                    onChange={handleChange}
                    label="Email"
                    placeholder="john@gmail.com"
                    name="email"
                  />

                  {/* PASSWORD */}
                  <FormInput
                    value={userInfo.password}
                    onChange={handleChange}
                    label="Password"
                    placeholder="********"
                    name="password"
                    type="password"
                  />

                  <Checkbox name="doNotLogout">Remember Me</Checkbox>
                  <Submit value="Sign In" busy={isPending} />

                  <div className="flex justify-between">
                    <CustomLink to="/auth/forget-password">
                      Forget Password
                    </CustomLink>
                    <CustomLink to="/auth/signup">Sign up </CustomLink>
                  </div>
                </form>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </FormContainer>
  );
}
