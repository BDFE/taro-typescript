import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import './index.css'

interface IProps {
  children?: any,
  showPanel: boolean
}

class Panel extends Component<IProps, {}> {
  static defaultProps = {
    children: null,
    showPanel: false
  }
  render() {
    const { showPanel, children } = this.props

    return <View className={showPanel ? 'detail' : 'main'}>
      {showPanel
        ? <View className='inline' >
          <Button plain type='primary'>按钮</Button>
          <Button plain type='primary' disabled>不可点击的按钮</Button>
          <Button plain>镂空按钮</Button>
          <Button plain disabled>镂空按钮 Disabled</Button>
          <View className='btn-center'>
            <Button size='mini' type='primary'>小号按钮</Button>
            <Button size='mini'>小号按钮</Button>
            <Button size='mini' type='warn'>小号按钮</Button>
          </View>
        </View>
        : null
      }
      <View className='inline' >
        <Text className='block' >
          文本{showPanel}
        </Text>
      </View>
    </View>
  }
    
export { Panel }
