import type { Community } from "./Communities.interface";

export interface UserContextType {
    user: any;
    token: string | null;
    isValid: boolean | null;
    login: (token: string) => void;
    logout: () => void;
    validateToken: () => Promise<void>;
}

export interface UserCreate {
    email: string;
    password: string;
    display_name: string;
}
export interface UserCommunities {
    communities: Community[];
    display_name: string;
    id: number;
    joined: string;
}