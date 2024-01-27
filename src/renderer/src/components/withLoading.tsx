// @ts-nocheck
import React, { useContext } from 'react';

import { FaSpinner } from 'react-icons/fa';

import { LoaderContext } from '@renderer/hooks/loader';

export  function WithLoading({WrappedComponent}) {
  const {isLoading , changeLoadingState} = useContext(LoaderContext)
  
  return (
    <>
      {
        isLoading && 
        <div className='flex absolute top-0 left-0 right-0 bottom-0 justify-center items-center  bg-[#000000aa] blur-sm'>
          <FaSpinner className='animate-spin' size={40} />
        </div>
      }
      <WrappedComponent/>
    </>
  )
}
