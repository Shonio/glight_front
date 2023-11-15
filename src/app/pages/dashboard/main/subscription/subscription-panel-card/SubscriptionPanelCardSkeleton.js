import {Skeleton} from '@mui/material';
import React from 'react'
import './subscription-panel-card.css'

const SubscriptionPanelCardSkeleton = () => {
    return (
        <div className='writeOffsCard'>
            <div className='writeOffsCard__nameStation'>
                <Skeleton animation='wave' height={24} width={100}/>
                <Skeleton animation='wave' height={24} width={80}/>
            </div>

            <Skeleton animation='wave' height={24} width={100}/>
            <Skeleton animation='wave' height={24} width={100}/>

            <Skeleton animation='wave' height={24} width='100%' />
        </div>
    )
}

export default SubscriptionPanelCardSkeleton
