import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ConfirmPassword from "./component/auth/ConfirmPassword";
import EmailVerification from "./component/auth/EmailVerification";
import ForgetPassword from "./component/auth/ForgetPassword";
import Navbar from "./component/user/Navbar";
import SinglePostSlug from "./component/user/SinglePostSlug";
import FooterComponent from "./E_commerce/FooterComponent";
import CartPage from "./E_commerce/Pages/CartPage";
import HomePage from "./E_commerce/Pages/HomePage";
import ProductDetailsPage from "./E_commerce/Pages/ProductDetailsPage";
import ProductListPage from "./E_commerce/Pages/ProductListPage";
import RoutesWithUserChatComponent from "./E_commerce/Pages/user/RoutesWithUserChatComponent";
import UserCartDetailsPage from "./E_commerce/Pages/user/UserCartDetailsPage";
import UserOrdersPage from "./E_commerce/Pages/user/UserOrdersPage";
import UserProfilePage from "./E_commerce/Pages/user/UserProfilePage";
import ProtectedRoutesComponent from "./E_commerce/ProtectedRoutesComponent";
import E_home from "./e_commerceComponent/pages/E_home";
import { useAuth } from "./hooks";
import AdminNavigator from "./navigator/AdminNavigator";
import AuthorNavigator from "./navigator/AuthorNavigator";
import SubscriberNavigator from "./navigator/SubscriberNavigator";
import Home from "./pages/Home";
import Signin from "./pages/SignIn";
import Signup from "./pages/SignUp";
import ScrollTop from "./E_commerce/utils/ScrollTop";

function App() {
  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);

  const { authInfo } = useAuth();
  const isAdmin = authInfo.profile?.role === "Admin";
  const isAuthor = authInfo.profile?.role === "Author";
  const isSubscriber = authInfo.profile?.role === "Subscriber";

  if (isAdmin) {
    return <AdminNavigator />;
  } else if (isAuthor) {
    return <AuthorNavigator />;
  } else if (isSubscriber) {
    return <SubscriberNavigator />;
  } else
    return (
      <>
        <Navbar />
        <ScrollTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/signin" element={<Signin />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/verification" element={<EmailVerification />} />
          <Route path="/auth/forget-password" element={<ForgetPassword />} />
          <Route path="/auth/reset-password" element={<ConfirmPassword />} />
          <Route path="/post/:slug" element={<SinglePostSlug />} />
          {/* E_Commerce */}
          <Route path="/shop" element={<HomePage />} />
          <Route element={<RoutesWithUserChatComponent admin={true}/>}>
            <Route path="/product-list" element={<ProductListPage />} />

            <Route
              path="/product-details/:id"
              element={<ProductDetailsPage />}
            />
            <Route path="/cart" element={<CartPage />} />
            {/* E_Commerce User Pages */}
            {/* <Route element={<ProtectedRoutesComponent />}> */}
              <Route path="/user" element={<UserProfilePage />} />
              <Route path="/user/my-orders" element={<UserOrdersPage />} />
              <Route
                path="/user/cart-details"
                element={<UserCartDetailsPage />}
              />
              {/* <Route path="/user/order-details" element={<UserOrdersPage />} /> */}
            {/* </Route> */}
          </Route>
        </Routes>
      </>
    );
}

export default App;
