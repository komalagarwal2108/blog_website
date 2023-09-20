import { useContext, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./settings.css";
import { Context } from "../../context/Context";
import axios from "axios";
import profilePic from "../../asset/img/nopicuser.jpg"

export default function Settings() {
  const { user ,dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const PF="http://localhost:5000/images/";
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:"UPDATE_START"})
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name; // to make sure that if user uploads file with same name it can be resovled
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilepic = filename;
      console.log(filename);
      try {
        await axios.post(backendURL+"/upload", data);
      } catch (err) {}
    }
    try {
      const res=await axios.put(backendURL+"/users/" + user._id, updatedUser);
      
      setSuccess(true);
      dispatch({type:"UPDATE_SUCCESS", payload: res.data})
    } catch (err) {
        dispatch({type:"UPDATE_FAILURE"})
    }
  };
    console.log(user);
  return (
    
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            {user.profilePic ?(<img
              src={file ? URL.createObjectURL(file) : PF+user.profilepic}
              alt=""
            />):(<img src={profilePic} alt="" />)}
            
            <label htmlFor="fileInput">
              <i className="settingsPPIcon fa-regular fa-circle-user"></i>
            </label>

            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>User Name</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {success && (
            <span style={{ color: "green" , textAlign: "center", marginTop : "20px" }}>Profile has been updated...</span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
