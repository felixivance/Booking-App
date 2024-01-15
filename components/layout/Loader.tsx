import React from 'react'

type Props = {}

const Loader = (props: Props) => {
  return (
    <div className="d-flex justify-content-center center-loader">
        <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
  )
}

export default Loader