// ~/interfaces/defaults.ts

import type { UserCommunities } from './UserContext.interface';
import type { Community } from './Communities.interface';




export const createDefaultUserCommunities = (): UserCommunities => ({
    communities: [],
    display_name: '',
    id: 0,
    joined: ''
});

export const createDefaultCommunity = (): Community => ({
    id: 0,
    name: '',
    open: false,
    private: false,
    discord_webhook: '',
    banner: '',
    created: '',
    discord: '',
    photo: '',
});

