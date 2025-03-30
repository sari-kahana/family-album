import { Album, AlbumAction } from '../../Types';

export const initialAlbumsState: Album[] = [];
export const albumReducer = (state: Album[], action: AlbumAction): Album[] => {
    switch (action.type) {
        case 'SET_ALBUMS':
            return action.payload;
        case 'CREATE_ALBUM':
            return [...state, action.payload];
        case 'UPDATE_ALBUM':
            return state.map((album) =>
                album.id === action.payload.id ? { ...album, ...action.payload } : album
            );
        case 'DELETE_ALBUM':
            return state.filter((album) => album.id !== action.payload.id);
        default:
            return state;
    }
};