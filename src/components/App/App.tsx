import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import toast, { Toaster } from "react-hot-toast";

import css from "./App.module.css";

import SearchBox from "../SearchBox/SearchBox.tsx";
import Pagination from "../Pagination/Pagination.tsx";
import NoteList from "../NoteList/NoteList.tsx";
import Modal from "../Modal/Modal.tsx";
import NoteForm from "../NoteForm/NoteForm.tsx";

import { fetchNotes } from "../../services/noteService.ts";

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);

  const query = useQuery({
    queryKey: ["notes", currentPage, debouncedSearch],
    queryFn: function () {
      return fetchNotes(currentPage + 1, debouncedSearch);
    },
    placeholderData: keepPreviousData,
  });

  useEffect(function () {
    setCurrentPage(0);
  }, [debouncedSearch]);

  useEffect(function () {
    if (query.data && query.data.notes.length === 0) {
      toast.error("No notes found.");
    }
  }, [query.data]);

  function handleOpenModal() {
    setModalOpen(true);
  }

  function handleCloseModal() {
    setModalOpen(false);
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  function handleSearchChange(value: string) {
    setSearch(value);
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        {query.data && query.data.totalPages > 1 && (
          <Pagination
            pageCount={query.data.totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
        <button className={css.button} onClick={handleOpenModal}>
          Create note +
        </button>
        {modalOpen && (
          <Modal onClose={handleCloseModal}>
            <NoteForm onCancel={handleCloseModal} onSuccess={handleCloseModal} />
          </Modal>
        )}
      </header>

      {query.data && <NoteList notes={query.data.notes} />}
      <Toaster />
    </div>
  );
}

export default App;
