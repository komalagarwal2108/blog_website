import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  return (
    <div className="post">
      {post.photo && <img src={post.photo} alt="" className="postImg" />}

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
