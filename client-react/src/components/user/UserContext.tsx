import { createContext, useReducer } from "react";
import { Action, User } from "../../Types";

const userReducer = (state: User, action: Action): User => {
  switch (action.type) {
    case "CREATE":
      console.log("create new user");
      return {
        ...state,
        id: action.data.id ?? state.id,
        name: action.data.name ?? state.name,
        email: action.data.email ?? state.email,
        password: action.data.password ?? state.password,
      };

    case "UPDATE":
      console.log("update");
      return {
        ...state,
        ...action.data,
      };

    case "DELETE":
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
};

export const UserContext = createContext<{
  user: User;
  dispatch: React.Dispatch<Action>;
}>({
  user: emptyUser,
  dispatch: () => {},
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