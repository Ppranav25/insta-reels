import { Container, Grid , Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import React from 'react'

function Griduse() {
const useStyle = makeStyles({
    size: {size : "10px",
           height: "30vh",
           backgroundColor: "green"
    }
});

const classes= useStyle();
    return (
        <div>
            <Container>
            <Grid container >
         
              <Grid item xs= {5} md = {11} >
                 <Paper  className= {classes.size}>Hello</Paper>
              </Grid>


            </Grid>




            </Container>
        </div>
    )
}

export default Griduse
