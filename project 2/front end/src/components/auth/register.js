import React from 'react';
import propTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {registeruser} from '../../actions/authActions';


class Register extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            name : "",
            email : "",
            password : "",
            password2 : "",
            errors : {}
        };
        this.onChange = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        
    }

    onChangeHandler(e){
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmitHandler(e) {
        e.preventDefault();
        
        const newUser = {
            name : this.state.name,
            email : this.state.email,
            password : this.state.password,
            password2 : this.state.password2
        }

        this.props.registeruser(newUser, this.props.history)
       
    }

    componentWillReceiveProps(nextProps){
      if(nextProps.errors){
        this.setState({errors : nextProps.errors});
      }
    }

    


    render(){

      const {errors} = this.state;
      // const {user} = this.props.auth

  return(
      <>
      <div className = "row">
      <div className ="col-md"></div>
      <div className = "col-md-7">
                <div className="register">

                  {/* {user?user.name:null} */}
                  <div className="container">
                    <div className="row">
                      <div className="col-md-8 m-auto">
                        <h1 className ="display-4 text-center">Sign Up</h1>
                        <p className ="lead text-center"></p>
                        <form noValidate onSubmit = {this.onSubmitHandler} >
                          
                          <div className="form-group">
                            <input 
                              type="text" 
                              className = {classnames("form-control form-control-lg", {'is-invalid' : errors.name})}
                              placeholder="Name" 
                              name ="name" 
                              value = {this.state.name}
                              
                              onChange = {this.onChangeHandler.bind(this)} 
                              />
                              {errors.name && (<div className = "invalid-feedback"> {errors.name} </div>)}
                          </div>

                          <div className ="form-group">
                            <input 
                              type="email" 
                              className = {classnames("form-control form-control-lg", {'is-invalid' : errors.email})}
                              placeholder="Email Address" 
                              name="email"
                              value = {this.state.email} 
                              
                              onChange = {this.onChangeHandler.bind(this)} 
                              />
                              {errors.email && (<div className = "invalid-feedback"> {errors.email} </div>)}

                          </div>


                          <div className="form-group">
                            <input 
                              type="password" 
                              className = {classnames("form-control form-control-lg", {'is-invalid' : errors.password})} 
                              placeholder="Password" 
                              value = {this.state.password}
                              name="password" 
                              
                              onChange = {this.onChangeHandler.bind(this)} 
                              />
                              {errors.password && (<div className = "invalid-feedback"> {errors.password} </div>)}
                          </div>


                          <div className="form-group">
                            <input 
                              type="password" 
                              className = {classnames("form-control form-control-lg", {'is-invalid' : errors.password2})}
                              placeholder="Confirm Password" 
                              value = {this.state.password2}
                              name="password2" 
                      
                              onChange = {this.onChangeHandler.bind(this)} 
                              />
                              {errors.password2 && (<div className = "invalid-feedback"> {errors.password2} </div>)}
                          </div>
                          <input type="submit" className="btn btn-info btn-block mt-4" />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
           </div>                 
          <div className = "col-md"></div>   
          </div>
        </>




        )
    }
}

const mapStateToProps = (state) => ({
  auth : state.auth,
  errors : state.errors
})


Register.propTypes = {
  registeruser : propTypes.func.isRequired,
  auth : propTypes.object.isRequired,
  errors : propTypes.object.isRequired
}

export default connect(mapStateToProps, {registeruser}) (withRouter( Register));