import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Map } from '@tarojs/components'
import './index.css'


interface IMarker {
  markerId: string,
  latitude: string,
  longitude: string,
  iconPath?: any
}

interface IState {
  scale: number,
  latitude: string,
  longitude: string,
  // markers: IMarker[],
  showLocation: (string | Boolean),
  centerInfo?: string,
  showOk?: string
}

interface IProps {
  test: string,
  onRegionchange?: any,
  onConfirm?: any,
  confirm?: any,
  [propName: string]: any,
}

class MyMap extends Component<IProps, IState> {
  mapContext = null;
  state = {
    scale: 16,
    latitude: '40.048828',
    longitude: '116.280412',
    showLocation: '1',
    centerInfo: '选择上报位置',
    showOk: "1",
  }

  componentDidMount() {
    if (!this.mapContext) {
      this.mapContext = Taro.createMapContext('mapId', this.$scope)
      Taro.getLocation({
        success: (res) => {
          this.updateCenterLocation(res);
          this.onConfirmLocation();
        }
      })
    }
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   let flag = true;
  //   if (JSON.stringify(this.state) == JSON.stringify(nextState)) {
  //     flag = false;
  //   }
  //   return flag;
  // }

  onConfirmLocation() {
    console.log('...')
    let fn = this.props.onConfirm;

    fn && fn({
      longitude: this.state.longitude,
      latitude: this.state.latitude,
    })

    let fn2 = this.props.confirm;
    fn2 && fn2({
      longitude: this.state.longitude,
      latitude: this.state.latitude,
    })
  }

  updateCenterLocation(res) {
    let latitude = res.latitude;
    let longitude = res.longitude;
    // let markers = JSON.parse(JSON.stringify(this.state.markers));
    // let marker = markers[0]
    // marker.longitude = longitude;
    // marker.latitude = latitude;
    console.log('loc u')
    this.setState({
      longitude: longitude,
      latitude: latitude,
      // markers,
    }, () => {
      this.translateMarker(longitude, latitude);
    });
  }

  translateMarker(longitude, latitude) {
    this.mapContext.translateMarker({
      markerId: 1,
      rotate: 0,
      autoRotate: true,
      duration: 500,
      destination: {
        latitude: latitude,
        longitude: longitude,
      },
      animationEnd() {
        console.log('animation end');
      }
    })
  }

  render() {
    let { centerInfo, scale, longitude, latitude, showLocation } = this.state;
    return (
      <Map
        id="mapId"
        className="map"
        scale={scale}
        longitude={longitude}
        latitude={latitude}
        markers={[{
          markerId: 1,
          latitude: latitude,
          longitude: longitude,
          iconPath: require('../../resource/point.png'),
        }]}
        showLocation={showLocation}
        enableZoom={true}
        enableRotate={true}
        showCompass={true}
        style="width: 100%; height: 100%;"
        onRegionchange={() => {
          if (this.changingRegion) {
            this.changingRegion = false;
            this.mapContext && this.mapContext.getCenterLocation({
              success: (res) => {
                this.updateCenterLocation(res)
              },
              fail: e => {
              },
              complete: e => {
              }
            })
          } else {
            this.changingRegion = true;
            let fn = this.props.updateCenter;
            fn && fn(null);
          }
        }}
        onupdated={() => {
          let fn = this.props.updateCenter;
          fn && fn({
            longitude: longitude,
            latitude: latitude,
          });
        }}
        onClick={() => {
          // console.log('map onClick')
        }}
      >
        <View className="controls">
          <View className="loc_info" >
            <View className="text">
              {centerInfo}
            </View>
            <View className="ok" onClick={this.onConfirmLocation.bind(this)}>
              {!!centerInfo ? '确定' : ''}
            </View>
          </View>
        </View>
        <View className="controls">
          <Image
            className="img"
            src={require('../../resource/location.png')}
            aria-label="label info"
            onClick=""
          />
        </View>
      </Map >
    )
  }
}

export default MyMap
