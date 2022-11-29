import { useState, useEffect } from "react";
import client from "../api/client";

const useLatestPosts = () => {
  // state
  const [latestPosts, setLatestPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await client("/posts/1");
        setLatestPosts(data);
      } catch (err) {
        console.log(err);
      }
    };

    getPosts();
  }, []);

  return {
    latestPosts,
  };
};

export default useLatestPosts;
