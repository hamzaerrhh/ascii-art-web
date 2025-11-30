import AuthProvider from "./AuthProvider";
import UIProvider from "./UIProvider";
import ConfigProvider from "./ConfigProvider";

export function AllProviders({ children }) {
  return (
    <ConfigProvider>
      <UIProvider>
        <AuthProvider>{children}</AuthProvider>
      </UIProvider>
    </ConfigProvider>
  );
}
