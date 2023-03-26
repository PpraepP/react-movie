import apiInstance from '../services'

export const useGetMovies = async ({onSuccess, onError}) => {
    const res = await apiInstance.movies.getMovies()
    console.log('useGetMovies', {res})
    if(res?.movies && res?.movies.length > 0) {
        onSuccess?.(res)
    } else {
        onError?.(res)
    }
}