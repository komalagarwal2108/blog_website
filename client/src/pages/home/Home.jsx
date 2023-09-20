import "./home.css";
import "../../components/header/Header";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";


export default function Home() {

  const [posts, setPosts] = useState([]);
  const {search} = useLocation();
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  

  useEffect(() => {
    const fetchPosts = async ()=>{
      const res= await axios.get(backendURL+"/posts" + search);
      setPosts(res.data);
    }
    fetchPosts()
  },[search,backendURL])    //may cause error

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
        
      </div>
    </>
  );
}
