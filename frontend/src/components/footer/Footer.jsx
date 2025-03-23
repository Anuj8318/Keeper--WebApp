import React from 'react'
import footer from './footer.module.css'

const date = new Date();

const Footer = () => {
  return (
    <div>
      <p className={footer.footer}>Copyright &copy; {date.getFullYear()}</p>
    </div>
  )
}

export default Footer
