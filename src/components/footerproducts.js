import PropTypes from "prop-types"
import React from "react"

const PFooter = ({ siteTitle }) => (
  <body>  
    <div class="productFooter">
        <span class="c">
            <a href="https://www.videoscribe.co/en/Anywhere" class="link">
                <img class="vsanywhereLogo" alt="VSAnywhere" style={{marginBottom:"0rem"}}>
                </img>
                <p style={{marginBottom:"0rem"}}>VS Anywhere</p>
            </a>
            <p style={{fontSize: "13px"}}>VideoScribe for mobile</p>
        </span>
        <span class="c">
            <a href="https://www.sparkol.com/en/Blog" class="link">
                <img class="blogLogo" alt="Sparkol Blog" style={{marginBottom:"0rem"}}>
                </img>
                <p style={{marginBottom:"0rem"}}>Sparkol blog</p>
            </a>
            <p style={{fontSize: "13px"}}>Let's get engaging</p>
        </span>
        <span class="c">
            <a href="https://www.sparkol.com/books" class="link">
                <img class="booksLogo" alt="Sparkol Books" style={{marginBottom:"0rem"}}>
                </img>
                <p style={{marginBottom:"0rem"}}>Sparkol books</p>
            </a>
            <p style={{fontSize: "13px"}}>Free, inspiring ebooks</p>
        </span>
        <span class="c">
            <a href="http://www.animole.com/" class="link">
                <img class="animoleLogo" alt="Animole" style={{marginBottom:"0rem"}}>
                </img>
                <p style={{marginBottom:"0rem"}}>Animole</p>
            </a>
            <p style={{fontSize: "13px"}}>Find pro animators</p>
        </span>
        <span class="c">
            <a href="https://itunes.apple.com/app/tawe/id993448214" class="link">
                <img class="tawemobileLogo" alt="Tawe Mobile" style={{marginBottom:"0rem"}}>
                </img>
                <p style={{marginBottom:"0rem"}}>Tawe</p>
            </a>
            <p style={{fontSize: "13px"}}>Tawe for mobile</p>
        </span>
        <span class="c">
            <a href="https://www.svgstudio.com/" class="link">
                <img class="svgLogo" alt="SVG Studio" style={{marginBottom:"0rem"}}>
                </img>
                <p style={{marginBottom:"0rem"}}>SVG Studio</p>
            </a>
            <p style={{fontSize: "13px"}}>Royalty-free images</p>
        </span>
    </div>
  </body>
)

PFooter.propTypes = {
  siteTitle: PropTypes.string,
}

PFooter.defaultProps = {
  siteTitle: ``,
}

export default PFooter
