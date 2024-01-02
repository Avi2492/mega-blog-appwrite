import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import service from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
function EditPost() {
  const [isPosts, setIsPosts] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setIsPosts(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return isPosts ? (
    <div className="py-8">
      <Container>
        <PostForm post={isPosts} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
