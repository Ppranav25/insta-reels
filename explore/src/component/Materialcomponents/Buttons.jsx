import React from 'react'
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
function Buttons() {
    return (
        <div>
            <Button variant= "contained" color="primary" style ={{
                marginLeft:"8px",
                backgroundColor:"black"
            }}>Hello</Button>
            <Button variant= "outlined" color="primary">Hello</Button>
            <Button variant= "text" color="primary">Hello</Button>
            <h1>ICONS</h1>
            <Button color= "primary"><SendIcon></SendIcon></Button>
              <IconButton><DeleteIcon></DeleteIcon></IconButton>
        </div>
    )
}

export default Buttons
