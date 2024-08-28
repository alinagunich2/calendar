import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StorageType } from "../types/enum";
import { LocalStorage, UserState } from "../utils/LocalStorage";

const activeUser = LocalStorage("getItem", StorageType.ActiveUser); //storageGetActiveUser();
const initialState: UserState = activeUser
  ? JSON.parse(activeUser)
  : {
      username: null,
      email: null,
      password: null,
      listNoties: [],
    };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      console.log(action.payload, "action.payload.listNoties");
      console.log(action.payload.listNoties, "action.payload.listNoties");
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.listNoties = action.payload.listNoties;
      LocalStorage("setItem", StorageType.ActiveUser, action.payload);
    },
    setListNoties(state, action: PayloadAction<UserState>) {
      state.listNoties = action.payload.listNoties;
      LocalStorage("setItem", StorageType.ActiveUser, action.payload);
    },
    deliteUser(state) {
      state.username = null;
      state.email = null;
      state.password = null;
      state.listNoties = [];
      LocalStorage("removeItem", StorageType.ActiveUser);
    },
  },
});
export const { setUser, setListNoties, deliteUser } = userSlice.actions;
export default userSlice.reducer;
