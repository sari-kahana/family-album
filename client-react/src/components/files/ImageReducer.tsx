import { Image, ImageAction} from '../../Types';

export const initialImageState: Image[] = [];
export const imageReducer = (state: Image[], action: ImageAction): Image[] => {
    switch (action.type) {
        case 'SET_IMAGES':
            return action.payload;
        case 'CREATE_IMAGE':
            return [...state, action.payload];
        case 'UPDATE_IMAGE':
            return state.map((image) =>
                image.id === action.payload.id ? { ...image, ...action.payload } : image
            );
        case 'DELETE_IMAGE':
            return state.filter((image) => image.id !== action.payload.id);
        default:
            return state;
    }
};