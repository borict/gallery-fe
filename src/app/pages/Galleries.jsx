import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectGalleries } from "../store/galleries";
import { getGalleries, setSearchUserId } from "../store/galleries/slice";
import GalleryComponent from "../components/GalleryComponent";
import { selectSearchTerm } from "../store/galleries";
import Button from "react-bootstrap/Button";

export default function Galleries({ selfId } = null) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const galleries = useSelector(selectGalleries);
  const term = useSelector(selectSearchTerm);

  useEffect(() => {
    if (selfId) {
      dispatch(setSearchUserId(selfId));
      dispatch(getGalleries({ page: 1, term: null, userId: selfId }));
    }
    if (id) {
      dispatch(setSearchUserId(id));
      dispatch(getGalleries({ page: 1, term: null, userId: id }));
    }
    if (!id && !selfId) {
      dispatch(setSearchUserId(null));
      dispatch(getGalleries({ page: 1, term: null, userId: null }));
    }
  }, [selfId, id, dispatch]);

  function handlePaginate(page) {
    if (selfId) {
      dispatch(getGalleries({ page: page, term: term, userId: selfId }));
    }
    if (id) {
      dispatch(getGalleries({ page: page, term: term, userId: id }));
    }
    if (!id && !selfId) {
      dispatch(getGalleries({ page: page, term: term, userId: null }));
    }
  }

  return (
    <div>
      <div className="container">
        {galleries?.data.length ? (
          <div className="row">
            <ul>
              {galleries.data.map((gallery) => (
                <GalleryComponent key={gallery.id} gallery={gallery} />
              ))}
            </ul>

            {galleries.current_page !== galleries.last_page && (
              <div className="d-flex justify-content-center">
                <Button
                  variant="outline-dark"
                  onClick={() => handlePaginate(galleries.current_page + 1)}
                >
                  Load more
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div>No search results found.</div>
        )}
      </div>
    </div>
  );
}
