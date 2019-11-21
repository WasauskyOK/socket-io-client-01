import React, { Component } from 'react';
import  ClientIO from 'socket.io-client';
import  MessagesTotal from './messagestotal';
import M from 'materialize-css';
import {Redirect,Link} from 'react-router-dom';
import  ListUsersStatus  from './StatusUsersTotal';
//import   'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css';

//import { makeStyles } from '@material-ui/core/styles';
//import Button from '@material-ui/core/Button';
// import PropTypes from 'prop-types';
// import clsx from 'clsx';
// import Button from '@material-ui/core/Button';

// import CheckCircleIcon from '@material-ui/icons/CheckCircle';
// import ErrorIcon from '@material-ui/icons/Error';
// import InfoIcon from '@material-ui/icons/Info';
// import CloseIcon from '@material-ui/icons/Close';
// import { amber, green } from '@material-ui/core/colors';
// import IconButton from '@material-ui/core/IconButton';
// import Snackbar from '@material-ui/core/Snackbar';
// import SnackbarContent from '@material-ui/core/SnackbarContent';
// import WarningIcon from '@material-ui/icons/Warning';
// import { makeStyles } from '@material-ui/core/styles';

// const variantIcon = {
//   success: CheckCircleIcon
// };
// const useStyles1 = makeStyles(theme => ({
//   success: {
//     backgroundColor: green[600],
//   },
//   icon: {
//     fontSize: 20,
//   },
//   iconVariant: {
//     opacity: 0.9,
//     marginRight: theme.spacing(1),
//   },
//   message: {
//     display: 'flex',
//     alignItems: 'center',
//   },
// }));

// function MySnackbarContentWrapper(props) {
//   const classes = useStyles1();
//   const { className, message, onClose, variant, ...other } = props;
//   const Icon = variantIcon[variant];

//   return (
//     <SnackbarContent
//       className={clsx(classes[variant], className)}
//       aria-describedby="client-snackbar"
//       message={
//         <span id="client-snackbar" className={classes.message}>
//           <Icon className={clsx(classes.icon, classes.iconVariant)} />
//           {message}
//         </span>
//       }
//       action={[
//         <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
//           <CloseIcon className={classes.icon} />
//         </IconButton>,
//       ]}
//       {...other}
//     />
//   );
// }

// MySnackbarContentWrapper.propTypes = {
//   className: PropTypes.string,
//   message: PropTypes.string,
//   onClose: PropTypes.func,
//   variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
// };

// const useStyles2 = makeStyles(theme => ({
//   margin: {
//     margin: theme.spacing(1),
//   },
// }));

// function CustomizedSnackbars() {
//   const classes = useStyles2();
//   const [open, setOpen] = React.useState(false);

//   const handleClick = () => {
//     setOpen(true);
//   };

//   const handleClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }

//     setOpen(false);
//   };

//   return (
//     <div>
//       <Button variant="outlined" className={classes.margin} onClick={handleClick}>
//         Open success snackbar
//       </Button>
//       <Snackbar
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'left',
//         }}
//         open={open}
//         autoHideDuration={6000}
//         onClose={handleClose}
//       >
//         <MySnackbarContentWrapper
//           onClose={handleClose}
//           variant="success"
//           message="This va is a success message!"
//         />
//       </Snackbar>
  
   
//     </div>
//   );
// }

export default class  Globalchat extends Component {
    constructor(){
        super();
        this.state={
            Messages:[],
            email:"",
            msj:"",
            StatusUsers:[]
        }
       
        
        this.Changevars.bind(this);
        //React.createRef("nombre");
        
    }
    mensaje=React.createRef();
    componentDidMount(){
        // window.scrollTo(0,20);
        //this.clientIO=ClientIO("https://serverchatexample01.herokuapp.com/");
        this.clientIO=ClientIO("https://serverchatexample01.herokuapp.com/");
        this.UpdateStateOffLineOnLine();
        this.clientIO.emit('updatestatusoffline',{opcion:"refreshstatuslist"});
        this.clientIO.on('updateliststatus',async (data)=>{
            if(data.status==="udpateGlobal"){
                this.UpdateStateOffLineOnLine();
            }
        })
       // this.ConfigurateStatus();//actualizar estados
        this.clientIO.on("messageBroadcast",(data)=>{
            
            if(data.status==="Running"){
               
                 this.UpdateMessages();
                
            }
        });
        this.UpdateMessages();
        // this.clientIO.on('gretting',(data)=>{
        //     console.log("Saludo  : "+data.message);
        // });
        
    }
    // async ConfigurateStatus(){
      
       

    //   // this.clientIO.emit("pedirlistausuarios",{status:"GoLista"});

    // //   await this.clientIO.emit("pedirlistausuarios",{status:"GoLista"});
    // //   await this.clientIO.on("usuariosoffon",async (StatusUsers)=>{

    // //      // await this.setState({StatusUsers});
    // //     //  console.log("status state users",this.state.StatusUsers);
    // //       console.log(StatusUsers);
    // //       console.log("USUARIOS ACTIVOS E INACTIVOS");

    // //   });

        
    // }

