import React from 'react';

const Edit = ({
  title,
  book,
  onEditBook,
  onReadBook,
  onDeleteBook,
  onChange,
  isTrue,
}) => {
  return (
    <li className='list-item flex'>
      <input type='text' value={title} onChange={onChange} />
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
          Save
        </button>
      </div>
    </li>
  );
};

export default Edit;
