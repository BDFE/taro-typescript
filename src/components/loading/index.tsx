import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
const url = require('../resource/spiner.gif')
import './loading.css'

interface IProps {
  children?: any,
  loading: boolean
}

class Loading extends Component<IProps, {}> {
  static defaultProps = {
    children: null,
    loading: false
  }
  render() {
    const { loading, children } = this.props

    if (loading) {
      return <View className='loading'>
        <Image src={url} className='img' />
      </View>;
    } else {
      return children;
    }
  }
}

export { Loading }
