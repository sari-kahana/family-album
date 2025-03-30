import Avatar from '@mui/material/Avatar';
import { UserContext } from './UserContext';
import { Stack, Typography } from '@mui/material';
import React, { useContext } from 'react';


const NameAvatar = () => {
    function stringToColor(string: string) {
        let hash = 0;
        let i;

        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        return color;
    }

    function stringAvatar(name: string) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}`
        };
    }

    const { user } = useContext(UserContext)
    console.log(user);

    return (<>
        <Stack direction="column" spacing={2} sx={{ position: "fixed", top: 10, left:10}}>
            <Avatar {...stringAvatar(user.name)} />
            {user.name}
        </Stack>
    </>)

}
export default NameAvatar;