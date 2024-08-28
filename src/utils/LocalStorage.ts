export interface NotiesType {
  day: number;
  month: number;
  year: number;
  title: string;
  description: string;
}

export interface UserState {
  username: string | null;
  email: string | null;
  password: string | null;
  listNoties?: NotiesType[] | [];
}

export const LocalStorage = (
  method: string,
  type: string,
  data?: UserState | UserState[]
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
