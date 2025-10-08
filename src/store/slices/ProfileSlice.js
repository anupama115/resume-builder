import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    location: "",
    github: "",
    linkedin: "",
    website: "",
    email: "",
    contact: "",
    position: "",
    tagline: ""
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfile(state, action) {
            const name = action.payload.name
            state[name] = action.payload?.value
        }
    }
})

export default profileSlice.reducer;
export const { setProfile } = profileSlice.actions  //exporting profilens 