import { inject, reactive, readonly, type App } from "vue";

import {
  getAuth,
  onAuthStateChanged,
  type User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const authStoreSymbol = "authStore";

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

    this.userFetch();
  }

  install(app: App) {
    app.provide(authStoreSymbol, this);
  }

  async getState() {
    await this.userFetch();
    return readonly(this.state);
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

  userFetch() {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(
        getAuth(),
        (user) => {
          this.state.user = user;
          this.state.isAuthenticated = !!user;
          resolve(user);
        },
        (error) => {
          this.state.error = error;
          reject(error);
        }
      );
    });
  }
}

export const useAuthStore = (): AuthStore => {
  const authStore = inject<AuthStore>(authStoreSymbol);

  if (!authStore) {
    throw new Error("authStore must be provide");
  }

  return authStore;
};
