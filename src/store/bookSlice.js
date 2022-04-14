import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [],
  readedBooks: [],
};
const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    addBook(state, action) {
      state.books.push(action.payload);
    },
    readBook(state, action) {
      state.readedBooks.push(
        ...state.books.filter(map => map.id === action.payload)
      );
      state.books = state.books.filter(map => map.id !== action.payload);
    },
    deleteBook(state, action) {
      const { id } = action.payload;
      state.books = state.books.filter(map => map.id !== id);
    },
    deleteOnReadBook(state, action) {
      const { id } = action.payload;
      state.readedBooks = state.readedBooks.filter(map => map.id !== id);
    },
    editBook(state, action) {
      const { id, bookx } = action.payload;

      state.books = state.books.map(item =>
        item.id === id ? { ...item, ...bookx } : item
      );
    },

    editReadBook(state, action) {
      const { id, bookx } = action.payload;
      console.log(bookx);
      state.readedBooks = state.readedBooks.map(item =>
        item.id === id ? { ...item, ...bookx } : item
      );
    },
  },
});

export const {
  addBook,
  readBook,
  deleteBook,
  deleteOnReadBook,
  editBook,
  editReadBook,
} = bookSlice.actions;

export default bookSlice.reducer;
