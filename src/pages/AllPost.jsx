import React, { useState } from "react";
import service from "../appwrite/config";
import { Container, PostCard } from "../components";

function AllPost() {
  const [isPosts, setIsPosts] = useState([]);
  // useEffect(() => {}, []);
  service.getPosts([]).then((posts) => {
    if (posts) {
      setIsPosts(posts.documents);
    }
  });
  return (
    <>
      <Container>
        <div className="flex flex-wrap">
          {isPosts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}

export default AllPost;
