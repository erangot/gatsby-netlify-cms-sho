import PropTypes from "prop-types"
import React from "react"

const PFooter = ({ siteTitle }) => (
    <div className="sparkol-products">
    <div className="container">
        <ul className="menu nav">
          <li>
          <a href="http://www.videoscribe.co/anywhere" className="product-logo logo-vsa-small">
            <span className="product-name">VS Anywhere</span>
          </a>
          <span className="product-desc">VideoScribe for mobile</span>
          </li>
        <li>
          <a href="http://www.sparkol.com/engage/" className="product-logo logo-blog-small">
            <span className="product-name">Sparkol blog</span>
          </a>
          <span className="product-desc">Let's get engaging</span>
        </li>
        <li>
          <a href="http://www.sparkol.com/books" className="product-logo logo-ebook-small">
            <span className="product-name">Sparkol books</span>
          </a>
          <span className="product-desc">Free, inspiring ebooks</span>
        </li>
        <li>
          <a href="http://www.animole.com" className="product-logo logo-animole-small">
            <span className="product-name">Animole</span>
          </a>
          <span className="product-desc">Find pro animators</span>
        </li>
        <li>
          <a href="https://itunes.apple.com/app/tawe/id993448214" className="product-logo logo-tawe-small">
            <span className="product-name">Tawe</span>
          </a>
          <span className="product-desc">Tawe for mobile</span>
        </li>
        <li>
          <a href="http://www.svgstudio.com/" className="product-logo logo-svg-small">
            <span className="product-name">SVG Studio</span>
          </a>
          <span className="product-desc">Royalty-free images</span>
        </li>
      </ul>
    </div>
  </div>
)

PFooter.propTypes = {
  siteTitle: PropTypes.string,
}

PFooter.defaultProps = {
  siteTitle: ``,
}

export default PFooter
