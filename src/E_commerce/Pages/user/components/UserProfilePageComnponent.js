import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import FormInput from "../../../../form/FormInput";
import Title from "../../../../form/Title";
import { commonModalClasses } from "../../../../utils/theme";
import Submit from "../../../../form/Submit";

const UserProfilePageComponent = ({
  updateUserApiRequest,
  fetchUser,
  userInfoFromRedux,
  setReduxUserState,
  reduxDispatch,
  localStorage,
  sessionStorage,
}) => {
  const [validated, setValidated] = useState(false);
  const [updateUserResponseState, setUpdateUserResponseState] = useState({
    success: "",
    error: "",
  });

  const [user, setUser] = useState({});
  const userInfo = userInfoFromRedux;

  const [loadImage, setLoadImage] = useState("");
  const [file, setFiles] = useState(null);

  useEffect(() => {
    fetchUser(userInfo.id)
      .then((data) => setUser(data))
      .catch((er) => console.log(er));
  }, [userInfo.id]);

  const fileHandle = (e) => {
    if (e.target.files.length !== 0) {
      setFiles({
        ...file,
        [e.target.name]: e.target.files[0],
      });
    }
    const reader = new FileReader();
    reader.onload = () => {
      setLoadImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;

    const first_name = form.first_name.value;
    const last_name = form.last_name.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const lga = form.lga.value;
    const country = form.country.value;
    const nationality = form.nationality.value;
    const town = form.town.value;
    const state = form.state.value;
    const password = form.password.value;
    const picture = form.picture.value;

    if (event.currentTarget.checkValidity() === true) {
      updateUserApiRequest(
        first_name,
        last_name,
        email,
        phone,
        lga,
        country,
        nationality,
        town,
        state,
        password,
        picture
      )
        .then((data) => {
          setUpdateUserResponseState({ success: data.success, error: "" });
          reduxDispatch(setReduxUserState({ ...data.userUpdated }));
          localStorage.setItem(
            "userInfo",
            JSON.stringify({ ...data.userUpdated })
          );
          sessionStorage.setItem(
            "userInfo",
            JSON.stringify({ ...data.userUpdated })
          );
        })
        .catch((err) =>
          setUpdateUserResponseState({
            error: err.response.data.message
              ? err.response.data.message
              : err.response.data,
          })
        );
    }

    setValidated(true);
  };
  return (
    <div className="xs:h-full">
      <div>
        <div>
          <div>
            <div className="">
              <Container className="">
                <Form
                  onSubmit={handleSubmit}
                  className={
                    commonModalClasses +
                    " w-full shadow-light-card dark:shadow-md"
                  }
                >
                  <Title>Edit My Profile</Title>
                  <div className="md:grid md:grid-cols-2">
                    <Container className="">
                      <div className="grid">
                        <div className="grid grid-cols-2 gap-4">
                          <FormInput
                            //   value={first_name}
                            //   onChange={handleChange}
                            label="First Name"
                            // placeholder="John"
                            name="first_name"
                            defaultValue={user.first_name}
                          />
                          <FormInput
                            //   value={last_name}
                            //   onChange={handleChange}
                            label="Last Name"
                            placeholder="Doe"
                            name="last_name"
                            defaultValue={user.last_name}
                          />
                        </div>
                        <FormInput
                          // value={email}
                          //   value="you can't change EMAIL, else create new account with new email address"
                          // onChange={handleChange}
                          label="Email"
                          // disabled
                          // placeholder="johndoe@examples.com"
                          name="email"
                          //   className="text-xs text-gray-400"
                          defaultValue={user.email}
                        />
                        <FormInput
                          // value={phone}
                          // onChange={handleChange}
                          label="Phone"
                          placeholder="(+234) 806 +++"
                          name="phone"
                          type="number"
                          defaultValue={user.phone}
                        />
                        {/* password */}
                        <FormInput
                          // value={password}
                          // onChange={handleChange}
                          label="Password"
                          placeholder="********"
                          name="password"
                          type="password"
                        />
                      </div>
                      <div className="form-group">
                        <div className="file-image">
                          <div className="image">
                            {loadImage ? <img src={loadImage} /> : ""}
                          </div>
                          <div className="file">
                            <label
                              htmlFor="picture"
                              className="text-gray-500 font-semibold"
                            >
                              Select Image
                            </label>
                            <FormInput
                              type="file"
                              onChange={fileHandle}
                              name="picture"
                              className="form-control"
                              id="picture"
                            />
                          </div>
                        </div>
                      </div>
                    </Container>
                    <Container>
                      {/* SECOND COL */}
                      {/* <div className="w-full font-semibold underline text-lg dark:text-white text-primary text-center">
                    <p>Other Required Information</p>
                  </div> */}
                      <div>
                        <div className="grid grid-cols-2 gap-4">
                          <FormInput
                            //   value={nationality}
                            //   onChange={handleChange}
                            label="Nationality"
                            placeholder="African"
                            name="nationality"
                            defaultValue={user.nationality}
                          />
                          <FormInput
                            //   value={country}
                            //   onChange={handleChange}
                            label="Country"
                            placeholder="Country"
                            name="country"
                            defaultValue={user.country}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <FormInput
                            //   value={town}
                            //   onChange={handleChange}
                            label="City"
                            placeholder="City"
                            name="town"
                            defaultValue={user.town}
                          />
                          <FormInput
                            //   value={lga}
                            //   onChange={handleChange}
                            label="L.G.A"
                            placeholder="Local Government"
                            name="lga"
                            defaultValue={user.lga}
                          />
                        </div>

                        <FormInput
                          // value={state}
                          // onChange={handleChange}
                          label="State"
                          placeholder="State"
                          name="state"
                          defaultValue={user.state}
                        />
                      </div>
                    </Container>
                  </div>

                  <Submit value="Update Profile" />
                </Form>
                <Alert
                  show={
                    updateUserResponseState &&
                    updateUserResponseState.error !== ""
                  }
                  variant="danger"
                >
                  Something went wrong
                </Alert>
                <Alert
                  show={
                    updateUserResponseState &&
                    updateUserResponseState.success === "user updated"
                  }
                  variant="info"
                >
                  User Updated
                </Alert>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePageComponent;