    async UpdateStateOffLineOnLine(){
        const email=window.localStorage.getItem("correoactivo");
        const  data=await fetch(`https://serverchatexample01.herokuapp.com/liststatususer/${email}`);
        const StatusUsers=await  data.json();
        this.setState({StatusUsers});

    }

    async UpdateMessages(){
        const method=await  fetch('https://serverchatexample01.herokuapp.com/viewmessages');
       //const method=await  fetch('https://serverchatexample01.herokuapp.com/viewmessages');
       //const method=await  fetch('http://localhost:5000/viewmessages');
       
       const  Messages=await  method.json();
        this.setState({Messages});
        console.log(this.state);

    }
    async GoMessage(e){
        e.preventDefault();
        const {msj}=this.state;
        const  email=window.localStorage.getItem("correoactivo");
        const hora=`${new Date().getHours().toPrecision().toString()}:${new Date().getMinutes().toPrecision().toString()}:${new Date().getSeconds().toPrecision().toString()}  ${new Date().toDateString().toString()}`;
       await this.clientIO.emit('messageGlobal',{email,msj,hora});
       this.mensaje.current.value="";
       M.toast({html:`${email} acabas de agregar un nuevo mensaje`});
       this.UpdateMessages();
        
    }
    async Changevars(e){
     // eslint-disable-next-line 
        await this.setState({
            [e.target.name]:e.target.value
        });
        console.log(this.state);
    }
    // ConfigName(){
    //     let name=window.prompt('Escribe tu nombre o apodo Amigo');
    //     localStorage.setItem("NameUser",name);
    // }
    detailsbutton(){
        return{
            "height":"70px",
            "fontSize":"2rem",
            "textAlign":"center"
        }
    }
    
    async CerrarSesion(){

        // const email=window.localStorage.getItem('correoactivo')
        // await fetch('http://localhost:5000/statusofflineuser',{
        //     method:'PUT',
        //     headers:{
        //         "Content-Type":"application/json",
        //     },
        //     body:JSON.stringify({email})
        // })
        // .then(async  data=>{
        //     const {message}=await data.json();
           
        //     alert(message);
        // })
        // // .then(data=>{
        // //     alert(data.message);
        // // })
        // .catch(err=>{
        //     alert(err.message);
        // });
        const  email=window.localStorage.getItem("correoactivo");
        await  this.clientIO.emit('updatestatusoffline',{email,opcion:"offline"});
        await  localStorage.setItem("setAuthenticated",false);
        await localStorage.clear();
        sessionStorage.clear();  
        
       

        //window.localStorage.clear();
          this.props.history.push('/signin');
          //window.location.href="/signin";
      }
    render() {
        if(localStorage.getItem("setAuthenticated")===null){
            console.log("gaaaa");
            return <Redirect to='/signin'></Redirect>
        }; 
        return (

            <div className="fondoPantalla">
           
              <div>
                  <div className="d-flex bd-highlight bg-danger  mb-3">
                          <div className="mr-auto p-2 "><Link className="nav-link text-white" to="/profile">Usuario  Activo : {window.localStorage.getItem("correoactivo")}</Link></div>
                        <div className="p-2 bd-highlight">
                            <button className="btn  btn-danger text-white text-center" style={{height:"70px"}} onClick={this.CerrarSesion.bind(this)} >Cerrar Sesion</button>
                        </div>

                </div>
            
            </div>


                {M.AutoInit()}
                <div className="alert alert-primary mt-3 text-center bg-dark text-white"  role="alert">
                     <p>Example simple chat global (WasauskyOK)</p>
                     <p>contact : daniechoque159@gmail.com </p>
                </div>
               
                <div className="row">
                    <div className="col-12">
                            
                            {/* <input type="email" name="email" className="form-control mb-4 col-8" placeholder="Ingresa tu correo" onChange={this.Changevars.bind(this)}/>
                             */}
                    </div>
                    
                </div>


                            {
                                /*
                                    BLOQUE  INICIAL DE  CHAT  +LISTA DE USUARIOS CONECTADOS Y DESCONECTADOS
                                */
                            }
           <div className=" fondoPantalla mx-2">
                <div className="card-body">
                    <div className="row px-lg-2 px-2">
                        <ListUsersStatus arregloListaUsuarios={this.state.StatusUsers}/>
                         <MessagesTotal ArrayMessages={this.state.Messages}/>
                    </div>
                </div>
            </div>
                 
               
               {
                   /*
                        BLOQUE TERMINADO DE CHAT + LISTA DE USUARIOS 
                   */
               }
               
                <div className="row">
                    <div className="col-12">
                        <div style={{height:"15vh"}} className="form-group">
                             <form className="d-flex align-items-center" onSubmit={this.GoMessage.bind(this)}>      
                            <textarea style={{height:"100%"}} cols="20"  name="msj" ref={this.mensaje} onChange={this.Changevars.bind(this)} className="form-control  mr-5" placeholder="Escribe algo :D">
                            </textarea>
                            <button type="submit" style={this.detailsbutton()} className="btn btn-success col-3 font-weight-bold">Go</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}
