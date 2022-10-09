import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    currentSongs: [],
    currentIndex: 0,
    isActive: false,
    isPlaying: false,
    activeSong: {},
    genreListId: ''
};

//  defines a piece of data with a name, state, and update functions (aka reducers)
const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setActiveSong: (state, action) => {
            let payload = action.payload;

            state.activeSong = payload.song;

            if (payload?.data?.tracks?.hits) {
                state.currentSongs = payload.data.tracks.hits;
            }
            else if (payload?.data?.properties) {
                state.currentSongs = payload?.data?.tracks;
            }
            else {
                state.currentSongs = payload.data;
            }

            state.currentIndex = payload.index;
            state.isActive = true;
        },
        nextSong: (state, action) => {
            let payload = action.payload;

            if (state.currentSongs[payload]?.track) {
                state.activeSong = state.currentSongs[payload]?.track;
            }
            else {
                state.activeSong = state.currentSongs[payload];
            }

            state.currentIndex = payload;
            state.isActive = true;
        },
        prevSong: (state, action) => {
            let payload = action.payload;

            if (state.currentSongs[payload]?.track) {
                state.activeSong = state.currentSongs[payload]?.track;
            }
            else {
                state.activeSong = state.currentSongs[payload];
            }

            state.currentIndex = payload;
            state.isActive = true;
        },
        playPause: (state, action) => {
            state.isPlaying = action.payload;
        },
        selectGenreListId: (state, action) => {
            state.genreListId = action.payload;
        }
    }
});

//  exports the reducers as actions/functions
export const { setActiveSong, nextSong, prevSong, playPause, selectGenreListId } = playerSlice.actions;

export default playerSlice.reducer;