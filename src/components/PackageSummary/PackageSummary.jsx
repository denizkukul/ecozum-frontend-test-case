import React from 'react';
import { useSelector } from 'react-redux';
import './PackageSummary.less';

export const PackageSummary = ({ packageId }) => {
  const packageData = useSelector(state => state.packages[packageId]);
  return (
    <div className='package-summary'>
      <p>{packageData.name}</p>
      <p className='cost'>{packageData.amount}<span className='currency'>{packageData.currency}</span></p>
    </div>
  )
}
