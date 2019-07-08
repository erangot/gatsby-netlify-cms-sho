import React from 'react'

import PFooter from './footer/FooterProducts';
import SFooter from './footer/FooterSocial';
import CRFooter from './footer/FooterCopyRight';
import SBFooter from './footer/FooterSubscription'

const Footer = class extends React.Component {
  render() {
    return (
      <footer>
        <SBFooter/>
        <PFooter/>
        <SFooter/>
        <CRFooter/>
      </footer>
    )
  }
}

export default Footer
