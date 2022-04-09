import React from 'react'
import { useSelector } from 'react-redux'

export const PackageSummary = ({ packageId }) => {
  const packageData = useSelector(state => state.packages[packageId]);
  return (
    <p key={packageId}><span style={{ marginRight: '10px' }}>{packageData.name}</span><span>{packageData.amount}</span><span>{packageData.currency}</span></p>
  )
}
