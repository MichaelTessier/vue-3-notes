import { reactive } from "vue";

import {
  getAuth,
  onAuthStateChanged,
  type Unsubscribe,
  type User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

interface AuthStoreState {
  user: User | null;
  error: Error | null;
  isAuthenticated: boolean;
}

export class AuthStore {
  state: AuthStoreState;

  constructor() {
    this.state = reactive({
      user: null,
      error: null,
      isAuthenticated: false,
    });

    this.unsubscribe();
  }

  isAuthenticated() {
    return !!this.state.user;
  }

  async login(email: string, password: string) {
    await signInWithEmailAndPassword(getAuth(), email, password);
  }

  async register(email: string, password: string) {
    await createUserWithEmailAndPassword(getAuth(), email, password);
  }

  async logout() {
    await signOut(getAuth());
  }

  private unsubscribe: Unsubscribe = () => {
    onAuthStateChanged(
      getAuth(),
      (user) => (this.state.user = user),
      (error) => (this.state.error = error)
    );
  };
}

export const useAuthStore = () => {
  return new AuthStore();
};
