import { useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

export default function WebsiteRatingSection() {
  // Mock initial counts
  const [likes, setLikes] = useState(45);
  const [dislikes, setDislikes] = useState(102);
  const [userRating, setUserRating] = useState<null | "like" | "dislike">(null);

  const handleLike = () => {
    if (userRating === "like") return;
    setLikes(likes + 1);
    if (userRating === "dislike") setDislikes(dislikes - 1);
    setUserRating("like");
  };

  const handleDislike = () => {
    if (userRating === "dislike") return;
    setDislikes(dislikes + 1);
    if (userRating === "like") setLikes(likes - 1);
    setUserRating("dislike");
  };

  return (
    <section className="flex flex-col items-center justify-center py-12 bg-black rounded-xl shadow-lg mx-4 my-8 border border-gray-800">
      <h2 className="text-2xl font-semibold mb-4">Rate This Website</h2>
      <div className="flex items-center gap-8 mb-2">
        <button
          className={`flex flex-col items-center px-6 py-2 rounded-lg focus:outline-none transition-colors duration-200 ${userRating === "like" ? "bg-green-900" : "bg-black hover:bg-gray-900"}`}
          onClick={handleLike}
        >
          <FaThumbsUp size={32} color="#fff" />
          <span className="mt-1 font-medium text-white">{likes}</span>
        </button>
        <button
          className={`flex flex-col items-center px-6 py-2 rounded-lg focus:outline-none transition-colors duration-200 ${userRating === "dislike" ? "bg-red-900" : "bg-black hover:bg-gray-900"}`}
          onClick={handleDislike}
        >
          <FaThumbsDown size={32} color="#fff" />
          <span className="mt-1 font-medium text-white">{dislikes}</span>
        </button>
      </div>
      <span className="text-gray-400 text-sm">Your feedback helps us improve!</span>
    </section>
  );
}
