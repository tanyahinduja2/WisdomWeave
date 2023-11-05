import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { WisdomWeaveContext } from "../context/WisdomWeaveContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import SpeechToTextButton from "./SpeechToTextButton";

const ReactQuill = dynamic(() => import("react-quill"), {
  loading: () => <p>Loading editor...</p>,
  ssr: false,
});

const styles = {
  wrapper: `w-[60rem] h-[35rem] flex flex-col justify-start items-center gap-[1rem] p-[1rem] font-mediumSerif overflow-y-scroll`,
  title: `my-[2rem] font-bold text-3xl`,
  smallField: `w-full flex justify-between gap-[1rem]`,
  largeField: ``,
  fieldTitle: `flex-1 text-end`,
  inputContainer: `flex-[5] h-min border-2 border-[#787878]`,
  inputField: `w-full border-0 outline-none bg-transparent`,
  accentedButton: `bg-black text-white py-2 px-4 rounded-full`,
  articleText: `flex-1`,
};

const quillModules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ color: [] }, { background: [] }],
    ["link"],
    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "font",
  "list",
  "bullet",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "link",
  "clean",
];

const UploadModal = () => {
  const router = useRouter();
  const { currentUser } = useContext(WisdomWeaveContext);

  const [title, setTitle] = useState("");
  const [brief, setBrief] = useState("");
  const [category, setCategory] = useState("");
  const [postLength, setPostLength] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [body, setBody] = useState("");

  const forbiddenWords = [
    "curseword1",
    "curseword2",
    "sensitiveword1",
    "sensitiveword2",
  ];

  const containsForbiddenWords = (text) => {
    const regex = new RegExp(forbiddenWords.join("|"), "i");
    return regex.test(text);
  };

  const uploadPost = async (event) => {
    event.preventDefault();

    if (containsForbiddenWords(body)) {
      alert(
        "Your post contains forbidden words. Please remove them before uploading."
      );
      return;
    }

    await addDoc(collection(db, "articles"), {
      bannerImage: bannerImage,
      body: body,
      category: category,
      brief: brief,
      postedOn: serverTimestamp(),
      postLength: Number(postLength),
      title: title,
      authorName: currentUser.displayName,
      authorEmail: currentUser.email,
    });

    alert("Post Uploaded");
    router.push("/");
  };

  const handleSpeechResult = (transcript) => {
    setBody((prevBody) => prevBody + " " + transcript);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Upload a Post</div>
      <div className={styles.smallField}>
        <span className={styles.fieldTitle}>Title</span>
        <span className={styles.inputContainer}>
          <input
            className={styles.inputField}
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </span>
      </div>
      <div className={styles.smallField}>
        <span className={styles.fieldTitle}>Brief</span>
        <span className={styles.inputContainer}>
          <input
            className={styles.inputField}
            type="text"
            value={brief}
            onChange={(event) => setBrief(event.target.value)}
          />
        </span>
      </div>
      <div className={styles.smallField}>
        <span className={styles.fieldTitle}>Banner Image URL</span>
        <span className={styles.inputContainer}>
          <input
            className={styles.inputField}
            type="text"
            value={bannerImage}
            onChange={(event) => setBannerImage(event.target.value)}
          />
        </span>
      </div>
      <div className={styles.smallField}>
        <span className={styles.fieldTitle}>Category</span>
        <span className={styles.inputContainer}>
          <input
            className={styles.inputField}
            type="text"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
        </span>
      </div>
      <div className={styles.smallField}>
        <span className={styles.fieldTitle}>
          Estimated Read Length (in minutes)
        </span>
        <span className={styles.inputContainer}>
          <input
            className={styles.inputField}
            type="text"
            value={postLength}
            onChange={(event) => setPostLength(event.target.value)}
          />
        </span>
      </div>
      {/* <div className={styles.smallField}>
        <span className={styles.fieldTitle}>Speech-to-Text</span>
      </div> */}

      <div className="flex flex-row w-full">
        <div className="flex flex-col gap-[1rem] ml-[3.5rem]">
        <span className="">Article Text</span>
        <span className="px-4">
          <SpeechToTextButton onSpeechResult={handleSpeechResult} />
        </span>

        </div>
        <span className={styles.inputContainer}>
          <ReactQuill
            value={body}
            onChange={setBody}
            modules={quillModules}
            formats={quillFormats}
            placeholder="Write your article here..."
            className={styles.richTextEditor}
          />
        </span>
      </div>
      <button onClick={uploadPost} className={styles.accentedButton}>
        Submit
      </button>
    </div>
  );
};

export default UploadModal;
