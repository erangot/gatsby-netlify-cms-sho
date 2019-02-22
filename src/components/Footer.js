import PropTypes from "prop-types"
import React from "react"
import PFooter from "../components/footerproducts"
import LFooter from "../components/footerlinks"
import "./styles/footer.scss"

const Footer = ({ siteTitle }) => (
  <footer id="footer" class="mainfooter">
    <div class="titlefooter">
      <a href="https://www.sparkol.com/en/">
        <img class="footerLogo" alt="Sparkol" style={{marginBottom:"-2rem"}}>
            </img>
      </a>
    </div>
      
    <div style={{marginBottom: "2rem"}}>
      <span class="c">
        <a href="https://www.videoscribe.co/en/" class="link">
          <img class="videoscribeLogo" alt="VideoScribe" style={{marginBottom:"0rem"}}>
          </img>
          <p style={{marginBottom:"0rem"}}>VideoScribe</p>
        </a>
        <p style={{fontSize: "13px"}}>Create your own whiteboard videos, fast</p>
      </span>

      <span style={{fontSize: "50px", color: "white"}}>+</span>
              
      <span class="c">
        <a href="http://www.tawe.co/" class="link">
          <img class="taweLogo" alt="tawe" style={{marginBottom:"0rem"}}>
          </img>
          <p style={{marginBottom:"0rem"}}>Tawe</p>
        </a>
        <p style={{fontSize: "13px"}}>Transform visual ideas into video instantly</p>
      </span>
    </div>

    <a href="https://www.videoscribe.co/en/Buy" style={{fontSize: "15px"}} class="link">
      Get a Sparkol subscription
    </a>
    <p style={{fontSize: "15px"}}>
      And enjoy 2 video apps for the price of 1
    </p>

      <PFooter/>
      <LFooter/>
          
    <a href="https://www.videoscribe.co/en/Login" style={{fontSize: "12px"}} class="link">
      Sparkol Account
    </a>
          
    <p style={{fontSize: "12px", marginBottom:"-.5rem", marginTop:"1rem"}}>
      © 2018 Sparkol Limited, registered in England and Wales, no 06762963 
    </p>
    <p style={{fontSize: "12px", marginBottom:"0rem"}}>
      1 Temple Way 5th Floor, Bristol, BS2 0BY, UK
    </p>
    
    <a href="https://www.sparkol.com/en/Legal" class="link" style={{fontSize: "12px"}}>Privacy and cookies</a>
    
  </footer>
)

Footer.propTypes = {
  siteTitle: PropTypes.string,
}

Footer.defaultProps = {
  siteTitle: ``,
}

export default Footer
