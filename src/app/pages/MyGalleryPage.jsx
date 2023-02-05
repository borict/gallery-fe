import { useDispatch, useSelector } from "react-redux";
import { selectGalleries } from "../store/galleries";
import { getGalleries } from "../store/galleries/slice";
import GalleryComponent from "../components/GalleryComponent";
import { selectSearchTerm } from "../store/galleries";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";

export default function MyGalleryPage({ selfId } = null) {
  const dispatch = useDispatch();
  const galleries = useSelector(selectGalleries);
  const term = useSelector(selectSearchTerm);

  useEffect(() => {
    dispatch(getGalleries({ page: 1, term: null, userId: selfId }));
  }, [selfId, dispatch]);

  function handlePaginate(page) {
    dispatch(getGalleries({ page: page, term: term, userId: selfId }));
  }

  return (
    <div className="container">
      {galleries?.data.length ? (
        <div>
          <div className="row">
            {galleries.data
              .filter((g) => g.user_id === selfId)
              .map((gallery) => (
                <GalleryComponent key={gallery.id} gallery={gallery} />
              ))}
          </div>

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
  );
}
