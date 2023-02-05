import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getGallery,
  deleteGallery,
  createComment,
  deleteComment,
} from "../store/galleries/slice";
import { selectGallery } from "../store/galleries";

import { selectIsAuthenticated, selectActiveUser } from "../store/auth";
import { format } from "date-fns";
import { Carousel } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import useFormattedDate from "../hooks/UseFormatedDate";
// import '../style/mystyle';

export default function Gallery() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const gallery = useSelector(selectGallery);
  const formattedDate = useFormattedDate(
    gallery ? gallery.created_at : "",
    "dd-MM-yyyy HH:mm"
  );
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const activeUser = useSelector(selectActiveUser);
  const history = useHistory();
  const [newComment, setNewComment] = useState({ body: "" });

  useEffect(() => {
    dispatch(getGallery(id));
  }, [id, dispatch]);

  const handleContentChange = (e) => {
    setNewComment({ ...newComment, body: e.target.value });
  };

  const handleAddNewComment = (e) => {
    e.preventDefault();
    dispatch(createComment({ body: newComment, galleryId: id }));
    setNewComment({ body: "" });
  };

  const handleDeleteComment = (id) => {
    dispatch(deleteComment(id));
    history.push("/galleries");
  };

  const handleDeleteGallery = () => {
    dispatch(deleteGallery(id));
    history.push("/my-galleries");
  };

  return (
    <div>
      <div className="d-flex flex-column align-items-center">
        <div className="w-50">
          {gallery ? (
            <>
              <h1 className="text-center mb-3">{gallery?.title}</h1>

              <h3 className="text-center mb-3">
                <Link to={`/authors/${gallery?.user?.id}`}>
                  {gallery?.user?.first_name} {gallery?.user?.last_name}
                </Link>
              </h3>

              <div className="text-center mb-3">
                {formattedDate === "unknown" ? (
                  <div>Unknown date</div>
                ) : (
                  <div>Created at: {formattedDate}</div>
                )}
              </div>

              <div className="mb-3">
                <Carousel>
                  {gallery.images && gallery.images.length
                    ? gallery.images.map((image, index) => (
                        <Carousel.Item key={image.id} interval={7000}>
                          <a
                            key={index}
                            rel="noreferrer"
                            target="_blank"
                            href={image.url}
                          >
                            <img
                              className="d-block w-100"
                              key={image.id}
                              src={image.url}
                              alt="Gallery carousel element"
                            />
                          </a>
                        </Carousel.Item>
                      ))
                    : "No images found"}
                </Carousel>
              </div>
              <div className="mb-3">
                {gallery && gallery.description ? (
                  <h3>
                    <p>{gallery.description}</p>
                  </h3>
                ) : (
                  <p>No Descripton</p>
                )}
              </div>
              <div className="d-flex justify-content-between w-50">
                {activeUser && activeUser.id === gallery.user_id ? (
                  <Link
                    to={`/edit-gallery/${gallery.id}`}
                    className="btn btn-outline-dark mr-2"
                  >
                    Edit Gallery
                  </Link>
                ) : (
                  <></>
                )}
                {activeUser && activeUser.id === gallery.user_id ? (
                  <Button
                    variant="outline-danger"
                    onClick={handleDeleteGallery}
                  >
                    Delete gallery
                  </Button>
                ) : (
                  <></>
                )}
              </div>
            </>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>

      <div className="d-flex flex-column">
        {gallery && gallery.comments ? (
          <>
            <h4 className="mb-3">
              {gallery.comments.length ? "Comments" : "No Comments"}
            </h4>
            <ul className="list-unstyled">
              {gallery.comments.map((comment) => (
                <li key={comment.id} id={`comment${comment.id}`}>
                  <div className="d-flex">
                    <div className="font-weight-bold mr-3">
                      {comment.user.first_name} {comment.user.last_name}
                    </div>
                    <div className="text-secondary">
                      {format(new Date(comment.created_at), "dd-MM-yyyy HH:mm")}
                    </div>
                  </div>
                  <p className="mb-3">{comment.body}</p>
                  {activeUser && activeUser.id === comment.user.id ? (
                    <Button
                      variant="outline-dark"
                      onClick={() => handleDeleteComment(comment.id)}
                      className="mb-3"
                    >
                      Delete Comment
                    </Button>
                  ) : (
                    <></>
                  )}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <></>
        )}

        {isAuthenticated && (
          <form onSubmit={handleAddNewComment} className="mt-3">
            <textarea
              className="form-control"
              rows="3"
              required
              onChange={handleContentChange}
              value={newComment.body}
              placeholder="Leave a comment:"
            />
            <Button className="mt-3" type="submit">
              Submit
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
