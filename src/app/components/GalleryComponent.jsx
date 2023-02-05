import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import useFormattedDate from "../hooks/UseFormatedDate";

export default function GalleryComponent({ gallery }) {
  const formattedDate = useFormattedDate(
    gallery.created_at,
    "dd-MM-yyyy HH:mm"
  );

  return (
    <div className="d-flex justify-content-center">
      {gallery ? (
        <Card style={{ width: "18rem" }} className="m-3">
          <Card.Img
            variant="top"
            src={gallery?.images[0]?.url}
            className="card-img-top"
            alt="Gallery cover img"
          />
          <Card.Body>
            <Card.Title>
              <Card.Link href={`/galleries/${gallery?.id}`}>
                {gallery?.title}
              </Card.Link>
            </Card.Title>
            <Card.Text style={{ color: "#2c3e50", fontSize: 11 }}>
              Author:{" "}
              <Card.Link href={`/authors/${gallery?.user.id}`}>
                {gallery?.user?.first_name} {gallery?.user?.last_name}
              </Card.Link>
            </Card.Text>
            {formattedDate === "unknown" ? (
              <ListGroup className="list-group-flush">
                <ListGroup.Item>Unknown</ListGroup.Item>
              </ListGroup>
            ) : (
              <ListGroup className="list-group-flush">
                <ListGroup.Item style={{ fontSize: 9 }}>
                  Created at: {formattedDate}{" "}
                </ListGroup.Item>
              </ListGroup>
            )}
          </Card.Body>
        </Card>
      ) : (
        <div>Nothing to show</div>
      )}
    </div>
  );
}
