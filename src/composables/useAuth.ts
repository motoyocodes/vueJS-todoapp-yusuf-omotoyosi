import { ref } from "vue";

const isAuthenticated = ref(false);

export function useAuth() {
  const login = (_username: string, _password: string): boolean => {
    // Accept any username and password for now
    isAuthenticated.value = true;
    return true;
  };

  const logout = (): void => {
    isAuthenticated.value = false;
  };

  return {
    isAuthenticated,
    login,
    logout,
  };
}
