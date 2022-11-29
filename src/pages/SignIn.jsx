import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaRegUser } from "react-icons/fa";
import { isValidEmail } from "../utils/helper";
import { useAuth, useNotification } from "../hooks";
import FormContainer from "../containers/FormContainer";
import {
  commonModalClasses,
  commonModalUserClasses,
  commonUserImageModalClasses,
} from "../utils/theme";
import Container from "../containers/Container";
import Title from "../form/Title";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import CustomLink from "../containers/CustomLink";

const validateUserInfo = ({ email, password }) => {
  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };

  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 6)
    return { ok: false, error: "Password must be 6 characters long!" };

  return { ok: true };
};

export default function Signin() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
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
    const { ok, error } = validateUserInfo(userInfo);

    if (!ok) return updateNotification("error", error);
    handleLogin(userInfo.email, userInfo.password);
  };

  // useEffect(() => {
  //   // we want to move our user to somewhere else
  //   if (isLoggedIn) navigate("/");
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

{
  /* <Container>
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
            commonModalClasses + " w-72 shadow-light-card dark:shadow-md"
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
          {/* password */
}
//     <FormInput
//       value={userInfo.password}
//       onChange={handleChange}
//       label="Password"
//       placeholder="********"
//       name="password"
//       type="password"
//     />
//     <Submit value="Sign In" busy={isPending} />

//     <div className="flex justify-between">
//       <CustomLink to="/auth/forget-password">Forget Password</CustomLink>
//       <CustomLink to="/auth/signup">Sign up </CustomLink>
//     </div>
//   </form>
// </Container>*/}
