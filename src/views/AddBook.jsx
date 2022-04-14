import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addBook } from '../store/bookSlice';

const AddBook = () => {
  const [books, setBooks] = useState({
    title: '',
  });

  const dispatch = useDispatch();

  const { title } = books;
  const titleChnageHandler = e => {
    setBooks(state => ({ ...state, [e.target.id]: e.target.value }));
  };

  const onSubmit = e => {
    e.preventDefault();

    if (!title) {
      return;
    }

    books.id = Math.random();

    dispatch(addBook(books));

    setBooks({ title: '', id: '', readed: false });
  };

  return (
    <div>
      <form className='form' onSubmit={onSubmit}>
        <input
          className='form-control'
          type='text'
          id='title'
          value={title}
          onChange={titleChnageHandler}
        />
        <button type='submit'>Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
