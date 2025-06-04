import React from 'react'

const Page = async ({ params}: ParamsWithSearch) => {
    const { videoId } = await params
  return (
    <main className='wrapper page'>
      VIDEO DETAILS PAGE ID : {videoId}

    </main>
  )
}

export default Page