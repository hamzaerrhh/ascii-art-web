import { useState } from "react";
import { UIContext } from "@/contexts/UIContext";

export default function UIProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success', message: '...' }

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <UIContext.Provider
      value={{
        theme,
        toggleTheme,
        sidebarOpen,
        toggleSidebar,
        toast,
        showToast,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}
