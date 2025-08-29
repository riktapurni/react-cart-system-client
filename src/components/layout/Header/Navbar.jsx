import React from 'react'
 const links = [
    {
      name: "shop",
      href: "#"
    },
    {
      name: "On Sale",
      href: "#"
    },
    {
      name: "New Arrivals",
      href: "#"
    },
    {
      name: "brands",
      href: "#"
    },
    {
      name: "test",
      href: "#"
    },
    {
      name: "CartClaud",
      href: "#"
    },
  ]
const Navbar = () => {
 
const navBaraLinks = links?.map((link) => (<a href="#" key={link?.name}className="hover:text-gray-500 transition-colors">{link?.name}</a>))

  return (
    
   <nav className="hidden md:flex space-x-6">
        {navBaraLinks}
        
      </nav>
  )
  
}

export default Navbar