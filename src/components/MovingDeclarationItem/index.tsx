import ModalDetailMovingDeclaration from 'components/ModalDetailMovingDeclaration'
import './MovingDeclarationItem.css'
import { useState } from 'react'

interface props {
  day: string
  monthYear: string
  hourMS: string
}

function MovingDeclarationItem({ day, monthYear, hourMS }: props) {
  const [showModalDetail, setShowModalDetail] = useState(false)

  function handleClick() {
    setShowModalDetail(true)
  }

  return (
    <>
      <div onClick={handleClick} className="moving-declaration-item">
        <div className="declaration-left">
          <p className="declaration-day">{day}</p>
          <p className="declaration-month-year">{monthYear}</p>
        </div>
        <div className="declaration-right">
          <div className="declaration-name">
            <i className="declaration-name-icon fas fa-user"></i>
            <p className="declaration-name-text">Đinh Ngọc Định</p>
          </div>
          <div className="declaration-hour">
            <i className="declaration-hour-icon fas fa-clock"></i>
            <p className="declaration-hour-text">{hourMS}</p>
          </div>
        </div>
      </div>
      <ModalDetailMovingDeclaration
        isShow={showModalDetail}
        setShowModalDetail={setShowModalDetail}
      />
    </>
  )
}

export default MovingDeclarationItem
