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
    <div className='flex'>
      <div className='table'>
        <h1>Unreaded Books</h1>
        {books.map(book => (
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
      </div>

      <div className='table'>
        <h1>Readed Books</h1>
        {readed.map((book, idx) => (
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
  );
};

export default Home;
