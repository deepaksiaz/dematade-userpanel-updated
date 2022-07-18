import React from 'react'
import './OfferPage.scss'
import offer1 from '../../Assets/Images/offer-1.jpeg'
import offer2 from '../../Assets/Images/offer-2.jpeg'
import offer3 from '../../Assets/Images/offer-3.jpeg'
const OfferPage = () => {
  return (
    <div>
    <div className='offerpage'>
    offers
    </div>
    <div className='offerpage-1'>
        <div ><img src={offer1} alt="offer-1" style={{width:"380px",borderRadius:"10px", border:" 1px solid #dddfe0"}}></img></div>
        <div ><img src={offer2} alt="offer-1" style={{width:"380px",borderRadius:"10px",border:" 1px solid #dddfe0"}}></img></div>
        <div ><img src={offer3} alt="offer-1" style={{width:"380px",borderRadius:"10px",border:" 1px solid #dddfe0"}}></img></div>
        
    </div>
    </div>
  )
}

export default OfferPage