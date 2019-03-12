import Taro, { Component } from '@tarojs/taro'
import api from '../../utils/api'
import { Loading } from '../../components/loading/index'
import { MyMap } from '../../components/map/index'
import { Panel } from '../../components/panel/index'
import { View, Text, Navigator } from '@tarojs/components'
import './index.css'

interface IState {
  loading: boolean,
  showPanel: boolean,
  centerInfo: any,
  location: any,
}

class Index extends Component<{}, IState> {
  config = {
    navigationBarTitleText: '首页'
  }
  state = {
    loading: true,
    showPanel: false,
    location: null,
    centerInfo: '选择中心'
  }

  shouldComponentUpdate(nextProps, nextState) {
    let flag = true;
    // if (JSON.stringify(this.state) == JSON.stringify(nextState)) {
    //   flag = false;
    // }
    console.log('flag', flag)
    return flag;
  }

  confirmLoc() {
    console.log('confirmLoc')
    try {
      this.setState({
        showPanel: true
      }, () => {
        console.log('confirmLoc')
      })
    } catch (error) {
    }
  }

  render() {
    const { loading, centerInfo, location, showPanel } = this.state
    console.log('showPanel', showPanel)
    return (
      <View className='outer'>
        <View className='map_wraper'>
          <MyMap
            updateCenter={(lnglat, context) => {
              console.log('updateCenter', lnglat)
              this.setState({
                location: lnglat,
                showPanel: false
              })
            }}
            confirm={(lnglat) => {
              console.log('confirm')
              this.confirmLoc()
            }}
            onConfirm={(lnglat) => {
              console.log('onConfirm')
              this.confirmLoc()
            }}
          >
          </MyMap>
        </View>
        <View className='panel_wraper'>
          <Panel
            showPanel={showPanel}
          />
        </View>
      </View>
    )
  }
}

export default Index
