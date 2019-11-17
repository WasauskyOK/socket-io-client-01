import React, { Component } from 'react'
import  ClientIO from 'socket.io-client';
import  MessagesTotal from './messagestotal';
import M from 'materialize-css';
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
            apodo:"",
            msj:""
        }
       
        
        this.Changevars.bind(this);
        //React.createRef("nombre");
        
    }
    mensaje=React.createRef();
    componentDidMount(){
        
        this.clientIO=ClientIO("https://serverchatexample01.herokuapp.com/");
        this.clientIO.on("messageBroadcast",async(data)=>{
            if(data.status==="Running"){
                 this.UpdateMessages();
            }
        });
        this.UpdateMessages();
        // this.clientIO.on('gretting',(data)=>{
        //     console.log("Saludo  : "+data.message);
        // });
    }
    async UpdateMessages(){
        const method=await  fetch('https://serverchatexample01.herokuapp.com/viewmessages');
        const  Messages=await  method.json();
        this.setState({Messages});
        console.log(this.state);

    }
    async GoMessage(e){
        e.preventDefault();
        const {apodo,msj}=this.state;
        const hora=`${new Date().getHours().toPrecision().toString()}:${new Date().getMinutes().toPrecision().toString()}:${new Date().getSeconds().toPrecision().toString()}  ${new Date().toDateString().toString()}`;
       await this.clientIO.emit('messageGlobal',{apodo,msj,hora});
       this.mensaje.current.value="";
       M.toast({html:`${apodo} acabas de agregar un nuevo mensaje`});
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
    render() {
        return (
            <div className="container">
                {M.AutoInit()}
                <div class="alert alert-primary mt-3 text-center bg-dark text-white"  role="alert">
                     <p>Example simple chat global (WasauskyOK)</p>
                     <p>contact : daniechoque159@gmail.com </p>
                </div>
               
                <div className="row">
                    <div className="col-12">
                            
                            <input type="text" name="apodo" className="form-control mb-4 col-8" placeholder="Ingresa tu apodo" onChange={this.Changevars.bind(this)}/>
                            
                    </div>
                    
                </div>
                <MessagesTotal ArrayMessages={this.state.Messages}/>
                <div className="row">
                    <div className="col-12">
                        <div style={{height:"15vh"}} className="form-group">
                             <form className="d-flex align-items-center" onSubmit={this.GoMessage.bind(this)}>      
                            <textarea style={{height:"100%"}} cols="20"  name="msj" ref={this.mensaje} onChange={this.Changevars.bind(this)} className="form-control  mr-5">
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
