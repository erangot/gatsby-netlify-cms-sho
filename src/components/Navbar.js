import PropTypes from "prop-types"
import React from "react"
import shocologo from "../images/shoco_logo.png"
import SlantedEndge from '../components/slantedEdge'

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
                    <li><a href="/">About</a></li>
                    <li><a href="/">My videos</a></li>
                    <li class="last">   
                        Who's there? |                     
                       <a href="/">Login</a>
                    </li>
                </ul>
            </nav>
        </div>

        <div class="mobile-menu">
            <div class="menu-main mobile-menu-wrap">
                <ul class="menu nav">
                    <li><a href="/about">About</a></li>
                    <li><a href="/myvideos">My videos</a></li>
                    <li>
                      <a href="/myvideos">Login</a>
                    </li>
                </ul> 
            </div>
            <div class="menu-global mobile-menu-wrap">
                <ul class="menu nav">
                    <li class="first"><a href="http://www.sparkol.com">Sparkol</a></li>
                    <li class="last"><a href="http://www.sparkol.com/legal/">Privacy and cookies</a></li>
                </ul>
            </div>
            <div class="social mobile-menu-wrap">
                <ul class="menu nav">
                    <li><a href="https://twitter.com/SparkolHQ" class="icon-social icon-twitter" target="_blank">Twitter</a></li>
                    <li><a href="https://www.facebook.com/SparkolHQ" class="icon-social icon-facebook" target="_blank">Facebook</a></li>
                    <li><a href="https://www.youtube.com/channel/UC-M3N1dBICkLMU8fTlmpgjw" class="icon-social icon-youtube" target="_blank">YouTube</a></li>
                    <li><a href="https://plus.google.com/u/0/+Sparkol/posts" class="icon-social icon-gplus" target="_blank">Google+</a></li>
                    <li><a href="https://www.linkedin.com/company/2755634" class="icon-social icon-linkedin" target="_blank">LinkedIn</a></li>
                    <li><a href="https://instagram.com/sparkolhq/" class="icon-social icon-instagram" target="_blank">Instagram</a></li>
                </ul>
            </div>
            {/* {{> slanted_edge}} */}
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
