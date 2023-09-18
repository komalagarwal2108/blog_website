import "./post.css";
import PostImg from "../../asset/img/postimage.jpg";
import {Link} from "react-router-dom"

export default function Post({ post }) {
  const PF="http://localhost:5000/images/"
  return (
    <div className="post">
      {post.photo && <img src={PF + post.photo} alt="" className="postImg" />}
      
      <div className="postInfo">
        <div className="postCategories">
          {post.categories.map((c) => (
            <span className="postCategory">{c}</span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDescription">{post.desc}</p>
    </div>
  );
}