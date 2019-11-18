import React, { Component } from 'react';
import {Redirect} from  'react-router-dom';

export default class principal extends Component {
    constructor(){
        super();
            this.state={
               
                nombre:"daniel"
            }
            //this.CerrarSesion.bind(this);
        }
    StyleFrameMaps(){
        return {
            "width":"600px",
            "height":"450px",
            "border":"0",
            "frameBorder":"0",
            "allowFullScreen":"",
            "position":"relative",
            "margin":"auto"
            
        }
    }
    render() {
        if(localStorage.getItem("setAuthenticated")!==null){
            console.log("gaaaa principal");
            return <Redirect to='/profile'></Redirect>
        };
        return (
            
            <div>
                <h1>Bienvenido al ejemplo chat de prueba</h1>
                <p>Contact : daniechoque159@gmail.com </p>
                <p>Github : WasauskyOK</p>
                <p>Localizacion de Investigación</p>
                <div style={{width:"100vw",display:"flex"}}>
                    <iframe title="Localización de estudios"
                         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902.9125454851396!2d-77.00761298536557!3d-11.980553091511394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c5639b5e5631%3A0x92e4873e7f233e35!2sCIBERTEC!5e0!3m2!1ses-419!2spe!4v1574087520652!5m2!1ses-419!2spe"
                        style={this.StyleFrameMaps()} >
                    </iframe>
                </div>
              
            </div>
        )
    }
}
