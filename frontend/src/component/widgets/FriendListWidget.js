import {useEffect} from 'react';
import Friend from '../Friend';
import WidgetWrapper from '../style/WidgetWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { setFriends } from '../../state';
import { Typography, useTheme, Box} from "@mui/material";

const FriendListWidget = ({userId}) => {
    const dispatch= useDispatch();
    const {palette}= useTheme();
    const token= useSelector((state) => state.token);
    const friends= useSelector((state) => state.user.friends);

    const getFriends= async () => {
        const res= await fetch(
            `http://localhost:3001/users/${userId}/friends`,
            {
                method: "GET",
                headers: {Authorization: `Bearer ${token}`},
            }
        );
        const data= await res.json();
        dispatch(setFriends({friends: data}));
    }

    useEffect(() =>{
        getFriends();
    }, [])

    return (
        <WidgetWrapper>
            <Typography
                colo= {palette.neutral.dark}
                variant= "h5"
                fontWeight= "500"
                sx= {{mb: "1.5rem"}}
            >
                freind List
            </Typography>

            <Box display= "flex" flexDirection= "column" gap= "1.5rem">
                {friends.map((friend) => (                    
                    <Friend
                        key= {friend._id}
                        friendId= {friend._id}
                        name= {`${friend.firstName} ${friend.lastName}`}
                        subtitle= {friend.occupation}
                        userPicturePath= {friend.picturePath}
                    />
                ))}
            </Box >
        </WidgetWrapper>
    )
}

export default FriendListWidget;