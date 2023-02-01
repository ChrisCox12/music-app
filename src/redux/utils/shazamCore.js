import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        //baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', process.env.REACT_APP_SHAZAMCORE_API_KEY);

            return headers;
        }
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({
            query: () => 'https://shazam-core.p.rapidapi.com/v1/charts/world'
        }),
        getSongDetails: builder.query({
            query: ({ songId }) => `https://shazam-core.p.rapidapi.com/v1/tracks/details?track_id=${songId}`
        }),
        getRelatedSongs: builder.query({
            query: ({ songId }) => `https://shazam-core.p.rapidapi.com/v1/tracks/related?track_id=${songId}`
        }),
        getArtistDetails: builder.query({
            query: ({ artistId }) => `https://shazam-core.p.rapidapi.com/v2/artists/details?artist_id=${artistId}` 
        }),
        getSongsByCountry: builder.query({
            query: ({ countryCode }) => `https://shazam-core.p.rapidapi.com/v1/charts/country?country_code=${countryCode}`
        }),
        getSongsByGenre: builder.query({
            query: ({ genreCode }) => `https://shazam-core.p.rapidapi.com/v1/charts/genre-world?genre_code=${genreCode}`
        }),
        getSongsBySearch: builder.query({
            query: ({ searchTerm }) => `https://shazam-core.p.rapidapi.com/v1/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`
        })
    })
});


export const {
    useGetTopChartsQuery,
    useGetSongDetailsQuery,
    useGetRelatedSongsQuery,
    useGetArtistDetailsQuery,
    useGetSongsByCountryQuery,
    useGetSongsByGenreQuery, 
    useGetSongsBySearchQuery
} = shazamCoreApi;