import './Content.css'

interface props {
  children: any
}

function Content({ children }: props) {
  return <div className="content">{children}</div>
}

export default Content
