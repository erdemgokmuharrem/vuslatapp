import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Yerel profil.
 *
 * Uygulamanın sunucu tarafı yoktur; görünen ad yalnızca cihazda saklanır ve
 * hiçbir yere gönderilmez. Bu yüzden hesap açma, giriş ya da şifre gibi
 * kavramlar bulunmaz.
 */
interface ProfileState {
  displayName: string;
  setDisplayName: (displayName: string) => void;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      displayName: '',
      setDisplayName: (displayName) => set({ displayName: displayName.trim() }),
      clearProfile: () => set({ displayName: '' }),
    }),
    {
      name: 'profile-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useProfileStore;
