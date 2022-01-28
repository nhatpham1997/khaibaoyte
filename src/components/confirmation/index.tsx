import React, { useContext, useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import { useParams } from 'react-router-dom'
import { ListItem, ListItemText, Typography, Box, Button } from '@mui/material'
import { GlobalContext } from 'contexts'
import axios from 'axios'
import Confirm from 'components/Confirm'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
}))

const Confirmation = () => {
  const { movingRegister, address, editMovingRegister, showConfirm, setShowConfirm } =
    useContext(GlobalContext)
  const params = useParams()

  const data = movingRegister.filter((item: any) => item.userId.toString() === params.id)
  const dataRegister = data.filter((item: any) => item.status === 0)

  const handleconfirm = async (id: number, status: number) => {
    const response = await axios.patch(`https://dbkhaibaoyte.herokuapp.com/moving_register/${id}`, {
      status: status,
    })
    if (response.status === 200) {
      setShowConfirm(true)
      const index = movingRegister.findIndex((item) => item.id === id)
      const newMovingRegister = { ...movingRegister[index], status: status }
      const newData = [...movingRegister]
      newData[index] = newMovingRegister
      editMovingRegister(newData)
    } else {
      alert('Vui lòng thử lại')
    }
  }

  return (
    <>
      <Confirm showConfirm={showConfirm} content="Đã xác nhận!" />
      {address.length > 0 && (
        <Item
          sx={{
            fontSize: '1.6rem',
            maxHeight: '47rem',
            overflowY: 'auto',
            width: '100%',
            padding: 0,
            borderRadius: 0,
          }}
        >
          {dataRegister.length > 0
            ? data?.map((item: any, index: number) => {
                if (item.status !== 0) {
                  return
                }
                // di chuyển từ
                const province =
                  address.filter((itemAddress: any) => item.province === itemAddress.code)[0] || {}
                const district =
                  province.districts?.filter(
                    (itemAddress: any) => item.district === itemAddress.code
                  )[0] || {}
                const ward =
                  district.wards?.filter((itemAddress: any) => item.ward === itemAddress.code)[0] ||
                  {}
                // di chuyển tới
                const responseProvince =
                  address.filter(
                    (itemAddress: any) => item.provinceResidence === itemAddress.code
                  )[0] || {}
                const responseDistrict =
                  responseProvince.districts?.filter(
                    (itemAddress: any) => item.districtResidence === itemAddress.code
                  )[0] || {}
                const responseWard =
                  responseDistrict.wards?.filter(
                    (itemAddress: any) => item.wardResidence === itemAddress.code
                  )[0] || {}
                return (
                  <ListItem
                    key={index}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      minWidth: { lg: '400px' },
                      marginBottom: '20px',
                      padding: '1.2rem',
                      alignItems: 'flex-start',
                      '&:last-child': { marginBottom: '0' },
                      boxShadow: 3,
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        borderBottom: `1px solid #1976d2`,
                      }}
                    >
                      <Typography
                        component="span"
                        m={0}
                        sx={{
                          fontWeight: 'bold',
                          fontSize: '1.6rem',
                        }}
                      >
                        Ngày di chuyển: {item.time}
                      </Typography>
                    </Box>
                    <ListItemText
                      sx={{
                        color: 'black',
                        width: '100%',
                        marginTop: '5px',
                        '& .MuiTypography-root': { fontSize: '1.4rem', fontWeight: '400' },
                      }}
                      primary={`Di chuyển từ: ${item.specificAddress}`}
                      secondary={`${ward.name || ''} - ${district.name || ''} - ${
                        province.name || ''
                      }`}
                    />
                    <ListItemText
                      sx={{
                        color: 'black',
                        width: '100%',
                        marginBottom: '10px',
                        '& .MuiTypography-root': { fontSize: '1.4rem', fontWeight: '400' },
                      }}
                      primary={`Di chuyển tới: ${item.specificAddressResidence}`}
                      secondary={`${responseWard.name || ''} - ${responseDistrict.name || ''} - ${
                        responseProvince.name || ''
                      }`}
                    />
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '20px',
                        '& .MuiButton-root': { fontSize: '1.3rem' },
                      }}
                    >
                      <Button
                        onClick={() => handleconfirm(item.id, 1)}
                        sx={{ marginRight: '20px' }}
                        variant="contained"
                        color="primary"
                        size="small"
                      >
                        Phê duyệt
                      </Button>
                      <Button
                        onClick={() => handleconfirm(item.id, 2)}
                        variant="contained"
                        color="error"
                        size="small"
                      >
                        Từ chối
                      </Button>
                    </Box>
                  </ListItem>
                )
              })
            : 'Không có yêu cầu nào cần xác nhận!'}
        </Item>
      )}
    </>
  )
}

export default Confirmation
