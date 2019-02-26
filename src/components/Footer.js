import React from 'react'

const Footer = class extends React.Component {
  render() {
    return (
      <footer>
        <div className="subscription">
          <div className="container">
            <a href="http://www.sparkol.com" title="Sparkol">
              <span className="logo-link logo-sparkol-large">Sparkol</span>
            </a>
            <div className="subscription-wrap">
              <ul className="products list-unstyled list-inline">
                <li>
                  <a className="logo-link logo-vs-large" href="http://www.videoscribe.co">
                    <span className="product-name">VideoScribe</span>
                  </a>
                  <span className="product-desc">Create your own whiteboard videos, fast</span>
                </li>
                <li>
                  <a className="logo-link logo-tawe-large" href="http://www.tawe.co/">
                    <span className="product-name">Tawe</span>
                  </a>
                  <span className="product-desc">Transform visual ideas into video instantly</span>
                </li>
              </ul>
              <a href="https://my.sparkol.com/buy">Get a Sparkol subscription</a>
              <p className="product-desc">And enjoy 2 video apps for the price of 1</p>
            </div>
          </div>
        </div>

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

        <div className="social">
          <div className="container">
            <ul className="menu">
              <li><a href="https://twitter.com/SparkolHQ" className="icon-social icon-twitter" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="https://www.facebook.com/SparkolHQ" className="icon-social icon-facebook" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://www.youtube.com/channel/UC-M3N1dBICkLMU8fTlmpgjw" className="icon-social icon-youtube" target="_blank" rel="noopener noreferrer">YouTube</a></li>
              <li><a href="https://plus.google.com/u/0/+Sparkol/posts" className="icon-social icon-gplus" target="_blank" rel="noopener noreferrer">Google+</a></li>
              <li><a href="https://www.linkedin.com/company/2755634" className="icon-social icon-linkedin" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="https://instagram.com/sparkolhq/" className="icon-social icon-instagram" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="copyright">
          <div className="container">
            <p className="small"><a href="https://my.sparkol.com" target="_blank" rel="noopener noreferrer">Sparkol Account</a></p>
            <ul>
              <li className="small">© 2018 Sparkol Limited, registered in England and Wales, no 06762963</li>
              <li className="small">1 Temple Way 5th Floor, Bristol, BS2 0BY, UK</li>
            </ul>
            <p className="small"><a href="http://www.sparkol.com/legal/" target="_blank" rel="noopener noreferrer">Privacy and cookies</a></p>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
