import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selectedPage: number) => void;
}

function Pagination({ pageCount, currentPage, onPageChange }: PaginationProps) {
  // Обработчик изменения страницы
  function handlePageChange(selectedItem: { selected: number }) {
    onPageChange(selectedItem.selected);
  }

  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      forcePage={currentPage}
      onPageChange={handlePageChange}
      containerClassName={css.pagination}
      pageClassName={css.page}
      pageLinkClassName={css.pageLink}
      activeClassName={css.active}
      previousLabel="←"
      nextLabel="→"
      previousClassName={css.prev}
      nextClassName={css.next}
      breakLabel="..."
      breakClassName={css.break}
    />
  );
}

export default Pagination;
