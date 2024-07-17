import { useReducer } from "react";
import { initialState, profileReducers } from "../reducers/ProfileReducers";
import { ProfileContext } from "../context";

const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducers, initialState);

  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
