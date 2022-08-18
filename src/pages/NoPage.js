import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import NotFound from "../components/UI/NotFound";

export default function NoPage() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/posts");
    }, 3000);
  });

  return (
    <>
      <NotFound text="page" showBtn={false} />
      <div className="centered">
        <p>Redirecting to All posts...</p>
      </div>
    </>
  );
}
