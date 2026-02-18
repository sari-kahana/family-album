import { createContext, useReducer } from "react";
import { Action, User } from "../../Types";

const userReducer = (state: User, action: Action): User => {
  switch (action.type) {
    case "CREATE":
      return {
        ...state,
        id: action.data.id ?? state.id,
        name: action.data.name ?? state.name,
        email: action.data.email ?? state.email,
        password: action.data.password ?? state.password,
        phone: action.data.phone ?? state.phone,
        roles: action.data.roles ?? state.roles,
        isConnected: true
      };

    case "UPDATE":
      return {
        ...state,
        ...action.data,
      };

    case "DELETE":
      return emptyUser;

    case "LOGIN":
      return {
        ...state,
        ...action.data,
        isConnected: true
      };

    case "LOGOUT":
      return emptyUser;

    default:
      return state;
  }
};

export const emptyUser: User = {
  id: "",
  name: "",
  email: "",
  password: "",
  phone: "",
  isConnected: false,
  roles: [],
};

const getInitialUser = (): User => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const roles = localStorage.getItem("roles");

  if (token && userId) {
    return {
      ...emptyUser,
      id: userId,
      roles: roles ? JSON.parse(roles) : [],
      isConnected: true,
    };
  }
  return emptyUser;
};

export const UserContext = createContext<{
  user: User;
  dispatch: React.Dispatch<Action>;
}>({
  user: emptyUser,
  dispatch: () => { },
});

const MyUserContext = ({ children }: { children: React.ReactNode }) => {
  const [user, dispatch] = useReducer(userReducer, getInitialUser());
  return (
    <UserContext value={{ user, dispatch }}>
      {children}
    </UserContext>
  );
};
export default MyUserContext;
