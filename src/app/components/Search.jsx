import { useDispatch, useSelector } from "react-redux";
import { getGalleries, setSearchTerm } from "../store/galleries/slice";
import { selectSearchTerm, selectSearchUserId } from "../store/galleries";
import Button from "react-bootstrap/Button";

export default function Search() {
  const dispatch = useDispatch();

  const term = useSelector(selectSearchTerm);

  const userId = useSelector(selectSearchUserId);

  function handleChangeSearchTerm(event) {
    dispatch(setSearchTerm(event.target.value));
  }

  function handleSearch() {
    dispatch(getGalleries({ page: 1, term: term, userId: userId }));
  }

  return (
    <form className="d-flex">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        onChange={handleChangeSearchTerm}
      />
      <Button variant="outline-primary" onClick={handleSearch}>
        Search
      </Button>
    </form>
  );
}
