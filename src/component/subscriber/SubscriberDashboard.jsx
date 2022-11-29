import { Layout, Modal, Button } from "antd";
import React, { useEffect } from "react";
import { useAuth } from "../../hooks";
import Slider from "../../navigator/marquee/Slider";
import Footer from "../admin/footer/Footer";

export default function SubscriberDashboard() {
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;

  const countDown = () => {
    let secondsToGo = 5;
    const modal = Modal.success({
      title: `Hello ${authInfo.profile.username}`,
      content: `Welcome To Tksarl Family`,
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      // modal.update({
      //   content: `Welcome To Tksarl Family`,
      // });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
    }, secondsToGo * 1000);
  };

  useEffect(() => {
    if (isLoggedIn) {
      countDown();
    }
  }, []);

  return (
    <div>
      <Slider />
      <Layout>
        <h1>This Is A Subscriber Dashboard</h1>

        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore in
          dicta sequi mollitia porro accusantium vero accusamus consequuntur sed
          consectetur!
        </p>
      </Layout>
      <div className="m-5 mt-20">
        <Footer />
      </div>
    </div>
  );
}
