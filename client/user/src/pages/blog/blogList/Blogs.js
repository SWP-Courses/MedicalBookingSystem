import "./Blog.scss";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import API_URL from "~/api/Router";
// import Pagination from 'react-bootstrap/Pagination';
import ReactPaginate from "react-paginate";
import slider from '~/assets/images/slider.jpg'

// const items = [...Array(33).keys()];

// function Items({ currentItems }) {
//   return (
//     <div className="items">
//     {currentItems && currentItems.map((item) => (
//       <div>
//         <h3>Item #{item}</h3>
//       </div>
//     ))}
//       </div>
//   );
// }

// function PaginatedItems({ itemsPerPage }) {
//   // We start with an empty list of items.
//   const [currentItems, setCurrentItems] = useState(null);
//   const [pageCount, setPageCount] = useState(0);
//   // Here we use item offsets; we could also use page offsets
//   // following the API or data you're working with.
//   const [itemOffset, setItemOffset] = useState(0);

//   useEffect(() => {
//     // Fetch items from another resources.
//     const endOffset = itemOffset + itemsPerPage;
//     console.log('item offset:' , itemOffset);
//     console.log(`Loading items from ${itemOffset} to ${endOffset}`);

//     setCurrentItems(items.slice(itemOffset, endOffset));
//     setPageCount(Math.ceil(items.length / itemsPerPage));
//   }, [itemOffset, itemsPerPage]);

//   // Invoke when user click to request another page.
//   const handlePageClick = (event) => {

//     console.log('event.selected: ', event.selected, itemsPerPage);

//     const newOffset = event.selected * itemsPerPage % items.length;
//     console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
//     setItemOffset(newOffset);
//   };

//   return (
//     <>
//       <Items currentItems={currentItems} />
//       <ReactPaginate
//         nextLabel="next >"
//         onPageChange={handlePageClick}
//         pageRangeDisplayed={3}
//         marginPagesDisplayed={2}
//         pageCount={pageCount}
//         previousLabel="< previous"
//         pageClassName="page-item"
//         pageLinkClassName="page-link"
//         previousClassName="page-item"
//         previousLinkClassName="page-link"
//         nextClassName="page-item"
//         nextLinkClassName="page-link"
//         breakLabel="..."
//         breakClassName="page-item"
//         breakLinkClassName="page-link"
//         containerClassName="pagination"
//         activeClassName="active"
//         renderOnZeroPageCount={null}
//       />
//     </>
//   );

// }

function Blogs() {
  const listBlogRef = useRef();
  const [pageCount, setPageCount] = useState(0); // total page we have
  const [blogCategory, setBlogCategory] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [blogsFiltered, setBlogsFiltered] = useState([]);
  const [categoryName, setCategoryName] = useState("Tổng Hợp Các Bài Viết");

  useEffect(() => {
    fetchListCategoryBlogs();
    fetchBlogs();
  }, []);

  const fetchListCategoryBlogs = async () => {
    const res = await axios.get(API_URL + "/categorys");
    // console.log('check res cate: ', res);
    if (res && res.data && res.data.category && res.data.category.length > 0) {
      setBlogCategory(res.data.category);
    }
  };

  const fetchBlogs = async () => {
    const res = await axios.get(API_URL + "/blogs");
    // console.log('check res blog: ', res);
    if (res && res.data && res.data.blogs && res.data.blogs.length > 0) {
      listBlogRef.current = res.data.blogs;
      setBlogs(res.data.blogs);
    }
  };

  const handleFilterBlogByCategoryId = (category) => {
    let newBlogList = listBlogRef?.current?.filter(
      (blog) => blog.category_id === category._id
    );
    setBlogs(newBlogList);
    setCategoryName(category.name);
  };

  const handlePageClick = (event) => {
    // console.log("event.selected: ", event.selected, itemsPerPage);

    // const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}`
    );
    // setItemOffset(newOffset);
  };

  return (
    <div className="Blog-wrapper">
      <div className="blog-content">
        <div className="slider">
          <img src={slider} alt='slider' className="slider-body"/>
        </div>
        <div className="blog-body">
          <div className="major-list">
            <ul className="list">
              <li className="item">
                <h5>Nội Dung</h5>
                <div className="line"></div>
              </li>
              {blogCategory.map((category, index) => {
                return (
                  <li className="item" key={index}>
                    <span
                      onClick={() => handleFilterBlogByCategoryId(category)}
                    >
                      {category.name}
                    </span>
                    <div className="line"></div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="blog-list">
            <h1 className="type">{categoryName}</h1>
            <hr />
            {blogs.map((blog, index) => {
              return (
                <div key={index} className="blog-item">
                  <Link to={`/blogs/${blog._id}`}>
                    <img
                      className="blog-image"
                      src={blog.image}
                      alt="blog-image"
                    />
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
                        __html: DOMPurify.sanitize(blog.subTitle),
                      }}
                    >
                      {
                        // blog.content
                      }
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="paginate">
          <span>
            {/* <PaginatedItems itemsPerPage={5} /> */}
            <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={10}
              previousLabel="< previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Blogs;
