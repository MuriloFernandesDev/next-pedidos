import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useProSidebar } from 'react-pro-sidebar'
import styles from '../../styles/styles.module.css'

const ToolTip = ({ title }: { title: string }) => {
  const { collapsed } = useProSidebar()
  return (
    <div className={`absolute  z-50 ${!collapsed && 'hidden'}`}>
      <div
        className={`fixed z-50 left-15 bg-white drop-shadow-xl p-2 -mt-8 rounded-xl ${styles.showToolTip}`}
      >
        <div className="relative text-primary text-xs">{title}</div>
        <div className="absolute -left-2 top-1">
          <FontAwesomeIcon
            icon={faPlay}
            className="w-3 h-3 text-white rotate-180"
          />
        </div>
      </div>
    </div>
  )
}

export default ToolTip
