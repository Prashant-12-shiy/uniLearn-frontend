"use client"
import React from 'react'
import DynamicBreadcrumb from '@/components/DynamicBreadcrumb';
import { CategoryProvider } from '@/context/Cateogries';

const Layout = ({children}) => {
  

  return (
    <CategoryProvider>
        {children}
    </CategoryProvider>
     
  )
}

export default Layout