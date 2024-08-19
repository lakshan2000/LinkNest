import { Box,useMediaQuery} from '@mui/material'
import React from 'react'
import Navbar from '../component/Navbar.js'
import { useSelector } from 'react-redux';

const HomePage = () => {
  return (
    <Box>
      <Navbar/>
    </Box>
  )
}

export default HomePage;