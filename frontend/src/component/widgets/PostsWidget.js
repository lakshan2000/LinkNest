import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../../state';
import PostWidget from './PostWidget';

const PostsWidget = ({userId, isProfile= false}) => {
    const dispatch= useDispatch();
    const posts= useSelector((state) => state.posts);
    const token= useSelector((state) => state.token);
    

    const getPosts= async () => {
        const res= await fetch(
            "http://localhost:3001/posts",
            {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`},
            }
        );
        const data= await res.json();
        // Sort posts by createdAt in descending order
        const sortedPosts = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        dispatch(setPosts({ posts: sortedPosts }));
    }

    const getUserPosts= async () => {
        const res= await fetch(
            `http://localhost:3001/posts/${userId}/posts`,
            {
                method: "GET",
                headers: {Authorization: `Bearer ${token}`},
            }
        );
        const data= await res.json();
        // Sort posts by createdAt in descending order
        const sortedPosts = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        dispatch(setPosts({ posts: sortedPosts }));
    }

    useEffect(() => {
        if(isProfile){
            getUserPosts();
        }else{
            getPosts();
        }
    }, []);

  return (
    <>
        {posts.map(
            ({
              _id,
              userId,
              firstName,
              lastName,
              description,
              location,
              picturePath,
              userPicturePath,
              likes,
              comments,  
              createdAt
            }) => (
                <PostWidget
                    key= {_id}
                    postId= {_id}
                    postUserId= {userId}
                    name= {`${firstName} ${lastName}`}
                    description= {description}
                    location= {location}
                    picturePath= {picturePath}
                    userPicturePath= {userPicturePath}
                    likes= {likes}
                    comments= {comments}
                />
            )
        )}
    </>
  )
}

export default PostsWidget;