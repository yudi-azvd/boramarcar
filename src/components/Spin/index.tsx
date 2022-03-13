import { Spin as AntdSpin } from "antd";
import { LoadingOutlined } from '@ant-design/icons'

export interface Props {
  spinning: boolean
}

const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} />

const Spin: React.FC<Props> = ({ spinning }) => {
  return (
    <AntdSpin spinning={spinning} indicator={ loadingIcon } />
  )
}

export default Spin