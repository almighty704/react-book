import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  readBook,
  deleteBook,
  deleteOnReadBook,
  editBook,
  editReadBook,
} from '../store/bookSlice';
import Edit from './Edit';
import Read from './Read';

const Home = () => {
  const [title, setTitle] = useState('');
  const [id, setId] = useState(false);
  const [edit, setEdit] = useState(false);
  const [query, setQuery] = useState('');
  const [pageStart, setPageStart] = useState(0);
  const [pageEnd, setPageEnd] = useState(7);

  const books = useSelector(state => state.book.books);
  const readed = useSelector(state => state.book.readedBooks);
  const dispatch = useDispatch();
  const onReadBook = id => {
    dispatch(readBook(id));
  };

  const onDeleteBook = (id, isTrue) => {
    if (isTrue === true) {
      dispatch(deleteBook({ id }));
    } else {
      dispatch(deleteOnReadBook({ id }));
    }
  };

  const onEditBook = (id, book, isTrue) => {
    setEdit(prevState => !prevState);
    setId(id);
    console.log(isTrue);

    if (book.title === title) return;

    setTitle(book.title);

    const bookx = { ...book };

    if (isTrue) {
      bookx.title = title;
      dispatch(editBook({ id, bookx }));
    } else {
      bookx.title = title;
      dispatch(editReadBook({ id, bookx }));
    }
  };

  const onChange = e => {
    setTitle(e.target.value);
  };

  return (
    <div className='books'>
      <input
        className='form-center'
        type='text'
        placeholder='Search Books'
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <div className='flex'>
        <div className='table '>
          <h1>Unreaded Books</h1>
          {books
            .filter(book =>
              book.title.toLowerCase().includes(query.toLowerCase())
            )
            .slice(pageStart, pageEnd)
            .map(book => (
              <ul className='d-flex' key={book.id}>
                {edit && id === book.id ? (
                  <Edit
                    title={title}
                    book={book}
                    onEditBook={onEditBook}
                    onReadBook={onReadBook}
                    onDeleteBook={onDeleteBook}
                    onChange={onChange}
                    isTrue={true}
                  />
                ) : (
                  <Read
                    book={book}
                    onEditBook={onEditBook}
                    onReadBook={onReadBook}
                    onDeleteBook={onDeleteBook}
                    onChange={onChange}
                    isTrue={true}
                  />
                )}
              </ul>
            ))}
          <div className='flex-buttons'>
            {pageStart !== 0 && (
              <button
                className='btn-prev'
                onClick={() => {
                  setPageStart(state => state - 7);
                  setPageEnd(state => state - 7);
                }}
              >
                Prev
              </button>
            )}
            {pageEnd < books.length && (
              <button
                className='btn-next'
                onClick={() => {
                  setPageStart(state => state + 7);
                  setPageEnd(state => state + 7);
                }}
              >
                Next
              </button>
            )}
          </div>
        </div>

        <div className='table'>
          <h1>Readed Books</h1>
          {readed
            .filter(book =>
              book.title.toLowerCase().includes(query.toLowerCase())
            )
            .map((book, idx) => (
              <ul className='d-flex' key={book.id}>
                {edit && id === book.id ? (
                  <Edit
                    title={title}
                    book={book}
                    onEditBook={onEditBook}
                    onReadBook={onReadBook}
                    onDeleteBook={onDeleteBook}
                    onChange={onChange}
                    isTrue={false}
                  />
                ) : (
                  <>
                    <Read
                      book={book}
                      onEditBook={onEditBook}
                      onReadBook={onReadBook}
                      onDeleteBook={onDeleteBook}
                      onChange={onChange}
                      isTrue={false}
                    />
                  </>
                )}
              </ul>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
