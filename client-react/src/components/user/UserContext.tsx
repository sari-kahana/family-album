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
        isConnected: action.data.isConnected ?? state.isConnected,
      };

    case "UPDATE":
      return {
        ...state,
        ...action.data,
      };

    case "DELETE":
      return emptyUser;

    case "LOGIN":
      return { ...state, isConnected: true };
      
    case "LOGOUT":
      return { ...state, isConnected: false };

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
};

export const UserContext = createContext<{
  user: User;
  dispatch: React.Dispatch<Action>;
}>({
  user: emptyUser,
  dispatch: () => { },
});

const MyUserContext = ({ children }: { children: React.ReactNode }) => {
  const [user, dispatch] = useReducer(userReducer, emptyUser);
  return (
    <UserContext value={{ user, dispatch }}>
      {children}
    </UserContext>
  );
};
export default MyUserContext;