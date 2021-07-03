import React from 'react'
import Head from 'next/head'
import Header from './Header'
import Notify from './Notify'

function Layout({children}) {
    return (
        <div className="bg-gray-100 min-h-screen">
        <Head>
                <title>Ecommerce</title>
        </Head>
        <Header/>
        <Notify/>
            {children}
        </div>
    )
}

export default Layout