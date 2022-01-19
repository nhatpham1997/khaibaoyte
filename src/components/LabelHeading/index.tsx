import './LabelHeading.css'

interface props {
  text: string
  color?: string
}

function LabelHeading({ text, color = 'black' }: props) {
  return (
    <span className="label-heading" style={{ color: color }}>
      {text}
    </span>
  )
}

export default LabelHeading
