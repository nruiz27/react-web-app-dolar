import React from 'react';
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";


export default function BackdropLoader (props) {
    return (
        <Backdrop className="backdrop-custom" open={props.loading}>
            <div className='loader-text'>
                <CircularProgress color="inherit" />
            </div>
        </Backdrop>
    )
}