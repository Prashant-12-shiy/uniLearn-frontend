"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import UnderConstruction from '@/components/UnderConstruction'

const Page = () => {

  const params = useParams();
  let slug = params.slug;
  slug = slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <div>

      <UnderConstruction pageName={slug}/>
    </div>
  )
}

export default Page