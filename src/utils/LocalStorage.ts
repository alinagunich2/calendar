export interface NotiesType {
  activeDay: string;
  month: string;
  year: string;
  title: string;
  description: string;
}

export interface UserState {
  username: string | null;
  email: string | null;
  password: string | null;
  listNoties?: NotiesType[];
}

export const LocalStorage = (
  method: string,
  type: string,
  data?: UserState | UserState[] | string
) => {
  switch (method) {
    case "getItem":
      return localStorage.getItem(type);
    case "setItem":
      localStorage.setItem(type, JSON.stringify(data));
      break;
    case "removeItem":
      localStorage.removeItem(type);
      break;
    default:
  }
};
