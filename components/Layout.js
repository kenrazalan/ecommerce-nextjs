import React from 'react'
import Head from 'next/head'
import Header from './Header'


function Layout({children}) {
    return (
        <div className="bg-gray-100 h-screen">
        <Head>
                <title>Ecommerce</title>
        </Head>
        <Header/>
            {children}
        </div>
    )
}

export default Layout