export type User = {
    id: string
    name: string,
    email: string,
    password: string,
    phone: string
};
export type Image = {
    id: number,
    name: string,
    s3URL: string
}
export type Action = {
    type: 'CREATE' | 'UPDATE' | 'DELETE',
    data: Partial<User>
}
export type Album = {
    id: number,
    name: string,
    images: Image[]
}
export type ImageAction =
    | { type: 'SET_IMAGES'; payload: Image[] }
    | { type: 'CREATE_IMAGE'; payload: Image }
    | { type: 'UPDATE_IMAGE'; payload: Partial<Image> & { id: number } }
    | { type: 'DELETE_IMAGE'; payload: { id: number } };

export type AlbumAction = 
    | { type: 'SET_ALBUMS'; payload: Album[] }
    | { type: 'CREATE_ALBUM'; payload: Album }
    | { type: 'UPDATE_ALBUM'; payload: Partial<Album> & { id: number } }
    | { type: 'DELETE_ALBUM'; payload: { id: number } };    