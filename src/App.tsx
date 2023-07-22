import { Component } from 'react';
import { GPBLE_CONSTANTS } from './gopro-bluetooth';

import QRCode from "react-qr-code";

import './App.css';

interface Props {

}

interface State {
  btConnected: boolean;
  wifiApActive: number;
  wifiAp: string;
  wifiPw: string;
  wifiQrCode: string;
  device: BluetoothDevice | null;
  commandCharacteristic: BluetoothRemoteGATTCharacteristic | null;
}

class App extends Component<Props, State> {
  constructor(props : Props) {
    super(props);

    this.state = {
      btConnected: false,
      wifiApActive: 0,
      wifiAp: '',
      wifiPw: '',
      wifiQrCode: '',
      device: null,
      commandCharacteristic: null,
    }
  }

  componentDidMount = async() => { }

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

    device.addEventListener('gattserverdisconnected', (event) => {
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
            this.setState({
              wifiApActive: enumValue
            })
          });

          const wifiAp = textDecoder.decode(apResult);
          const wifiPw = textDecoder.decode(pwResult);

          this.setState({
            wifiAp,
            wifiPw,
            wifiQrCode: `WIFI:T:WPA;S:${wifiAp};P:${wifiPw};;`
          });

          console.log("WIFI QR CODE: ", this.state.wifiQrCode);
        } else {
          console.log("GATT Server is null");
        }
    }  catch(error:any) {
      console.error("Error: ", error);
    }
  }

  disconnectBt = async () => { 
    this.state.device?.gatt?.disconnect();
  }

  setWifiEnabled = async (enabled : boolean) => {
    if (this.state.commandCharacteristic) {
      await this.state.commandCharacteristic.writeValue(enabled ? GPBLE_CONSTANTS.COMMAND_AP_ON : GPBLE_CONSTANTS.COMMAND_AP_OFF);
    }
  }


  render = () =>  {
    return (
      <div className="App">
      <h1>GoPro WiFi Enabler</h1>
      <div>Not an offering from GoPro</div>
      <p><a href="https://gopro.github.io/OpenGoPro/ble_2_0">GoPro BLE API</a></p>
      <button onClick={this.connectBt}>Connect to camera</button> <button onClick={this.disconnectBt}>Disconnect</button>
      <h2>{ this.state.btConnected ? "Connected camera:" : "Not connected to camera" }</h2>
      <table>
        <tbody>
      <tr>
      <th style={{color: this.state.btConnected ? 'black' : 'gray'}}>AP State</th><td>{this.state.wifiApActive}</td>
      </tr>
      <tr>
      <th><button onClick={ () => this.setWifiEnabled(true)} disabled={!this.state.btConnected}>Enable Wifi</button></th>
      <td><button onClick={ () => this.setWifiEnabled(false)} disabled={!this.state.btConnected}>Disable Wifi</button></td>
      </tr>
      <tr>
      <th style={{color: this.state.btConnected ? 'black' : 'gray'}}>AP SSID</th><td>{this.state.wifiAp}</td>
      </tr>
      <tr>
      <th style={{color: this.state.btConnected ? 'black' : 'gray'}}>AP Password</th><td>{this.state.wifiPw}</td>
      </tr>
      </tbody>
      </table>
      <div >
        <QRCode value={this.state.wifiQrCode} fgColor={this.state.btConnected ? '#000000' : '#eeeeee'}/>
      </div>
      </div>
    );
  }
}

export default App;
