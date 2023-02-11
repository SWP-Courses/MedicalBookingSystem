import React, { useState } from "react";

function ShortenArticle({ article, limit, readMoreText }) {
    
  const [expanded, setExpanded] = useState(false);

  if (!expanded && article.length > limit) {
    return (
      <>
        {article.slice(0, limit)}...{" "}
        <button onClick={() => setExpanded(true)}>{readMoreText}</button>
      </>
    );
  }

  return <>{article}</>;
}

const article =
  "This is a very long article about something. It has a lot of information and details. It is intended to be informative and educational.";
const limit = 100;
const readMoreText = "Read more...";
