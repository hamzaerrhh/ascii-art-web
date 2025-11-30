import { ConfigContext } from "@/contexts/ConfigContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import config from "../config";
import { useMemo } from "react";
export default function ConfigProvider({ children }) {
  const { state, setState, setField, resetState } = useLocalStorage(
    "pos-system-herrakuha",
    config
  );

  const memoizedValue = useMemo(
    () => ({ state, setState, setField, resetState }),
    [state, setState, setField, resetState]
  );

  return (
    <ConfigContext.Provider value={memoizedValue}>
      {children}
    </ConfigContext.Provider>
  );
}
