import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import DataTable, { filter } from "react-data-table-component";
import { Link } from "react-router-dom";
import API_URL from "~/api/Router";
import { AuthContext } from "~/context/authContext";
import "./blogsSaved.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { format } from "date-fns";

export default function BlogsSaved() {
  const [blogsSaved, setBlogSaved] = useState();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      const fetchSavedBlogs = async () => {
        try {
          const res = await axios.get(
            `${API_URL}/blogs/saved/${currentUser._id}`
          );
          const sblogDetails = res.data.map((sblog) => {
            return { ...sblog.blog[0], cate: sblog.category[0].name };
          });
          setBlogSaved(sblogDetails);
        } catch (err) {
          console.log(err);
        }
      };
      fetchSavedBlogs();
    }
  }, [currentUser]);

  const [filterText, setFilterText] = useState("");

  const columns = useMemo(() => {
    const handleUnSaveBlogClick = async (blogId) => {
      try {
        await axios.delete(
          `${API_URL}/blogs/unsave/${blogId}/${currentUser._id}`
        );
        toast.success("Đã bỏ lưu bài viết");
        setBlogSaved((prev) => prev.filter((blog) => blog._id !== blogId));
      } catch (err) {
        console.log(err);
      }
    };

    return [
      {
        name: "Minh hoạ",
        cell: (row) => {
          const imgString = row.content.match(/<img([\w\W]+?)>/g);
          if (imgString) {
            return (
              <Link
                to={`/blogs/${row._id}`}
                className="blog-save-banner"
                dangerouslySetInnerHTML={{ __html: imgString[0] }}
              />
            );
          } else return undefined;
        },
      },
      {
        name: "Tiêu đề",
        selector: (row) => row.title,
      },
      {
        id: "date",
        name: "Ngày đăng",
        selector: (row) => format(new Date(row.created_at), "dd/MM/yyyy"),
        sortable: true,
      },
      {
        name: "Tác giả",
        selector: (row) => row.author,
      },
      {
        name: "Thao tác",
        selector: (row) => (
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 300 }}
            overlay={<Tooltip id="button-tooltip">Bỏ lưu</Tooltip>}
          >
            <Button
              variant="outline-danger"
              size="sm"
              className="btn-block mt-auto"
              onClick={() => handleUnSaveBlogClick(row._id)}
            >
              &#x274c;
            </Button>
          </OverlayTrigger>
        ),
      },
    ];
  }, [currentUser._id]);

  console.log(blogsSaved);

  return (
    <div className="blogsSaved">
      <InputGroup className="mb-3 search-saved-blog w-25">
        <InputGroup.Text id="basic-addon1">
          <FontAwesomeIcon icon={faSearch} />
        </InputGroup.Text>
        <Form.Control
          placeholder="Tiêu đề"
          aria-label="Username"
          aria-describedby="basic-addon1"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </InputGroup>
      <DataTable
        title="Bài viết đã lưu"
        columns={columns}
        data={blogsSaved?.filter((item) => {
          if (filterText === "") {
            return true;
          } else if (
            item.title
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .includes(filterText.toLowerCase())
          ) {
            return true;
          }
          return false;
        })}
        pagination
      />
      {/* <Container className="mt-3">
        <Row>
          {blogsSaved?.map((blog) => {
            const imgString = blog.content.match(/<img([\w\W]+?)>/g);
            const imgSrc = imgString[0].match(/"([^"]*)"/);
            console.log(imgSrc);
            return (
              <Col xs={14} md={3} key={blog._id}>
                <Card
                  border="secondary"
                  style={{ width: "100%", cursor: "pointer", height: "100%", maxHeight:"300px" }}
                >
                  <Card.Img variant="top" src="asdada" />
                  <Card.Header className="text-center h-25 text-middle">
                    {blog.cate}
                  </Card.Header>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title style={{ minHeight: "80px" }}>
                      <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
                    </Card.Title>
                    <Card.Body>
                      <Card.Text>Tác giả: {blog.author}</Card.Text>
                      <Card.Text>Ngày đăng: {blog.createdAt}</Card.Text>
                    </Card.Body>
                    <Button
                      variant="warning"
                      size="sm"
                      className="btn-block mt-auto"
                      onClick={() => handleUnSaveBlogClick(blog._id)}
                    >
                      Bỏ lưu
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container> */}
    </div>
  );
}
