import React from 'react'


const SBFooter = () => 
(
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
              <a href="https://my.sparkol.com/buy">Get a Sparkol subscription</a><br></br> 
              <p className="product-desc">And enjoy 2 video apps for the price of 1</p>
            </div>
          </div>
        </div>
)

export default SBFooter