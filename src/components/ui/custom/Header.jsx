import React from 'react'
import { Button } from '../button'

function Header() {
  return (
    <>
      <div className="p-3 flex justify-between items-center px-5">
        <img  className="w-16 h-16" src="/logo.svg"></img>
        <div>
          <Button>Sign In</Button>
        </div>
      </div>
    </>
  );
}

export default Header