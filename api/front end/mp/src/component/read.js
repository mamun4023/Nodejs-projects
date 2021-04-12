
import React from 'react';
import axios from 'axios';



class Read extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      posts : []
    }
  }

  componentDidMount(){
    axios.get("http://localhost:5000")
    .then(res => {
      this.setState({
        posts : res.data
      })
    })
    .catch(()=> console.log("failed to fetch"))
  }



  render() { 
  return(
    <>


   

       {
         this.state.posts.map(post => <li>{post.name}</li>)
       }
     
      


    </>

  )
}
}

export default Read;