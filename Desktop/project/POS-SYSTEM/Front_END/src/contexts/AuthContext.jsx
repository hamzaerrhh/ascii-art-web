import {
  createContext,
  useReducer,
  useEffect,
  useMemo,
  useCallback,
  useState,
} from "react";
import Cookies from "js-cookie";
import axios from "axios";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  const [loading, setLoading] = useState(true); // Loading state

  const getData = useCallback(async () => {
    setLoading(true); // Set loading to true before fetching dataaa
    const token = Cookies.get("adminToken");

    if (token) {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URI}/api/v1/auth/admin/getData`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch({ type: "LOGIN", payload: res.data.admin });
      } catch (err) {
        console.error(err);
        dispatch({ type: "LOGOUT" });
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    } else {
      dispatch({ type: "LOGOUT" });
      setLoading(false); // Set loading to false if there's no token
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const contextValue = useMemo(
    () => ({ ...state, dispatch, loading, getData }),
    [state, loading, getData]
  );

  //to  do  edit loding
  return (
    <AuthContext.Provider value={contextValue}>
      {loading ? (
        <div className="w-full h-full flex flex-col justify-center items-center  animate-pulse">
          <p className="text-lg font-semibold text-gray-700">Loading...</p>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
