export type User = {
    id: string
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string
};
export type Action = {
    type: 'CREATE' | 'UPDATE' | 'DELETE',
    data: Partial<User>
}