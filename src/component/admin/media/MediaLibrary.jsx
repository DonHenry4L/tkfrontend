import React, { useState, useEffect } from "react";
import { CloseCircleOutlined, InboxOutlined } from "@ant-design/icons";
import { Badge, Image, message, Upload } from "antd";
import { getToken } from "../../../utils/helper";
import { MediaContext } from "../../../context/Media";
import axios from "axios";
import { useAuth, useNotification } from "../../../hooks";

const { Dragger } = Upload;

export default function MediaLibrary() {
  // Context
  const { authInfo } = useAuth();
  const [media, setMedia] = useState(MediaContext);
  const [showPreview, setShowMedia] = useState(false);

  const token = getToken();

  const { updateNotification } = useNotification();

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const { data } = await axios.get("/api/post/media", {
          headers: {
            authorization: "Bearer " + token,
          },
        });
        console.log(data);
        setMedia((prev) => ({ ...prev, images: data }));
      } catch (err) {
        console.log(err);
      }
    };
    fetchMedia();
  }, []);

  const props = {
    name: "file",
    multiple: true,
    action: `http://localhost:5000/api/post/upload-image-file`,
    headers: {
      authorization: "Bearer " + token,
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        // console.log("info.file on drag drop => ", info.file);
        setMedia({
          images: [...media.images, info.file.response],
          selected: info.file.response,
          showMediaModal: false,
        });
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleImageDelete = async (imageId) => {
    const token = getToken();
    try {
      const { data } = await axios.delete(`/media/${imageId}`, {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      if (data.ok) {
        setMedia({
          ...media,
          images: media.images.filter((image) => image._id !== imageId),
          selected: null,
        });
        updateNotification("error", "Image deleted successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Dragger {...props} accept="image/*">
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
      </Dragger>
      {media?.images?.length}

      <div style={{ textAlign: "center" }}>
        {/* {media?.images?.map((image) => (
          <Badge>
            <Image
              onClick={() => setMedia({ ...media, selected: image })}
              preview={showPreview}
              src={image.url}
              style={{
                paddingTop: 5,
                paddingRight: 10,
                height: "100px",
                width: "100px",
                objectFit: "cover",
                cursor: "pointer",
              }}
            />
            <br />
            <br />
            {authInfo?.role === "Subscriber" &&
            image?.postedBy?._id == authInfo?.user?._id ? (
              <CloseCircleOutlined
                onClick={() => handleImageDelete(image._id)}
                style={{ marginTop: "5px", color: "#f5222d" }}
              />
            ) : authInfo?.role === "Admin" ? (
              <CloseCircleOutlined
                onClick={() => handleImageDelete(image._id)}
                style={{ marginTop: "5px", color: "#f5222d" }}
              />
            ) : (
              ""
            )}
          </Badge>
        ))} */}
      </div>
    </>
  );
}
