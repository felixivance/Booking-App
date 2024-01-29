import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InterfaceUserState{
    user: null;
    isAuthenticated: boolean;

}

const initialState : InterfaceUserState = {
    user: null,
    isAuthenticated: false,
}

export const userSlice = createSlice({
    initialState,
    name: "userSlice",
    reducers: {
        setUser: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
            
        },
        setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        }
    }
})

export default userSlice.reducer;

export const { setUser, setIsAuthenticated } = userSlice.actions;