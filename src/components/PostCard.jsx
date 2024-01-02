import React from "react";
import service from "../appwrite/config";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

function PostCard({ $id, title, featuredImage }) {
  const previewUrl = featuredImage ? service.getFilePreview(featuredImage) : "";
  return (
    <div className="w-[300px] rounded-md border">
      <img
        src={previewUrl}
        alt={title}
        className="h-[200px] w-full rounded-t-md object-cover"
      />
      <div className="p-4">
        <h1 className="inline-flex items-center text-lg font-semibold">
          About {title} &nbsp; <ArrowUpRight className="h-4 w-4" />
        </h1>
        <Link to={`/post/${$id}`}>
          <button
            type="button"
            className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Read More
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
