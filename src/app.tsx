import Taro, { Component } from '@tarojs/taro'
import '@tarojs/async-await'
import Index from './pages/index'
import './app.css'

class App extends Component {
  config = {
    pages: [
      'pages/index/index',
    ],
    // tabBar: {
    //   list: [{
    //     'iconPath': 'resource/latest.png',
    //     'selectedIconPath': 'resource/lastest_on.png',
    //     pagePath: 'pages/index/index',
    //     text: '最新'
    //   }],
    //   'color': '#000',
    //   'selectedColor': '#56abe4',
    //   'backgroundColor': '#fff',
    //   'borderStyle': 'white'
    // },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'V2EX',
      navigationBarTextStyle: 'black'
    }
  }

  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
