import React from "react";

export default function AuthorNavigator() {
  return (
    <div>
      <div>If you're seeing this page,</div>
      <span>That means that you're an author</span>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import { Route, Routes, useNavigate } from "react-router-dom";
// import Actors from "../components/admin/Actors";
// import Categories from "../components/admin/categories/Categories";
// // import Categories from "../components/admin/Categories";
// // import Comments from "../components/admin/Comments";
// // import AuthorDashboard from "../components/AuthorDashboard";
// import Header from "../components/admin/Header";
// import Media from "../components/admin/media";
// import MediaLibrary from "../components/admin/media/MediaLibrary";
// import Movies from "../components/admin/Movies";
// import MovieUpload from "../components/admin/MovieUpload";
// import AllPosts from "../components/admin/post/AllPosts";
// import NewUser from "../components/admin/users/NewUser";
// import SinglePost from "../components/admin/post/SinglePost";
// import SearchMovies from "../components/admin/SearchMovies";
// import ActorUpload from "../components/modals/ActorUpload";
// import NotFound from "../components/NotFound";
// import AuthorNavbar from "../components/admin/nav/AuthorNavbar";
// import { useAuth, useNotification } from "../hooks";
// import client from "../api/client";
// import { getToken } from "../utils/helper";
// import AuthorDashboard from "../components/AuthorDashBoard";
// import NewPost from "../components/author/NewPostAuthor";
// import Posts from "../components/author/Posts";
// import AuthorComments from "../components/admin/comment/AuthorComments";

// export default function AuthorNavigator() {
//   const [loading, setLoading] = useState(false);
//   const [showMovieUploadModal, setShowMovieUploadModal] = useState(false);
//   const [showActorUploadModal, setShowActorUploadModal] = useState(false);

//   const { updateNotification } = useNotification();
//   const navigate = useNavigate();
//   const { authInfo } = useAuth();
//   const isAuthor = authInfo.profile?.role === "Author";

//   const getCurrentAuthor = async () => {
//     const token = getToken();
//     try {
//       const { data } = await client("/current-author", {
//         headers: {
//           authorization: "Bearer " + token,
//         },
//       });
//       console.log(data);
//       setLoading(false);
//     } catch (error) {
//       updateNotification("error", error);
//       navigate("/");
//     }
//   };

//   useEffect(() => {
//     if (isAuthor) getCurrentAuthor();
//   }, [isAuthor]);

//   if (loading) {
//     return (
//       <div className="h-screen flex justify-center items-center dark:bg-primary bg-white">
//         <p className="text-light-subtle dark:text-dark-subtle animate-pulse">
//           Loading Please wait...
//         </p>
//       </div>
//     );
//   }

//   const displayMovieUploadModal = () => {
//     setShowMovieUploadModal(true);
//   };
//   const hideMovieUploadModal = () => {
//     setShowMovieUploadModal(false);
//   };
//   const displayActorUploadModal = () => {
//     setShowActorUploadModal(true);
//   };
//   const hideActorUploadModal = () => {
//     setShowActorUploadModal(false);
//   };

//   return (
//     <>
//       <div className="flex dark:bg-primary bg-white">
//         <AuthorNavbar />
//         <div className="flex-1 max-w-screen-xl">
//           <Header
//           // onAddMovieClick={displayMovieUploadModal}
//           // onAddActorClick={displayActorUploadModal}
//           />
//           <Routes>
//             <Route path="/" element={<AuthorDashboard />} />
//             <Route path="/author/movies" element={<Movies />} />
//             <Route path="/author/actors" element={<Actors />} />
//             <Route path="/author/posts" element={<Posts />} />
//             <Route path="/author/posts/new" element={<NewPost />} />
//             <Route path="/author/posts/categories" element={<Categories />} />
//             <Route path="/author/media/library" element={<MediaLibrary />} />
//             <Route path="/author/media/new" element={<Media />} />
//             <Route path="/author/users/new" element={<NewUser />} />
//             <Route path="/posts" element={<AllPosts />} />
//             <Route path="/post/:slug" element={<SinglePost />} />
//             <Route path="/author/comments" element={<AuthorComments />} />
//             <Route path="/search" element={<SearchMovies />} />
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </div>
//       </div>
//       <MovieUpload
//         visible={showMovieUploadModal}
//         onClose={hideMovieUploadModal}
//       />
//       <ActorUpload
//         visible={showActorUploadModal}
//         onClose={hideActorUploadModal}
//       />
//     </>
//   );
// }
