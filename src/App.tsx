import { Component } from 'react';
import { GPBLE_CONSTANTS } from './gopro-bluetooth';

import './App.css';
import Greeter from './Greeter';
import CameraDisplay from './CameraDisplay';

interface Props {

}

interface State {
  btConnected: boolean;
  wifiApActive: boolean;
  wifiAp: string;
  wifiPw: string;
  device: BluetoothDevice | null;
  commandCharacteristic: BluetoothRemoteGATTCharacteristic | null;
}

class App extends Component<Props, State> {
  constructor(props : Props) {
    super(props);

    this.state = {
      btConnected: false,
      wifiApActive: false,
      wifiAp: '',
      wifiPw: '',
      device: null,
      commandCharacteristic: null,
    }
  }

  connectBt = async () => {
    const device : BluetoothDevice = await navigator.bluetooth.requestDevice({ 
      filters: [{
      manufacturerData: [{
        companyIdentifier: GPBLE_CONSTANTS.COMPANY_IDENTIFIER,
      }]
    }],
    optionalServices: [
      GPBLE_CONSTANTS.CONTROL_QUERY_SERVICE,
      GPBLE_CONSTANTS.CAMERA_MANAGEMENT_SERVICE,
      GPBLE_CONSTANTS.WIFI_AP_SERVICE
    ]
    });

    this.setState({
      btConnected: true,
      device
    })

    device.addEventListener('gattserverdisconnected', () => {
      this.setState({
        btConnected: false
      })
    });
  
    try {      
        const gattServer = device.gatt;
        if (gattServer) {
          const server = await gattServer.connect(); 

          const cqService = await server.getPrimaryService(GPBLE_CONSTANTS.CONTROL_QUERY_SERVICE);
          const commandCharacteristic = await cqService.getCharacteristic(GPBLE_CONSTANTS.COMMAND);          
          this.setState({
            commandCharacteristic
          });

          // READ AP
          const apService = await server.getPrimaryService(GPBLE_CONSTANTS.WIFI_AP_SERVICE);
          const apCharacteristic = await apService.getCharacteristic(GPBLE_CONSTANTS.WIFI_AP_SSID_CHARACTERISTIC);
          const apResult = await apCharacteristic.readValue();
          
          const textDecoder = new TextDecoder();
        
          // READ PW
          const pwCharacteristic = await apService.getCharacteristic(GPBLE_CONSTANTS.WIFI_AP_PASSWORD_CHARACTERISTIC);
          const pwResult = await pwCharacteristic.readValue();
        
          // Indicate WIFI State
          const apStateCharacteristic = await apService.getCharacteristic(GPBLE_CONSTANTS.WIFI_AP_STATE_CHARACTERISTIC);
          await apStateCharacteristic.startNotifications();
          apStateCharacteristic.addEventListener('characteristicvaluechanged', (event : any) => {
            const data : DataView = event.target?.value;
            const enumValue = data.getInt8(0);
            console.log(enumValue);
            this.setState({
              wifiApActive: enumValue !== 0 ? true : false
            })
          });

          const wifiAp = textDecoder.decode(apResult);
          const wifiPw = textDecoder.decode(pwResult);

          this.setState({
            wifiAp,
            wifiPw,
          });
        } else {
          console.log("GATT Server is null");
        }
    }  catch(error:any) {
      console.error("Error: ", error);
    }
  }

  disconnectBt = () => { 
    this.state.device?.gatt?.disconnect();
  }

  setWifiEnabled = async (enabled : boolean) => {
    if (this.state.commandCharacteristic) {
      console.log(`Enable Wifi ${enabled}`);
      await this.state.commandCharacteristic.writeValue(enabled ? GPBLE_CONSTANTS.COMMAND_AP_ON : GPBLE_CONSTANTS.COMMAND_AP_OFF);
    }
  }

  render = () =>  {
    if (this.state.btConnected) {
      return (
        <CameraDisplay 
          onDisconnect={this.disconnectBt} 
          onWifiEnabledChange={this.setWifiEnabled}
          wifiAp={this.state.wifiAp}
          wifiApActive={this.state.wifiApActive}
          wifiPw={this.state.wifiPw}          
          />
      )
    } else {
      return <Greeter onConnect={this.connectBt} />;
    }
  }
}

export default App;
