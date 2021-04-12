
import React from 'react';
import axios from 'axios';


class Create extends React.Component{



    constructor(props){
        super(props);
        this.state = {
            name : ""
        }

    }

    onChangeHandler = (e)=> {
        this.setState({name : e.target.value});
    }

    onSubmitHandler = (e)=> {
        e.preventDefault();
        const newUser = {
            name : this.state.name
        }
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        axios.post("http://localhost:5000/register", newUser)

        .then(()=> {
            console.log("Success")
        })

        .catch(()=> {
            console.log("Failed")
        })

    }


    render(){
        return(
            <>
            <p>  {this.state.name} </p>
            <form onSubmit = {this.onSubmitHandler} method = "post">
             <input 
                type = "text"
                name = "name"
                onChange = {this.onChangeHandler}
             />
            <button>submit</button>
            </form>


            </>
        )
    }
}

export default Create;