import React,{useContext} from 'react'
import Link from 'next/link'


function Header() {

return (
    <div className="sticky top-0 z-50 bg-white flex items-center p-2 lg:p-5 shadow-sm justify-between">
        <div className="flex items-center">
            <p>Header</p>
        </div>

        <div className="justify-center">
            <ul className="flex space-x-6">
                <li>Cart</li>
                <Link href="/signin">
                    <li>Login</li>
                </Link>
                
            </ul>
        </div>

    </div>
)}

export default Header