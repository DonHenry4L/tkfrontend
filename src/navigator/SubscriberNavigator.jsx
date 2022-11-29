import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import client from "../api/client";
import AllPosts from "../component/admin/post/AllPosts";
import NewPost from "../component/admin/post/NewPost";
import Posts from "../component/admin/post/Posts";
import SinglePost from "../component/admin/post/SinglePost";
import ChatSignIn from "../component/messenger/auth/ChatSignIn";
import ChatSignUp from "../component/messenger/auth/ChatSignUp";
import Messenger from "../component/messenger/Messenger";
import ProtectRoute from "../component/messenger/ProtectRoute";
import NotFound from "../component/NotFound";
import Header from "../component/subscriber/Header";
import SubscriberDashboard from "../component/subscriber/SubscriberDashboard";
import { useAuth, useNotification } from "../hooks";
import SubscriberNavbar from "../pages/admin/nav/SubscriberNavbar";
// import SearchMovies from "../components/admin/SearchMovies";
// import SubscriberComment from "../components/admin/comment/SubscriberComment";
import { getToken } from "../utils/helper";

export default function SubscriberNavigator() {
  const [loading, setLoading] = useState(false);
  const { updateNotification } = useNotification();
  const navigate = useNavigate();
  const { authInfo } = useAuth();
  const isSubscriber = authInfo.profile?.role === "Subscriber";

  const getCurrentSubscriber = async () => {
    const token = getToken();
    try {
      const { data } = await client("/current-subscriber", {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      console.log(data);
      setLoading(false);
    } catch (error) {
      updateNotification("error", error);
      navigate("/");
    }
  };

  useEffect(() => {
    if (isSubscriber) getCurrentSubscriber();
  }, [isSubscriber]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center dark:bg-primary bg-white">
        <p className="text-light-subtle dark:text-dark-subtle animate-pulse">
          Loading Please wait...
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex dark:bg-primary bg-white">
        <SubscriberNavbar />
        <div className="flex-1 max-w-screen-xl">
          <Header />
          <Routes>
            <Route path="/" element={<SubscriberDashboard />} />
            <Route
              path="/tksarlchat"
              element={
                <ProtectRoute>
                  <Messenger />
                </ProtectRoute>
              }
            />
            <Route path="/subscriber/posts/new" element={<NewPost />} />
            <Route path="/subscriber/posts" element={<Posts />} />
            <Route path="/posts" element={<AllPosts />} />
            <Route path="/post/:slug" element={<SinglePost />} />
            <Route path="/tksarl_signIn" element={<ChatSignIn />} />
            <Route path="/tksarl_signUp" element={<ChatSignUp />} />
            {/* 
            <Route path="/search" element={<SearchMovies />} />
            <Route path="/subscriber/comment" element={<SubscriberComment />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
