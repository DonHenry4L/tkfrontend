import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useState, useEffect, useRef, useContext } from "react";
import FormInput from "../../../../form/FormInput";
import Title from "../../../../form/Title";
import { commonModalClasses } from "../../../../utils/theme";
import Submit from "../../../../form/Submit";
import { Avatar } from "antd";
import Media from "../../../../component/admin/media";
import { MediaContext } from "../../../../context/Media";

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

  const [picture, setPicture] = useState({});
  const [media, setMedia] = useContext(MediaContext);

  useEffect(() => {
    fetchUser(userInfo._id)
      .then((data) => setUser(data))
      .catch((er) => console.log(er));
  }, [userInfo._id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;

    const first_name = form.first_name.value;
    const last_name = form.last_name.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const country = form.country.value;
    const city = form.city.value;
    const state = form.state.value;
    const password = form.password.value;
    // const picture = form.picture.value;

    if (event.currentTarget.checkValidity() === true) {
      updateUserApiRequest(
        first_name,
        last_name,
        phone,
        address,
        country,
        city,
        state,
        password,
        {
          picture: media?.selected?._id
            ? media?.selected?._id
            : picture?._id
            ? picture?._id
            : undefined,
        }
      )
        .then((data) => {
          setUpdateUserResponseState({ success: data.success, error: "" });
          reduxDispatch(setReduxUserState({ ...data.userUpdated }));
          setPicture(data.picture);
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

                      {/* {authInfo?.profile?.role === "Subscriber" && <Media />} */}
                      <Media />
                    </Container>
                    <Container>
                      {/* SECOND COL */}
                      {/* <div className="w-full font-semibold underline text-lg dark:text-white text-primary text-center">
                    <p>Other Required Information</p>
                  </div> */}
                      <div>
                        <div className="grid grid-cols-2 gap-4">
                          <FormInput
                            //   value={address}
                            //   onChange={handleChange}
                            label="Address"
                            placeholder="Your Address"
                            name="address"
                            defaultValue={user.address}
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
                            name="city"
                            defaultValue={user.city}
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
                      <div style={{ marginBottom: 20, textAlign: "center" }}>
                        {media.selected ? (
                          <>
                            <div style={{ marginBottom: 15 }}></div>
                            <Avatar src={media.selected.url} size={100} />
                          </>
                        ) : picture ? (
                          <>
                            <div style={{ marginBottom: 15 }}></div>
                            <Avatar src={picture.url} size={100} />
                          </>
                        ) : (
                          ""
                        )}
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

// import React, { useState, useEffect, useContext } from "react";
// import { Row, Col, Button, Input, Checkbox, Select, Avatar } from "antd";
// import axios from "axios";
// import { useAuth, useNotification } from "../../../../hooks";
// import { getToken } from "../../../../utils/helper";
// import { MediaContext } from "../../../../context/Media";
// import Media from "../../../../component/admin/media";
// // import Media from "../admin/media";
// import "../../../../antdesign/antdist.css";
// import { useDispatch } from "react-redux";
// import { setReduxUserState } from "../../../redux/actions/userActions";
// import Container from "../../../../containers/Container";

// const UserProfilePageComponent = () => {
//   // context
//   const { authInfo } = useAuth();
//   const [media, setMedia] = useContext(MediaContext);
//   // state
//   const [ids, setIds] = useState("");
//   const [first_name, setFirst_name] = useState("");
//   const [last_name, setLast_name] = useState("");
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [website, setWebsite] = useState("");
//   const [password, setPassword] = useState();
//   const [role, setRole] = useState("");

//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");

//   const [picture, setPicture] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [country, setCountry] = useState("");

//   const { updateNotification } = useNotification();
//   const reduxDispatch = useDispatch();

//   useEffect(() => {
//     const currentUser = async (id) => {
//       try {
//         const { data } = await axios.get("/api/users/profile/" + id);
//         console.log("current_user", data);
//         setIds(data._id);
//         setFirst_name(data.first_name);
//         setLast_name(data.last_name);
//         setUsername(data.username);
//         setEmail(data.email);
//         setWebsite(data.website);
//         setRole(data.role);
//         setPhone(data.phone);
//         setAddress(data.address);
//         setState(data.state);
//         setCity(data.city);
//         setCountry(data.country);
//         setPicture(data.picture);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     currentUser();
//   }, []);

//   // function
//   const handleSubmit = async (e) => {
//     const token = getToken();
//     const config = {
//       headers: {
//         authorization: "Bearer " + token,
//       },
//     };
//     e.preventDefault();
//     try {
//       const { data } = await axios.put(
//         "/api/users/profile",
//         {
//           ids,
//           first_name,
//           last_name,
//           email,
//           password,
//           website,
//           role,
//           phone,
//           address,
//           country,
//           city,
//           state,
//           picture: media?.selected?._id
//             ? media?.selected?._id
//             : picture?._id
//             ? picture?._id
//             : undefined,
//         },
//         config
//       );
//       // console.log("update_user", data);

//       if (data?.error) {
//         updateNotification("error", data.error);
//       } else {
//         // udpate context and local storage for current user only
//         if (authInfo?.profile?._id === data._id) {
//           // setAuth({ ...auth, user: data });
//           let fromLocalStorage = JSON.parse(localStorage.getItem("userInfo"));
//           fromLocalStorage.user = data;
//           reduxDispatch(setReduxUserState({ ...data.userUpdated }));
//           localStorage.setItem("userInfo", JSON.stringify(fromLocalStorage));
//           sessionStorage.setItem(
//             "userInfo",
//             JSON.stringify({ ...data.userUpdated })
//           );
//         }

//         updateNotification("success", "User updated successfully");
//       }
//     } catch (err) {
//       console.log(err);
//       updateNotification("error", "User update failed. Try again.");
//       setLoading(false);
//     }
//   };

//   // show form
//   return (
//     <Row>
//       <Col span={12} offset={3}>
//         <h4 style={{ marginBottom: "-10px" }}>Profile update</h4>

//         <div style={{ marginBottom: 20, textAlign: "center" }}>
//           {media.selected ? (
//             <>
//               <div style={{ marginBottom: 15 }}></div>
//               <Avatar src={media.selected.url} size={100} />
//             </>
//           ) : picture ? (
//             <>
//               <div style={{ marginBottom: 15 }}></div>
//               <Avatar src={picture.url} size={100} />
//             </>
//           ) : (
//             ""
//           )}
//         </div>

//         {/* {authInfo?.profile?.role === "Subscriber" && <Media />} */}
//         <Media />
//         <div className="flex grid-cols-2 gap-4">
//           <Input
//             id="first_name"
//             style={{ margin: "20px 0px 10px 0px" }}
//             size="large"
//             placeholder="First name"
//             value={first_name}
//             onChange={(e) => setFirst_name(e.target.value)}
//           />
//           <Input
//             style={{ margin: "20px 0px 10px 0px" }}
//             size="large"
//             placeholder="Last name"
//             value={last_name}
//             onChange={(e) => setLast_name(e.target.value)}
//           />
//         </div>
//         <div className="flex grid grid-cols-2 gap-4">
//           <Input
//             style={{ margin: "10px 0px 10px 0px" }}
//             size="large"
//             placeholder="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />

//           <Input
//             style={{ margin: "10px 0px 10px 0px" }}
//             size="large"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <Input
//           style={{ margin: "10px 0px 10px 0px" }}
//           size="large"
//           placeholder="Website"
//           value={website}
//           onChange={(e) => setWebsite(e.target.value)}
//         />

//         <Input.Password
//           style={{ margin: "10px 0px 10px 0px" }}
//           size="large"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         {/* {page === "admin" && (
//           <Select
//             value={role}
//             style={{ margin: "10px 0px 10px 0px", width: "100%" }}
//             onChange={(e) => setRole(e)}
//           >
//             <Select.Option value="Subscriber">Subscriber</Select.Option>
//             <Select.Option value="Author">Author</Select.Option>
//             <Select.Option value="Admin">Admin</Select.Option>
//           </Select>
//         )} */}
//         <Input
//           style={{ margin: "10px 0px 10px 0px" }}
//           size="large"
//           placeholder="phone"
//           value={phone}
//           type="number"
//           onChange={(e) => setPhone(e.target.value)}
//         />
//         <Container>
//           <div>
//             <div className="grid grid-cols-2 gap-4">
//               <Input
//                 style={{ margin: "10px 0px 10px 0px" }}
//                 size="large"
//                 placeholder="Country"
//                 value={country}
//                 type="country"
//                 onChange={(e) => setCountry(e.target.value)}
//               />
//               <Input
//                 style={{ margin: "10px 0px 10px 0px" }}
//                 size="large"
//                 type="address"
//                 placeholder="Address"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//               />
//               <Input
//                 style={{ margin: "10px 0px 10px 0px" }}
//                 size="large"
//                 type="city"
//                 placeholder="City"
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//               />
//               <Input
//                 style={{ margin: "10px 0px 10px 0px" }}
//                 size="large"
//                 type="state"
//                 placeholder="State"
//                 value={state}
//                 onChange={(e) => setState(e.target.value)}
//               />
//             </div>
//           </div>
//         </Container>
//         <Button
//           onClick={handleSubmit}
//           type="primary"
//           style={{ margin: "10px 0px 10px 0px" }}
//           loading={loading}
//           block
//         >
//           Update
//         </Button>
//       </Col>
//     </Row>
//   );
// };

// export default UserProfilePageComponent;
