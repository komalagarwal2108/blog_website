import "./write.css";
import writeImg from "../../asset/img/postimage.jpg";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categories = category.split(" ");
    console.log(categories);

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
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }

    for (let c in cats) {
      console.log("inside for " + cats[c]);
      try {
        await axios.post("/categories", cats[c]);
      } catch (err) {}
    }

    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };

  return (
    <div className="write">
      {file && (
        <img src={URL.createObjectURL(file)} alt="" className="writeImg" />
      )}

      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
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