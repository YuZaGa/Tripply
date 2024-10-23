import { Link } from "react-router-dom"


function Footer() {
  return (
    <div className="pb-5">
        <h2 className="text-center text-gray-700"> Made with 💖 by 
  <a href="https://yumngauhar.fyi" target="_blank" rel="noopener noreferrer"> Yumn Gauhar &copy; {new Date().getFullYear()}</a>
</h2>

    </div>
  )
}

export default Footer