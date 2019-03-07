import Taro, { Component } from '@tarojs/taro'
import { IndexApp } from '../../components/wraper/index'
import { View, Text, Navigator } from '@tarojs/components'
import './index.css'

class Index extends Component<{}, {}> {
  config = {
    navigationBarTitleText: '首页'
  }

  render() {
    return (
      <View >
        <IndexApp />
      </View>
    )
  }
}

export default Index
