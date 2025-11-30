import { useContext } from "react";
import { UIContext } from "../context/UIContext";

export default function useUI() {
  return useContext(UIContext);
}
