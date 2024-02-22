
'use client' // Error components must be Client Components
//  this is a reserved file
import { useEffect } from 'react'

interface customError extends Error {
    errMessage: string;

}

export default function Error({error,reset}: {
    error: customError & { digest?: string }
    reset?: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div>
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
                <h2 className="display-4 fw-bold">{error?.errMessage}</h2>
                <p className='fs-3'>
                    <span className='text-danger'>Opps!</span> Something went wrong
                </p>
                <div className="lead">
                    <p>Sorry for the inconvenience caused. Please try again later.</p>
                </div>
                <button className="btn btn-danger btn-lg mt-4"
                    onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset?.()
                    }
                >
                    Try again
                </button>
            </div>
        </div>
      
     
    </div>
  )
}