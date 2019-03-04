import PropTypes from "prop-types"
import React from "react"
import shocologo from "../images/shoco_logo.png"
import SlantedEndge from '../components/slantedEdge'
import { Link } from 'gatsby'

import "./styles/header.scss"

const Header = ({ siteTitle }) => (
  <header id="header" className="navbar navbar-default">
    <div className="container">
        <div className="navbar-header">
            <a className="logo navbar-btn pull-left" href="/" title="sho.co" rel="home">
                <img src={shocologo} alt="sho.co logo"/>
            </a>

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
                    <li><Link to="/">My videos</Link></li>
                    <li className="last">   
                        Who's there? |                     
                       <Link to="/">Login</Link>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
    <SlantedEndge/>
</header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
