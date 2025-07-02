'use client'

import Link from "next/link";


const NavigationPanel = () => {


    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7x1 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 item-center">
                    <div className="flex-shrink-0 text-x1 font-bold text-blue-600">
                        FormSure
                    </div>

                    <div className="hidden md:flex space-x-6">
                        <Link href="/" className="text-gray-700 hover:text-blue-600 trasition">Home</Link>
                        <Link href="/submit" className="text-gray-700 hover:text-blue-600 transition">Email submit page</Link>
                        <Link href="/verified" className="text-gray-700 hover:text-blue-600 transition">Email status page</Link>
                    </div>
                </div>
                <div className="md:hidden">
                    <button className="text-gray-700 hover:text-blue-600">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"
                        viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                    </button>
                </div>
            </div>
        </nav>
    )
}


export default NavigationPanel;
