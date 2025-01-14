import { Grid } from '@mui/material'
import Link from 'next/link'
import React from 'react'

export default function UpperSection() {
  return (
    <div>
        <div className='container max-w-screen-lg mx-auto'>
            <div className='text-center pt-14 mb-16'>
                <h2 className='text-5xl leading-tight text-gradient mb-5'>Assure DeFi<br/> Verified Projects</h2>
                <p className='text-lg leading-6 font-light mb-8'>Our network of verified projects boasts some of<br/> the Web3 industry’s top talent with a combined<br/> market cap of $1.6 Billion</p>
                <Link href="#" className='gradient-bg py-5 px-28 theme-border rounded-md inline-block font-semibold'>GET YOUR PROJECT LISTED</Link>
            </div>
            <div className='theme-border rounded-xl featured-project px-6 pb-6 pt-4 mb-6'>
                <h3 className='text-center text-gradient text-3xl leading-10'>Featured</h3>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <div className=''>
                            <div className=''>
                                <img src="/assets/logo-a.webp" className=""/>
                                <div className=''>
                                    <label>CoinCreate</label>
                                    <span>$CREA</span>
                                </div>
                            </div>
                            <div className=''>
                                <img src="/assets/logo-a.webp" className=""/>
                                <span>2</span>
                            </div>
                        </div>
                        <div className=''>
                            <p>The all-in-one platform for no-code deployment of all types of contracts across multiple blockchains without 
                                the need for specialized developers. Developed to allow projects and users to create entire integrated ecosystems and infrastructure without...</p>
                        </div>
                        <div className=''>
                            <label>Oct 3, 2024</label>
                            <span>Audited</span>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        
                    </Grid>
                </Grid>
            </div>
        </div>
        
    </div>
  )
}
