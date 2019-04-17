import React from 'react'
import Layout from '../components/Layout'
import { navigate } from 'gatsby'

class NotFoundPage extends React.Component {

  constructor() {
    super();
    this.state = {
      value: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
 }

  keyPress(e){

      if(e.keyCode === 13){

        navigate(`/${e.target.value}`);
        
      }
  }

  render ()  {

    return (
      <Layout>
        <div className="videoPage">
            <div className="search">
                <div className="container text-center">
                  <h1 className="jumbo text-padding">Find a video</h1>
                  <form className="search-box">
                      <label className="search-label">sho.co/</label>
                      <input className="search-input" type="text" placeholder="shortcode" value={this.state.value} onKeyDown={this.keyPress} onChange={this.handleChange}>
                      </input>
                  </form>
                    <p className="upload-info text-center">
                    <p style={{color: 'red'}}> D'oh! We can't find that page. Please check the link you followed.</p>
                    </p>                     
                </div>
                <span className="icwrap3">
                    <span className="ic1"></span>
                    <span className="ic2"></span>
                    <span className="ic3"></span>
                </span>
            </div>
        </div>
      </Layout>
    );  
  }
}

export default NotFoundPage
