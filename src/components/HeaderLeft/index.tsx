import * as React from 'react'
import { emphasize, styled } from '@mui/material/styles'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Chip from '@mui/material/Chip'
import HomeIcon from '@mui/icons-material/Home'

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[800]
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  }
}) as typeof Chip // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

function handleClick(event: React.MouseEvent<Element, MouseEvent>) {
  event.preventDefault()
  console.info('You clicked a breadcrumb.')
}

interface props {
  titleHeader: string
}

export default function HeaderLeft({ titleHeader }: props) {
  return (
    <div className="header-left" role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <StyledBreadcrumb
          sx={{ fontSize: '1.2rem' }}
          component="a"
          href="#"
          label="Trang chủ"
          icon={<HomeIcon fontSize="small" />}
        />
        <StyledBreadcrumb sx={{ fontSize: 12 }} component="a" href="#" label={titleHeader} />
      </Breadcrumbs>
    </div>
  )
}
