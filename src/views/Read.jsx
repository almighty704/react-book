import React from 'react';

const Read = ({ book, onReadBook, onDeleteBook, onEditBook, isTrue }) => {
  return (
    <>
      <li className='list-item'>{book.title}</li>
      <div className='btn-control'>
        {isTrue && (
          <button onClick={() => onReadBook(book.id, isTrue)} className='read'>
            Read
          </button>
        )}
        <button onClick={() => onDeleteBook(book.id, isTrue)} className='read'>
          Delete
        </button>
        <button
          onClick={() => {
            onEditBook(book.id, book, isTrue);
          }}
          className='read'
        >
          Edit
        </button>
      </div>
    </>
  );
};

export default Read;
