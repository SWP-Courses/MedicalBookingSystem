import React from "react";
import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { useLocation, useNavigate, Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./Pagination.scss"; 
import parse from "html-react-parser";
import { format } from "date-fns";

function Pagination(props) {
  const { data } = props;

  // items show in a current page
  const [currentItems, setCurrentItems] = useState([]);

  // total page
  const [pageCount, setPageCount] = useState(0);

  // index of first item in a current page
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    // index of the last item in a current page
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]); // each time each of these change useEffect executed

  const handlePageClick = (event) => {
    console.log(
      "event.selected: ",
      event.selected,
      "item perpage: ",
      itemsPerPage,
      "result :",
      (event.selected * itemsPerPage) % data.length,
      "page cpunt",
      pageCount
    );

    // caculate the first index in a current Page
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="images">
        {currentItems.map((blog, index) => {
          const imgString = blog.content.match(/<img([\w\W]+?)>/g);
          return (
            <div key={index} className="blog-item">
              <Link to={`/blogs/${blog._id}`}>
                {imgString ? parse(imgString[0]) : undefined}
              </Link>
              <div className="blog-item-body">
                <Link to={`/blogs/${blog._id}`}>
                  <h2
                    className="bolg-item-title line-clamp"
                    style={{ fontSize: "25px", cursor: "pointer" }}
                  >
                    {blog.title}
                  </h2>
                </Link>
                <p
                  className="line-clamp line-4"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(blog?.description),
                  }}
                >
                  {
                    // blog.content
                  }
                </p>
                <div className="blog-item__desc d-sm-none d-md-block">
                  <span>Tác giả</span> <strong style={{marginLeft: '5px', opacity: 0.7}}>{blog?.author}</strong>
                  <span className="separate-line"></span>
                  <span>{new Date(blog?.created_at.split('T')[0]).toLocaleString()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        pageCount={pageCount}
        previousLabel="< "
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-prev"
        nextLinkClassName="page-next"
        activeLinkClassName="active"
        disabledLinkClassName="disable"
        forcePage={0}
      />
    </>
  );
}

export default Pagination;
