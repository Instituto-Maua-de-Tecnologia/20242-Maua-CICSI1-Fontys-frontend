import { create } from 'zustand';

type ProfileStore = {
    profilePictureUrl: string | null;
    setProfilePictureUrl: (url: string | null) => void;
};

export const useProfileStore = create<ProfileStore>((set) => ({
    profilePictureUrl: null,
    setProfilePictureUrl: (url) => {
        set({ profilePictureUrl: url });
    },
}));
