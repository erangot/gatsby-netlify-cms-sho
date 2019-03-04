import PropTypes from "prop-types"
import React from "react"

const LFooter = ({ siteTitle }) => (
<div style={{marginBottom:"1rem"}}>
  <span class="b">
    <a href="https://twitter.com/SparkolHQ">
      <img class="twitterLogo" alt="Twitter" style={{marginBottom:"0rem"}}>
      </img>
    </a>
  </span>
  <span class="b">
    <a href="https://www.facebook.com/SparkolHQ">
      <img class="facebookLogo" alt="Facebook" style={{marginBottom:"0rem"}}>
      </img>
    </a>
  </span>
  <span class="b">
    <a href="https://www.youtube.com/channel/UC-M3N1dBICkLMU8fTlmpgjw">
      <img class="youtubeLogo" alt="Youtube" style={{marginBottom:"0rem"}}>
      </img>
    </a>
  </span>
  <span class="b">
    <a href="https://plus.google.com/+Sparkol/posts">
      <img class="googleplusLogo" alt="Google Plus" style={{marginBottom:"0rem"}}>
      </img>
    </a>
  </span>
  <span class="b">
    <a href="https://www.linkedin.com/company/sparkol/">
      <img class="linkedinLogo" alt="Linked In" style={{marginBottom:"0rem"}}>
      </img>
    </a>
  </span>
  <span class="b">
    <a href="https://www.instagram.com/sparkolhq/">
      <img class="instagramLogo" alt="Instagram" style={{marginBottom:"0rem"}}>
      </img>
    </a>
  </span>
  </div>
  )

  LFooter.propTypes = {
    siteTitle: PropTypes.string,
  }
  
  LFooter.defaultProps = {
    siteTitle: ``,
  }
  
  export default LFooter
  