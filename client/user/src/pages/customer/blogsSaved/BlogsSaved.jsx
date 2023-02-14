import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import API_URL from "~/api/Router";
import { AuthContext } from "~/context/authContext";
import { blogsSaved } from "../../../fakeData";
import "./blogsSaved.scss";

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

  const handleUnSaveBlogClick = async (blogId) => {
    try {
      await axios.delete(`${API_URL}/blogs/unsave/${blogId}/${currentUser._id}`);
      setBlogSaved(prev => prev.filter(blog => blog._id !== blogId));
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(blogsSaved);
  return (
    <div className="blogsSaved">
      <Container className="mt-3">
        <Row>
          {blogsSaved?.map((blog) => (
            <Col xs={14} md={3} key={blog._id}>
              <Card
                border="secondary"
                style={{ width: "15rem", cursor: "pointer", height: "100%" }}
              >
                <Card.Header className="text-center">{blog.cate}</Card.Header>
                <Card.Body className="d-flex flex-column">
                  <Card.Title style={{minHeight: "80px"}}>
                    <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
                  </Card.Title>
                  <Card.Text >Tác giả: {blog.author}</Card.Text>
                  <Card.Text>Ngày đăng: {blog.createdAt}</Card.Text>
                  <Button variant="warning" size="sm" className="btn-block mt-auto" onClick={() => handleUnSaveBlogClick(blog._id)}> 
                    Bỏ lưu
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
