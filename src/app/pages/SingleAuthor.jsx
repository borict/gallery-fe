import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  selectGalleries,
  selectSearchTerm,
} from "../store/galleries/selectors";
import { getGalleries, setSearchUserId } from "../store/galleries/slice";
import Search from "../components/Search";
import GalleryComponent from "../components/GalleryComponent";
import { Button } from "react-bootstrap";

export const SingleAuthor = (selfId) => {
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
      {" "}
      <div>
        <Search />
      </div>
      <div className="container">
        {galleries?.data.length ? (
          <div className="row">
            <ul>
              {galleries &&
                galleries.data
                  .filter((g) => g.user_id == id)
                  .map((gallery) => (
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
};
