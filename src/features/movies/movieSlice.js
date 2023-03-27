import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
    name: 'movie',
    initialState: {
        movies: [],
    },
    reducers: {
        saveMovies: (state, action) => {
            state.movies = [...action.payload]
        },
        handleFavoriteMovie: (state, action) => {
            state.movies = state.movies.map(movie => {
                if(movie.id === action.payload) {
                    movie.isFavorite = !movie.isFavorite
                }
                return movie
            })
        },
        clearFavoriteMovies: (state) => {
            state.movies = state.movies.map((movie) => ({...movie, isFavorite: false}))
        }
    }
})

export const { saveMovies, handleFavoriteMovie, clearFavoriteMovies } = movieSlice.actions
export default movieSlice.reducer