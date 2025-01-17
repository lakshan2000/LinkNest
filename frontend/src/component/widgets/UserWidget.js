import React,{useEffect, useState} from 'react';
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined
}from "@mui/icons-material";
import { Box, Typography, Divider, useTheme} from "@mui/material"
import UserImage from "../style/UserImage";
import FlexBetween from "../style/FlexBetween";
import WidgetWrapper from "../style/WidgetWrapper";
import { useSelector} from 'react-redux';
import { useNavigate} from "react-router-dom";

const UserWidget= ({userId, picturePath}) => {

  const [user, setUser] = useState(null);
  const { palette}= useTheme();
  const navigate= useNavigate();
  const token= useSelector((state) => state.token);
  const dark= palette.neutral.dark;
  const medium= palette.neutral.medium;
  const main= palette.neutral.main;

  const getUser = async() => {
    const res= await fetch(`http://localhost:3001/users/${userId}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}`},
    });
    const data= await res.json();
    setUser(data);
  };

  useEffect (() => {
    getUser();
  }, [])

  if(!user){
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <WidgetWrapper>
      <FlexBetween
        gap= "0.5rem"
        pb= "1.1rem"
        onClick= {() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap= "1rem">
          <UserImage image={picturePath}/>
          <Box>
            <Typography
              variant= "h4"
              color= {dark}
              fontWeight= "500"
              sx= {{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography  color= {medium}>{friends.length} Friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined/>
      </FlexBetween>

      <Divider/>

      <Box p= "1rem 0">
        <Box display= "flex" alignItems= "center" gap= "1rem" mb= "0.5rem">
          <LocationOnOutlined fontsize= "large" sx= {{color: main}} />
          <Typography color= {medium}>{location}</Typography>
        </Box>
        <Box display= "flex" alignItems= "center" gap= "1rem" mb= "0.5rem">
          <WorkOutlineOutlined fontSize= "large" sx= {{color: main}} />
          <Typography color= {medium}>{occupation}</Typography>
        </Box>
      </Box>  
      
      <Divider/>

      <Box p="1rem 0">
        <FlexBetween mb= "0.5rem">
          <Typography color= {medium}>Who's viewed your profile</Typography>
          <Typography color= {main} fontWeight= "500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween mb= "0.5rem">
          <Typography color= {medium}>Impressions of your post</Typography>
          <Typography color= {main} fontWeight= "500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider/>

      <Box p="1rem 0">
        <Typography fontSize= "1rem" color= {main} fontWeight= "500" mb= "0.5rem">Social Profiles</Typography>
        <FlexBetween gap= "1rem" mb= "0.5rem">
          <FlexBetween gap= "1rem">
            <img src="../assets/twitter.png" alt= "twitter"/>
            <Box>
              <Typography color= {main} fontWeight= "500">Twitter</Typography>
              <Typography color= {medium}>Social Netorks</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx= {{color: main}}/>
        </FlexBetween>
        <FlexBetween gap= "1rem">
          <FlexBetween gap= "1rem">
            <img src="../assets/linkedin.png" alt= "linkdIn"/>
            <Box>
              <Typography color= {main} fontWeight= "500">LinkdIn</Typography>
              <Typography color= {medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx= {{color: main}}/>
        </FlexBetween>
      </Box>

    </WidgetWrapper>
  )
}

export default UserWidget;