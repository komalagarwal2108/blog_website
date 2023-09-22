import "./write.css";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const { user } = useContext(Context);

  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categories = category.split(" ");

    const newPost = {
      username: user.username,
      title,
      desc,
      categories,
    };

    const cats = categories.map((c) => ({
      name: c,
    }));

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name; // to make sure that if user uploads file with same name it can be resovled
      data.append("name", filename);
      data.append("file", file);
      try {
        const imgURL = await axios.post(backendURL + "/upload", data, {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        });
        newPost.photo = imgURL.data;
      } catch (err) {
        console.log(err);
      }
    }

    for (let c in cats) {
      try {
        await axios.post(backendURL + "/categories", cats[c]);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const res = await axios.post(backendURL + "/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };

  return (
    <div className="write">
      {file && (
        <img src={URL.createObjectURL(file)} alt="" className="writeImg" />
      )}

      <form
        className="writeForm"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="writeFormGroup">
          <input
            type="text"
            placeholder="Category"
            className="writeInput"
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story...  "
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
