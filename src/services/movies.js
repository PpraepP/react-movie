import { api } from './api'

const getMovies = async () => {
    try {
        const url = 'get_movie_avaiable'
        const res = await api.get(url)
        return res.data
    } catch (err) {
        console.log({err})
        return err
    }
}

export default {
    getMovies
}