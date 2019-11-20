import React, { Component } from 'react'
import '../styles/style.css'
export default class Messagestotal extends Component {
    
    StylesGroup(){
        return{
            "height":"400px",
            
            "marginBottom":"10px"
        }
    }
    render() {
        return (
            
                <div className="list-group content-mensajes" style={this.StylesGroup()}>
                   {
                       this.props.ArrayMessages.map((item,i)=>{
                        return(
                            <div  className="list-group-item list-group-item-action active mb-2 bg-dark" key={i}>
                            <div className="d-flex w-100 justify-content-between">
                                   {
                                       (item.email===window.localStorage.getItem("correoactivo"))?
                                       <h5 className="mb-1">Yo</h5>
                                       :
                                       <h5 className="mb-1">{item.email}</h5>
                                   }
                                    
                                    
                                    <small>{item.hora}</small>
                            </div>
                                <p className="mb-1">{item.msj}</p>
                                <small>Mensaje seguro</small>
                        </div>
                        )
                       })
                   }
                  
                </div>
          
        )
    }
}
