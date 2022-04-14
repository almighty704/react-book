import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  readBook,
  deleteBook,
  deleteOnReadBook,
  editBook,
  editReadBook,
} from '../store/bookSlice';

const Home = () => {
  const [title, setTitle] = useState('');
  const [id, setId] = useState(false);
  const [edit, setEdit] = useState(false);
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

    if (book.title === title) return;

    setTitle(book.title);

    const bookx = { ...book };

    if (isTrue) {
      bookx.title = title;
      dispatch(editReadBook({ id, bookx }));
    } else {
      bookx.title = title;
      dispatch(editBook({ id, bookx }));
    }
  };

  const onChange = e => {
    setTitle(e.target.value);
  };

  return (
    <div className='flex'>
      <div className='table'>
        <h1>Unreaded Books</h1>
        {books.slice(0, 10).map(book => (
          <ul className='d-flex' key={book.id}>
            {edit && id === book.id ? (
              <>
                <input type='text' value={title} onChange={onChange} />
                <div className='btn-control'>
                  <button onClick={() => onReadBook(book.id)} className='read'>
                    Read
                  </button>
                  <button
                    onClick={() => onDeleteBook(book.id, true)}
                    className='read'
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      onEditBook(book.id, book);
                    }}
                    className='read'
                  >
                    Save
                  </button>
                </div>
              </>
            ) : (
              <>
                <li>{book.title}</li>
                <div className='btn-control'>
                  <button onClick={() => onReadBook(book.id)} className='read'>
                    Read
                  </button>
                  <button
                    onClick={() => onDeleteBook(book.id, true)}
                    className='read'
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      onEditBook(book.id, book);
                    }}
                    className='read'
                  >
                    Edit
                  </button>
                </div>
              </>
            )}
          </ul>
        ))}
      </div>

      <div className='table'>
        <h1>Readed Books</h1>
        {readed.map((book, idx) => (
          <ul className='d-flex' key={book.id}>
            {edit ? (
              <>
                <input type='text' value={title} onChange={onChange} />
                <div className='btn-control'>
                  <button
                    onClick={() => onDeleteBook(book.id, false)}
                    className='read'
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      onEditBook(book.id, book, true);
                    }}
                    className='read'
                  >
                    Save
                  </button>
                </div>
              </>
            ) : (
              <>
                <li>{book.title}</li>
                <div className='btn-control'>
                  <button
                    onClick={() => onDeleteBook(book.id, false)}
                    className='read'
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      onEditBook(book.id, book, true);
                    }}
                    className='read'
                  >
                    Edit
                  </button>
                </div>
              </>
            )}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Home;
