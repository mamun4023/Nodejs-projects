import React from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class Login extends React.Component{

    constructor(props){
        super(props);

        const token = localStorage.getItem("token");
        let loggedIn = true
        if(token === null){
            loggedIn = false
        }


            this.state = {
                email : "",
                password : "",
                loggedIn : false
            }


        this.onChangeHandler = this.onChangeHandler.bind(this); 
        this.onChangeHandler = this.onChangeHandler.bind(this);   
        }


    onChangeHandler =(e)=> {
        this.setState({[e.target.name] : e.target.value})
    }

    onSubmitHandler = (e)=> {
        e.preventDefault()
        const {email, password} = this.state

        // login magic

        const user = {
            email, 
            password
        }
        axios.post("http://localhost:4000/api/users/login",user)
            .then(res => {
                if(res.data){

                localStorage.setItem("token",res.data)
                const token = localStorage.getItem("token");
                console.log(token)
                if(token.length > 100){ 
                this.setState({
                    
                    loggedIn : true
                })
            }
            }


            })


        // if(email === "A" && password ===  "B"){
        //     localStorage.setItem("token", "lfjldjfldfldjlfjffff")
        //     this.setState({
        //         loggedIn : true
        //     })
        // }

    }


  render(){

    if(this.state.loggedIn){
        return <Redirect to = "/admin" />
    }

    return(
      <>


         <form onSubmit = {this.onSubmitHandler}>
             <input 
                type = "text"
                name = "email"
                value = {this.state.email}
                onChange = {this.onChangeHandler}

             />

              <input 
                type = "text"
                name = "password"
                value = {this.state.password}
                onChange = {this.onChangeHandler}

             />



             <button> Button </button>
         </form>
 


      </>
    )
  }
}


export default Login;
