import { label } from 'framer-motion/client';
import logo from '../../../public/logo.png';

import PillNav from './PillNav';

function NavBar() {
  return (
<div className='flex justify-center'>
    <PillNav
  logo={logo}
  logoAlt="Company Logo"
  items={[
    { label: 'About', href: '#about' },
    {label: 'Projects', href: '#projects' },
{ label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' }
  ]}
  activeHref="/"
  className="custom-nav"
  ease="power2.easeOut"
  baseColor="#121212"
  pillColor="#15AABF"
  hoveredPillTextColor="#15AABF"
  pillTextColor="#000000"
/>
</div>
  )
}

export default NavBar