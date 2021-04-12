
import React from 'react';
import axios from 'axios';

class Footer extends React.Component{
  constructor(props){
      super(props);
      this.state  = {
          posts : []
      }
  }

   componentDidMount(){
       axios.get('http://localhost:3001/api/users/data')
        .then(res => {
            this.setState({
                posts : res.data
            })
        })
   }



    render(){

        return(
            <>

                <footer className="bg-dark text-white mt-5 p-4 text-center">
                    Footer section
                </footer>

                <div>
                    {this.state.posts.map(post => <div>{post.name} </div>)}

                </div>
            </>
        )


    }
}

export default Footer;