import React, { Component } from 'react'

export default class Messagestotal extends Component {
    
    StylesGroup(){
        return{
            "height":"400px",
            "overflow":"auto",
            "marginBottom":"10px"
        }
    }
    render() {
        return (
            <div>
                <div className="list-group" style={this.StylesGroup()}>
                   {
                       this.props.ArrayMessages.map((item,i)=>{
                        return(
                            <div  className="list-group-item list-group-item-action active mb-2" key={i}>
                            <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">{item.email}</h5>
                                    <small>{item.hora}</small>
                            </div>
                                <p className="mb-1">{item.msj}</p>
                                <small>Mensaje seguro</small>
                        </div>
                        )
                       })
                   }
                  
                </div>
            </div>
        )
    }
}
