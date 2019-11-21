import React, { Component } from 'react'

export default class StatusUsersTotal extends Component {
    render() {
        return (
            <ul className="list-group mb-3 col-md-6">
            {
                this.props.arregloListaUsuarios.map((item,i)=>{
                    return(
                        <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                    {item.email}
                    {
                    (item.status==="online")
                    ?
                    <span className="badge" style={{color:"green"}}>{item.status}<i style={{color:"green",fontSize:"1.2rem"}} className="fas fa-user-alt"></i></span>
                    :
                    <span className="badge" style={{color:"red"}}>{item.status}<i style={{color:"red",fontSize:"1.2rem"}} className="fas fa-user-alt-slash"></i></span>
                    
                    }
                   
                    </li>
                    )
                })
            }
            
        </ul>
        )
    }
}
