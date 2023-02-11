import { Button, Card } from "react-bootstrap";
import { blogsSaved } from "../../../fakeData";
import "./blogsSaved.scss";

export default function BlogsSaved() {
  return (
    <div className="blogsSaved">
      {blogsSaved.map((blog) => (
        <div className="blogSavedCard">
          <Card
            border="secondary"
            style={{ width: "15rem", cursor: "pointer" }}
          >
            <Card.Header>{blog.category}</Card.Header>
            <Card.Body>
              <Card.Title>{blog.title}</Card.Title>
              <Card.Subtitle>Tác giả: {blog.author}</Card.Subtitle>
              <Card.Text>Ngày đăng: {blog.createdAt}</Card.Text>
              <Button variant="primary" size="sm">
                Huỷ lưu
              </Button>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}
