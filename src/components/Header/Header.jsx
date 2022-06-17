import { ReactComponent as GitHub } from '../../assets/github-white.svg'

const header = () => {
  return (
    <div className="top-line">
      <div className="top-line-left">
        <div className="top-line-by">Createby</div>
        <a className="top-line-name" href="true">
          <span className="-css">op-chen</span>
        </a>
      </div>
      <GitHub className="top-line-right" onClick={() => {
        window.open('https://github.com/DBSDs')
      }}
      />
    
    </div>
  )
}
export default header