import React, { useState, useEffect } from "react";
import { checkCommentById } from "../services/index/comments";

const Test = () => {
  const [isSpam, setIsSpam] = useState(null);
  const commentId = "6655c148b1b769f4632dabdb"; // Örnek bir yorum ID'si
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTMzMzliZTI5ZmFlMGQ2YzhhZTIxYSIsImlhdCI6MTcxNzA2NDcwNSwiZXhwIjoxNzE5NjU2NzA1fQ.W2PC5HmNNnhpzWNlUlf1EbY2-1z8O_JuXZf18eVcUqY";
  useEffect(() => {
    // Axios ile spam kontrolü yap
    checkCommentById(token, commentId)
      .then((response) => {
        // Spam kontrolü sonucunu ayarla
        setIsSpam(!response); // response true ise spam değil, false ise spam
      })
      .catch((error) => {
        console.error("Error checking comment: ", error);
      });
  }, [commentId]); // commentId bağımlılığı eklendi, bu değişirse useEffect yeniden çalışacak

  return (
    <div>
      {isSpam !== null ? (
        <div>
          <h2>Spam Check Result</h2>
          <p>{isSpam ? "Not Spam" : "Spam"}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Test;
