import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
function Back() {
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-white hover:text-gray-300 transition cursor-pointer"
      >
        <ArrowLeft size={20} />
        Back
      </button>
    </>
  );
}
export default Back;
