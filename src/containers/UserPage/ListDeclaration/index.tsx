import LabelHeading from 'components/LabelHeading'
import MovingDeclarationItem from 'components/MovingDeclarationItem'

function ListDeclaration() {
  return (
    <>
      <LabelHeading text="Danh sách tờ khai" />
      <div className="moving-declaration-list">
        <MovingDeclarationItem day="29" monthYear="10/2021" hourMS="08:42:22" />
        <MovingDeclarationItem day="02" monthYear="12/2021" hourMS="08:52:10" />
        <MovingDeclarationItem day="10" monthYear="01/2022" hourMS="21:30:22" />
        <MovingDeclarationItem day="12" monthYear="01/2021" hourMS="12:42:22" />
        <MovingDeclarationItem day="16" monthYear="01/2021" hourMS="19:00:22" />
      </div>
    </>
  )
}

export default ListDeclaration
