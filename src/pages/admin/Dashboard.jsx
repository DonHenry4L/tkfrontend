import React, { useEffect } from "react";
import { Modal, Button, Layout, List } from "antd";
import { useAuth } from "../../hooks";
import Slider from "../../navigator/marquee/Slider";
import Footer from "../../component/admin/footer/Footer";

export default function Dashboard() {
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
  }, [isLoggedIn]);
  return (
    <>
      <Slider />
      <div className="flex flex-col h-screen justify-between">
        <Layout>
          <div className="mb-auto">
            <div className="p-3 mt-2 h4 bg-light">Admin Information</div>
            <List bordered className="list-group">
              <List.Item className="list-group-item">
                Name: {authInfo?.profile?.username}
              </List.Item>
              <List.Item className="list-group-item">
                Email: {authInfo?.profile?.email}
              </List.Item>
              <List.Item className="list-group-item">Admin</List.Item>
            </List>
          </div>
        </Layout>
        <div className="m-5">
          <Footer />
        </div>
      </div>
    </>
  );
}
