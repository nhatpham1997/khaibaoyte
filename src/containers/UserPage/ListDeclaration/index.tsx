import LabelHeading from 'components/LabelHeading'
import MovingDeclarationItem from 'components/MovingDeclarationItem'
import { useEffect, useState } from 'react'

function ListDeclaration() {
  // Lấy ra id tài khoản lưu ở local storage
  const userId = localStorage.getItem('userId')

  const [listDeclarations, setListDeclarations] = useState<any[]>([])

  const [listAllDeclarations, setListAllDeclarations] = useState<any[]>([])

  const movingDeclarationAPI = 'https://dbkhaibaoyte.herokuapp.com/moving_declaration'

  // Hàm gọi API lấy ra tất cả tờ khai di chuyển
  const getAllDeclaration = useEffect(() => {
    fetch(movingDeclarationAPI)
      .then((res) => res.json())
      .then((data) => {
        setListAllDeclarations(data)
      })
  }, [])

  // Hàm lấy ra tờ khai của user đang đăng nhập
  const getDeclaration = useEffect(() => {
    listAllDeclarations.forEach((declaration) => {
      if (declaration.userId == userId) {
        setListDeclarations((prev) => [...prev, declaration])
      }
    })
  }, [listAllDeclarations])

  return (
    <>
      <LabelHeading text="Danh sách tờ khai" />
      <div className="moving-declaration-list">
        {listDeclarations.map((item, index) => {
          return <MovingDeclarationItem key={index} item={item} name={item.fullName} />
        })}
      </div>
    </>
  )
}

export default ListDeclaration
