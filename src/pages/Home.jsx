import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
  const [isPosts, setIsPosts] = useState([]);

  useEffect(() => {
    service.getPosts().then((posts) => {
      if (posts) {
        setIsPosts(posts.documents);
      }
    });
  }, []);

  if (isPosts.length === 0) {
    return (
      <>
        <Container>
          <div className=" w-full">
            <div className="relative isolate z-0 bg-white px-6 pt-14 lg:px-8">
              <div className="relative mx-auto max-w-2xl py-24">
                <div className="text-center">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Do you want see the posts ? Excited to create Blogs ! 😋
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      <Container>
        {isPosts.map((post) => (
          <div key={post.$id} className="p-2 w-1/4">
            <PostCard {...post} />
          </div>
        ))}
      </Container>
    </>
  );
}

export default Home;
