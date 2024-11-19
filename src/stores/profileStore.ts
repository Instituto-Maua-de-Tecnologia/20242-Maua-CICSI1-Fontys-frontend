import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type ProfileStore = {
    profilePictureUrl: string | null;
    setProfilePictureUrl: (url: string | null) => void;
};

export const useProfileStore = create(
    persist<ProfileStore>(
        (set, get) => ({
            profilePictureUrl: null,
            setProfilePictureUrl: (url) => {
                set({ profilePictureUrl: url });
                console.log('Profile picture URL set:', get().profilePictureUrl);
            },
        }),
        {
            name: 'profile-store',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);