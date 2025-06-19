export type User = {
    id: string
    name: string,
    email: string,
    password: string,
    phone: string,
    isConnected: boolean
};
export type Image = {
    id: number,
    name: string,
    s3URL: string
    albumId: number,
    ownerId: number,
    description: string
}
export type Action = {
    type: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT',
    data: Partial<User>
}
export type Album = {
    id: number,
    name: string,
    images: Image[],
    createdAt: string,
    userId: number
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
    | { type: 'DELETE_ALBUM'; payload: { albumId: number } };    