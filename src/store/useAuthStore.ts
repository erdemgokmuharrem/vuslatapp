import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  
  // Actions
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (displayName: string, photoURL: string | null) => Promise<void>;
  clearError: () => void;
}

// Mock authentication functions for demonstration
// In a real app, these would be replaced with Firebase or Supabase calls
const mockSignIn = async (email: string, password: string): Promise<User> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock validation
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
  
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }
  
  // Mock successful login
  return {
    id: 'user123',
    email,
    displayName: email.split('@')[0],
    photoURL: null,
  };
};

const mockSignUp = async (email: string, password: string, displayName: string): Promise<User> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock validation
  if (!email || !password || !displayName) {
    throw new Error('All fields are required');
  }
  
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }
  
  // Mock successful registration
  return {
    id: 'user123',
    email,
    displayName,
    photoURL: null,
  };
};

const mockResetPassword = async (email: string): Promise<void> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock validation
  if (!email) {
    throw new Error('Email is required');
  }
  
  // Mock successful password reset
  return;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,
      
      signIn: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const user = await mockSignIn(email, password);
          set({ user, isAuthenticated: true });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to sign in' });
        } finally {
          set({ isLoading: false });
        }
      },
      
      signUp: async (email: string, password: string, displayName: string) => {
        set({ isLoading: true, error: null });
        try {
          const user = await mockSignUp(email, password, displayName);
          set({ user, isAuthenticated: true });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to sign up' });
        } finally {
          set({ isLoading: false });
        }
      },
      
      signOut: async () => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call delay
          await new Promise(resolve => setTimeout(resolve, 500));
          set({ user: null, isAuthenticated: false });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to sign out' });
        } finally {
          set({ isLoading: false });
        }
      },
      
      resetPassword: async (email: string) => {
        set({ isLoading: true, error: null });
        try {
          await mockResetPassword(email);
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to reset password' });
        } finally {
          set({ isLoading: false });
        }
      },
      
      updateProfile: async (displayName: string, photoURL: string | null) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          set((state) => ({
            user: state.user ? {
              ...state.user,
              displayName,
              photoURL,
            } : null,
          }));
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to update profile' });
        } finally {
          set({ isLoading: false });
        }
      },
      
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
