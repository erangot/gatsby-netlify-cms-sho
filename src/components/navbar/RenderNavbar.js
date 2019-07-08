import React from 'react'
import shocologo from "../../images/shoco_logo.png"
import SlantedEndge from '../slantedEdge'
import { Link } from 'gatsby'

const RenderNavbar = (props) => 
{    
   
    const {status, username, signOut} = props
   
       return (
            <header id="header" className="navbar navbar-default">
                    <div className="container">
                        <div className="navbar-header">
                            <Link to="/">
                                <div className="logo navbar-btn pull-left" title="sho.co" rel="home">
                                    <img src={shocologo} alt="sho.co logo"/>
                                </div>
                            </Link>
            
                            <button type="button" className="navbar-toggle">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
            
                        <div className="navbar-collapse collapse">
                            <nav role="navigation">
                                <ul id="menu-main-menu" className="menu nav navbar-nav navbar-right pull-right">
                                    <li><Link to="/about">About</Link></li>
                                    <li><Link to="/app/myvideos">My videos</Link></li>
                                    {status ? 
                                    (<li className="last"> 
                                        Yo, {username} |                     
                                        <span onClick={signOut}>Logout</span>
                                    </li>) : 
                                    ( <li className="last">   
                                    Who's there? |                     
                                    <Link to="/app">Login</Link>
                                     </li>)
                                    }
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <SlantedEndge/>
                </header>)
       
}
export default RenderNavbar