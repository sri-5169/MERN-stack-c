import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import styled from "@emotion/styled";
import { io } from "socket.io-client";
import { useState } from "react";
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];
const Component = styled.div`
  background: #f5f5f5;
`;
const Editor = () => {
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();

  useEffect(() => {
    const editorlauncher = new Quill("#container", {
      theme: "snow",
      modules: { toolbar: toolbarOptions },
    });
    setQuill(editorlauncher);
  }, []);
  useEffect(() => {
    const socketServer = io("http://localhost:8000/");
    setSocket(socketServer);
    return () => {
      socketServer.disconnect();
    };
  });
  // useEffect(() => {
  //   const handleChange = (delta, oldData, source) => {
  //     if (source !== "user") return;
  //     socket.emit("send-change", delta);
  //   };

  //   quill.on("text-change", handleChange);
  //   return () => {
  //     quill.off("text-change");
  //   };
  // }, []);

  return (
    <Component>
      <Box className="container" id="container"></Box>
    </Component>
  );
};

export default Editor;
