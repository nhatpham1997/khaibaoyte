import ModalDetailMovingDeclaration from 'components/ModalDetailMovingDeclaration'
import './MovingDeclarationItem.css'
import { useState } from 'react'

interface props {
  item?: any
  name?: string
}

function MovingDeclarationItem({ item, name }: props) {
  const [showModalDetail, setShowModalDetail] = useState(false)

  function handleClick() {
    setShowModalDetail(true)
  }

  const indexFisrtSeparate = item.time.indexOf('/')

  const day = item.time.slice(0, indexFisrtSeparate)

  const indexSpacing = item.time.indexOf(' ')

  const monthYear = item.time.slice(indexFisrtSeparate + 1, indexSpacing)

  const hourMS = item.time.slice(indexSpacing + 1)

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
            <p className="declaration-name-text">{name}</p>
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
