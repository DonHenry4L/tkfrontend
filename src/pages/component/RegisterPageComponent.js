import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../api/auth";
import Container from "../../containers/Container";
import CustomLink from "../../containers/CustomLink";
import FormContainer from "../../containers/FormContainer";
import FormInput from "../../form/FormInput";
import Submit from "../../form/Submit";
import Title from "../../form/Title";
import { useAuth, useNotification } from "../../hooks";
import { isValidEmail } from "../../utils/helper";
import {
  commonModalClasses,
  commonModalUserClasses,
  commonUserImageModalClasses,
} from "../../utils/theme";
import DateOfBirthSelect from "../../form/DateOfBirthSelect";
import GenderSelect from "../../form/GenderSelect";

// VALIDATION //
const validateUserInfo = ({
  last_name,
  first_name,
  email,
  password,
  address,
  country,
  city,
  state,
  phone,
}) => {
  const isValidName = /^[a-z A-Z]+$/;
  const isValidPhone = /^[0-9]/;

  if (!last_name.trim()) return { ok: false, error: "Last name is missing!" };
  if (!first_name.trim()) return { ok: false, error: "First name is missing!" };
  if (!isValidName.test(first_name, last_name))
    return { ok: false, error: "Invalid name!" };
  if (!isValidPhone.test(phone))
    return { ok: false, error: "Invalid Phone Number!" };

  if (!address.trim()) return { ok: false, error: "address is missing!" };
  if (!country.trim()) return { ok: false, error: "Country is missing!" };
  if (!city.trim()) return { ok: false, error: "City is missing!" };
  if (!state.trim()) return { ok: false, error: "State is missing!" };

  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };

  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 6)
    return { ok: false, error: "Password must be 6 characters long!" };

  return { ok: true };
};

export default function RegisterPageComponent() {
  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    country: "",
    city: "",
    state: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: "",
  });
  const [dateError, setDateError] = useState("");
  const [genderError, setGenderError] = useState("");

  const navigate = useNavigate();
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;

  const { updateNotification } = useNotification();

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);

    if (!ok) return updateNotification("error", error);

    let current_date = new Date();
    let picked_date = new Date(bYear, bMonth - 1, bDay);
    let atleast14 = new Date(1970 + 14, 0, 1);
    let noMoreThan100 = new Date(1970 + 100, 0, 1);
    if (current_date - picked_date < atleast14) {
      updateNotification(
        "error",
        "it looks like you're below 14yrs,...Please make sure that you use your real date of birth."
      );
    } else if (current_date - picked_date > noMoreThan100) {
      updateNotification(
        "error",
        "it looks like you're above 100yrs,...Please make sure that you use your real date of birth."
      );
    } else if (gender === "") {
      updateNotification("error", "What is your Gender");
      updateNotification(
        "error",
        "Please choose a gender. You can change who can see this later."
      );
    } else {
      setDateError("");
      setGenderError("");
    }

    const response = await createUser(userInfo);
    if (response.error) return updateNotification("error", response.error);

    navigate("/auth/verification", {
      state: { user: response.user },
      replace: true,
    });
  };

  useEffect(() => {
    // we want to move our user to somewhere else
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  const {
    first_name,
    last_name,
    email,
    phone,
    address,
    country,
    city,
    state,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = userInfo;
  const yearTemp = new Date().getFullYear();

  const years = Array.from(new Array(108), (val, index) => yearTemp - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);

  return (
    <FormContainer className="">
      <div className="">
        <div className={commonUserImageModalClasses + " md:flex w-full "}>
          <div>
            <div className="">
              <Container className="sign__up">
                <form
                  onSubmit={handleSubmit}
                  className={
                    commonModalClasses +
                    " w-full shadow-light-card dark:shadow-md"
                  }
                >
                  <Title className="sign_upp">Sign Up</Title>
                  <div className="md:grid md:grid-cols-2">
                    <Container className="">
                      <div className="grid">
                        <div className="grid grid-cols-2 gap-4 register_bars">
                          <FormInput
                            value={first_name}
                            onChange={handleChange}
                            label="First Name"
                            placeholder="John"
                            name="first_name"
                          />
                          <FormInput
                            value={last_name}
                            onChange={handleChange}
                            label="Last Name"
                            placeholder="Doe"
                            name="last_name"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <FormInput
                            value={email}
                            onChange={handleChange}
                            label="Email"
                            placeholder="john@gmail.com"
                            name="email"
                          />
                          {/* password */}
                          <FormInput
                            value={password}
                            onChange={handleChange}
                            label="Password"
                            placeholder="********"
                            name="password"
                            type="password"
                          />
                        </div>
                        {/* Gender Select */}
                        <div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-transparent rounded text-lg outline-none dark:border-dark-subtle border-light-subtle p-1 dark:text-white text-primary -mt-1">
                              <div className="reg_line_header dark:text-dark-subtle text-gray-500 ">
                                Gender <i className="info_icon"></i>
                              </div>

                              <GenderSelect
                                handleOnChange={handleChange}
                                genderError={genderError}
                              />
                            </div>
                          </div>
                        </div>
                        {/* END Gender Select */}
                        {/* DATE OF BIRTH */}
                        <div
                          style={{
                            position: "relative",
                            alignSelf: "flex-start",
                            marginBottom: "10px",
                            padding: "0 10px",
                          }}
                          className="bg-transparent rounded border-2 w-full text-lg outline-none dark:border-dark-subtle border-light-subtle p-1 dark:text-white text-primary peer transition mt-4"
                        >
                          <label
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "2px",
                            }}
                            className="reg_line_header flex items-center space-x-2 font-semibold dark:text-dark-subtle text-light-subtle dob__label"
                          >
                            Date of birth <i className="info_icon"></i>
                          </label>
                          <DateOfBirthSelect
                            bDay={bDay}
                            bMonth={bMonth}
                            bYear={bYear}
                            days={days}
                            months={months}
                            years={years}
                            handleOnChange={handleChange}
                            dateError={dateError}
                          />
                        </div>
                      </div>
                    </Container>
                    <Container>
                      <div>
                        {/** TO DO: make image transparent when on smaller screen */}
                        {/* <img
                          src="../pic/signup_pic.gif"
                          alt=""
                          className=" h-96"
                        /> */}
                      </div>
                    </Container>
                  </div>
                  <div className="w-full font-semibold underline text-lg dark:text-white text-primary text-center mt-3 animate-pulse">
                    <p>
                      We recommend You to update your Profile after registration
                    </p>
                  </div>
                  <Submit value="Create Account" />

                  <div className="flex justify-between">
                    <CustomLink to="/auth/signin">Sign in </CustomLink>
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
