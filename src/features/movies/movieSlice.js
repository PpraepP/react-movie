import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
    name: 'movie',
    initialState: {
        movies: [],
        favoriteMovies: []
    },
    reducers: {
        saveMovies: (state, action) => {
            state.movies = [...action.payload]
            console.log('saveMovies', state.movies)
        },
        handleFavoriteMovie: (state, action) => {
            const duplicateMovie = state.favoriteMovies.find((movie) => movie.id === action.payload.id)

            if(!duplicateMovie) {
                state.favoriteMovies = state.favoriteMovies.concat(action.payload)
            } else {
                state.favoriteMovies = state.favoriteMovies.filter(movie => movie.id !== action.payload.id)
            }

            console.log('saveFavoriteMovie', state.favoriteMovies)
        },
        clearFavoriteMovies: (state) => {
            state.favoriteMovies = []
        }
    }
})

export const { saveMovies, handleFavoriteMovie, clearFavoriteMovies } = movieSlice.actions
export default movieSlice.reducer