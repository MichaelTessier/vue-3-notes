import { ref, onMounted, computed } from "vue";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";

export const useAuthState = () => {
  const user = ref<User | null>(null);
  const error = ref<Error | null>(null);
  const auth = getAuth();
  const isAuthenticated = computed(() => user.value !== null);

  onMounted(() => {
    onAuthStateChanged(
      auth,
      (_user) => (user.value = _user),
      (_error) => (error.value = _error)
    );
  });

  return {
    user,
    error,
    isAuthenticated,
  };
};
