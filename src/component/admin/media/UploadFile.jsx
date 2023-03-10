import {
  CloudUploadOutlined,
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Upload, message, Input } from "antd";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MediaContext } from "../../../context/Media";
import { getToken } from "../../../utils/helper";
import { useAuth } from "../../../hooks";

const UploadFile = ({ redirectToLibrary = false }) => {
  // context
  const { authInfo } = useAuth();
  const [media, setMedia] = useContext(MediaContext);
  // hook
  const navigate = useNavigate();

  const props = {
    name: "file",
    action: `http://localhost:5000/api/post/upload-image-file`,
    headers: {
      Authorization: `Bearer ${authInfo.profile.token}`,
      // authorization: "Bearer " + token,
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        // console.log("info.file => ", info.file);
        setMedia({
          images: [...media.images, info.file.response],
          selected: info.file.response,
          showMediaModal: false,
        });
        if (redirectToLibrary) {
          navigate(`/media/library`);
        }
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Upload {...props} maxCount={1}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
};

export default UploadFile;
