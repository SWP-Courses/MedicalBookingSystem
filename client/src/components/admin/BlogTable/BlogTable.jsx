import React, { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import BlogRow from "./BlogRow";
import "./blogtable.css";
// import { faker } from '@faker-js/faker';

// const demoBlogList = [
//     {
//         id: 1,
//         title: "Những lưu ý quan trọng trước khi khám sức khỏe tổng quát",
//         create_at: faker.date.past()
//     },
//     {
//         id: 2,
//         title: "Có nên trì hoãn việc tiêm chủng trong đợt dịch Covid-19?",
//         create_at: faker.date.past()

//     },
//     {
//         id: 3,
//         title: "Hóa trị, xạ trị, liệu pháp miễn dịch chữa ung thư ảnh hưởng tới khả năng mang thai thế nào?",
//         create_at: faker.date.past()

//     },
//     {
//         id: 4,
//         title: "Chuyên gia ICON (Úc) ấn tượng về tiến bộ mới trong xạ trị ung thư tại Vinmec Central Park",
//         create_at: faker.date.past()

//     },
//     {
//         id: 5,
//         title: "Cẩm nang thông tin hỗ trợ bệnh nhân xạ trị vùng đầu cổ",
//         create_at: faker.date.past()

//     }
// ]

function BlogTable({ onClickEditBlog, blogs, onDeleteBlogById }) {
  const [blogList, setBlogList] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!blogs) return;
    setBlogList(blogs);
  }, [blogs]);

  useEffect(() => {
    if (search.length > 3) return;
    setBlogList(blogs);
  }, [search]);

  const onSearch = () => {
    if (search.length > 3) {
      setBlogList((blogs) =>
        blogs?.filter((item) => {
          if (
            item.title
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .includes(search.toLowerCase())
          ) {
            return true;
          }
          return false;
        })
      );
    //   setBlogList((blog) =>
    //     blog.filter((blg) =>
    //       blg.title.toLowerCase().includes(search.toLowerCase())
    //     )
    //   );
    }
  };

  if (!blogList) return <p>Loading...</p>;

  return (
    <>
      {/* Filter */}
      <div className="w-100 d-flex justify-content-center">
        <div className="d-flex gap-3 w-100 justify-content-center">
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="form-control"
            style={{ width: "50%" }}
            placeholder="Search by title"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
          <button
            onClick={onSearch}
            className="btn btn-primary px-5"
            type="submit"
          >
            {" "}
            Search{" "}
          </button>
        </div>
      </div>

      <div className="mt-1 p-3">
        <table className="table mt-3">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th className="text-center" scope="col">
                Date
              </th>
              <th className="text-center" scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {blogList.map((blog, index) => (
              <BlogRow
                onDeleteBlogById={onDeleteBlogById}
                key={blog.id}
                blog={blog}
                onClickEditBlog={onClickEditBlog}
                stt={index + 1}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default BlogTable;
