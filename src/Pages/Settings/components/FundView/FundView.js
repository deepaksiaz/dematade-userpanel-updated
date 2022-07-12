import React from 'react'

import './FundView.scss'
const FundView = () => {

  return (
    <div className='fundview-1'>
    <div className='fundview'>
       
       <div className='row-1'>
     <span className="heading-main">FUND VIEW</span>
      </div>
      <div className='row-2'>
      <input type="button"  id="set_Value" className='oaf' value="Overall Fund Available" />
      <input type="button"  id="set_Value" className='oaf' value="12300.55" />
     
      </div>
      <div className='row-2'>
      <input type="button"  id="set_Value" className='oaf' value="Net Fund Available" />
      <input type="button"  id="set_Value" className='oaf' value="8600.40" style={{backgroundColor:"#fff44f"}}/>
     
      </div>
      <div className='row-3'>
      <input type="button"  id="set_Value" className='oaf' value="Realised MTM P&L" />
      <input type="button"  id="set_Value" className='oaf' value="5515.30" style={{backgroundColor:"#219653",color:"white"}}/>
      </div>
     </div>
    </div>
  )
}
export default FundView
