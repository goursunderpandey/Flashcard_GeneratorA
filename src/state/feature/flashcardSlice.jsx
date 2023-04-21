import { createSlice } from "@reduxjs/toolkit";

// The initial state of the flashcardSlice is set to the data retrieved from local storage
const initialState = {
    flashcards: localStorage.getItem("flashcards")
    ? JSON.parse(localStorage.getItem("flashcards")) : [],
};


// This slice is responsible for generating action types and action creators that
//  correspond to the reducers and state defined in the slice
export const flashcardSlice = createSlice({
    name: "flashcard",
    initialState,
    reducers: {
        setFlashCard(state , action) {
            state.flashcards.push({
                card: action.payload
            })

            localStorage.setItem("flashcards", JSON.stringify(state.flashcards));

        }
    }
});

export const { setFlashCard } = flashcardSlice.actions;

export default flashcardSlice.reducer;