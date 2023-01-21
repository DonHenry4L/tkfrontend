import { CloudUploadOutlined } from "@ant-design/icons";
import { Button, Upload, message } from "antd";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MediaContext } from "../../../context/Media";
import { getToken } from "../../../utils/helper";
import { useAuth } from "../../../hooks";

const UploadFile = ({ redirectToLibrary = false, page = "admin" }) => {
  const [media, setMedia] = useContext(MediaContext);
  const token = getToken();
  const navigate = useNavigate();
  const { authInfo } = useAuth();

  const props = {
    action: `http://localhost:5000/api/post/upload-image-file`,
    headers: {
      authorization: authInfo?.profile.token,
    },

    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        console.log("info.file => ", info.file);
        setMedia({
          images: [...media.images, info.file.response],
          selected: info.file.response,
          showMediaModal: false,
        });
        if (redirectToLibrary) {
          navigate(`/${page}/media/library`);
        }
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };
  return (
    <Upload {...props} maxCount={1}>
      <Button icon={<CloudUploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
};

export default UploadFile;
