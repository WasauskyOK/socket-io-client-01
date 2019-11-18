import React from 'react'
import  Navigation from  './navigation'

const  layoutnavigationsignsignin=  (props)  =>{

    return (
        <React.Fragment>
            <Navigation/>
            {props.children}
        </React.Fragment>
    );
}
export default  layoutnavigationsignsignin;