import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StorageType } from "../types/enum";
import { LocalStorage, NotiesType, UserState } from "../utils/LocalStorage";

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
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.listNoties = action.payload.listNoties;
      LocalStorage("setItem", StorageType.ActiveUser, action.payload);
    },
    setListNoties(state, action: PayloadAction<NotiesType>) {
      console.log(action.payload);
      if (!state.listNoties) {
        state.listNoties = [];
      }
      state.listNoties = [...state.listNoties, action.payload];
      LocalStorage("setItem", StorageType.ActiveUser, {
        username: state.username,
        email: state.email,
        password: state.password,
        listNoties: state.listNoties,
      });
    },
    deliteUser(state, action) {
      console.log(action);
      const getActiveUser = (): UserState[] => {
        const activeUser = LocalStorage("getItem", StorageType.ListUsers);
        return activeUser
          ? JSON.parse(activeUser)
          : {
              username: null,
              email: null,
              password: null,
              listNoties: [],
            };
      };
      const ListUsersArr = getActiveUser();
      console.log(ListUsersArr);

      const findListUsers = ListUsersArr.find(
        (item) => item.email === state.email
      );

      if (findListUsers) {
        findListUsers.listNoties = action.payload;
      }
      if (ListUsersArr) {
        LocalStorage("setItem", StorageType.ListUsers, ListUsersArr);
      }

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
