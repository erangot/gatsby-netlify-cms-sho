import PropTypes from "prop-types"
import React from "react"
import shocologo from "../images/shoco_logo.png"
import SlantedEndge from '../components/slantedEdge'
import { Link } from 'gatsby'

import "./styles/header.scss"

const Header = ({ siteTitle }) => (
  <header id="header" class="navbar navbar-default">
    <div class="container">
        <div class="navbar-header">
            <a class="logo navbar-btn pull-left" href="/" title="sho.co" rel="home">
                <img src={shocologo} alt="sho.co logo"/>
            </a>

            <button type="button" class="navbar-toggle">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        </div>

        <div class="navbar-collapse collapse">
            <nav role="navigation">
                <ul id="menu-main-menu" class="menu nav navbar-nav navbar-right pull-right">
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/">My videos</Link></li>
                    <li class="last">   
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
