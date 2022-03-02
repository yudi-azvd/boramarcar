import { useSocket } from "@/hooks/socket"
import { Tooltip } from "antd"

const Dashboard: React.FC = () => {
  const { user } = useSocket()

  return (
    <div>
      <h1>Heatmap-Schedule</h1>
      <Tooltip title={user?.id}>
        <p>{user?.name} seu ID é {user?.id}</p>
        {user?.isOwner ?? <span>Você é o dono da sala</span>}
      </Tooltip>
    </div>
  )
}

export default Dashboard