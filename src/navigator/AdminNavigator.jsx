import React from "react";
import { Route, Routes } from "react-router-dom";
// import Categories from "../component/pages/admin/categories/Category";
import AdminNav from "../pages/admin/nav/AdminNav";
import Dashboard from "../pages/admin/Dashboard";
import Header from "../pages/admin/Header";
import Categories from "../component/admin/Categories";
import NewPost from "../component/admin/post/NewPost";
import Posts from "../component/admin/post/Posts";
import AllPosts from "../component/admin/post/AllPosts";
import MediaLibrary from "../component/admin/media/MediaLibrary";
import Media from "../component/admin/media";
import Messenger from "../component/messenger/Messenger";
import ChatSignIn from "../component/messenger/auth/ChatSignIn";
import ChatSignUp from "../component/messenger/auth/ChatSignUp";
import SinglePost from "../component/admin/post/SinglePost";
import ProtectRoute from "../component/messenger/ProtectRoute";
import AdminUsersPage from "../E_commerce/Pages/admin/AdminUsersPage";
import AdminEditUserPage from "../E_commerce/Pages/admin/AdminEditUserPage";
import AdminProductPage from "../E_commerce/Pages/admin/AdminProductPage";
import AdminCreateProduct from "../E_commerce/Pages/admin/AdminCreateProduct";
import AdminEditProduct from "../E_commerce/Pages/admin/AdminEditProduct";
import AdminOrders from "../E_commerce/Pages/admin/AdminOrders";
import AdminOrderDetails from "../E_commerce/Pages/admin/AdminOrderDetails";
import AdminChat from "../E_commerce/Pages/admin/AdminChat";
import AdminAnalitics from "../E_commerce/Pages/admin/AdminAnalitics";
import Create_E_Category from "../E_commerce/Pages/admin/Create_E_Category";

function AdminNavigator() {
  return (
    <>
      <div className="flex dark:bg-primary bg-white">
        <AdminNav />
        <div className="flex-1 max-w-screen-xl">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/tksarlchat"
              element={
                <ProtectRoute>
                  <Messenger />
                </ProtectRoute>
              }
            />
            <Route path="/tksarl_signIn" element={<ChatSignIn />} />
            <Route path="/tksarl_signUp" element={<ChatSignUp />} />
            <Route path="/admin/posts" element={<Posts />} />
            <Route path="/admin/posts/new" element={<NewPost />} />
            <Route path="/posts" element={<AllPosts />} />
            <Route path="/post/:slug" element={<SinglePost />} />
            <Route path="/admin/media/library" element={<MediaLibrary />} />
            <Route path="/admin/media/new" element={<Media />} />
            <Route path="/admin/posts/categories" element={<Categories />} />
            {/* E_Commerce for Admin */}
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/edit-user" element={<AdminEditUserPage />} />
            <Route path="/admin/products" element={<AdminProductPage />} />
            <Route
              path="/admin/create-new-product"
              element={<AdminCreateProduct />}
            />
            <Route
              path="/admin/create-category"
              element={<Create_E_Category />}
            />
            <Route path="/admin/edit-product" element={<AdminEditProduct />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route
              path="/admin/orders-details"
              element={<AdminOrderDetails />}
            />
            <Route path="/admin/chats" element={<AdminChat />} />
            <Route path="/admin/analytics" element={<AdminAnalitics />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default AdminNavigator;
