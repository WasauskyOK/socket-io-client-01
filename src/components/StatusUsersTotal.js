import React, { Component } from 'react'

export default class StatusUsersTotal extends Component {
    render() {
        return (
            <ul className="list-group mb-3">
            {
                this.props.arregloListaUsuarios.map((item,i)=>{
                    return(
                        <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                    {item.email}
                    <span className="badge badge-primary badge-pill">{item.status}</span>
                    </li>
                    )
                })
            }
        </ul>
        )
    }
}
