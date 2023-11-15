import * as React from 'react';
import {Typography} from "@mui/material";

function EmptyDataState({message}) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
        }}>

            <div style={{
                width: '189px', textAlign: 'center',
            }}>
                <img src={'assets/images/history-img.png'} alt="history-img"/>
                <Typography
                    sx={{
                        color: '#212B36',
                    }}
                >{message}</Typography>
            </div>
        </div>
    );
}

export default EmptyDataState;
