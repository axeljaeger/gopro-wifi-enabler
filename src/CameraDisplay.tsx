import WifiJoin from "./WifiJoin";

interface Props {
    wifiApActive: boolean;
    wifiAp: string;
    wifiPw: string;
    onWifiEnabledChange: (enable: boolean) => void;
    onDisconnect: () => void;
}

const CameraDisplay = ({wifiAp, wifiApActive, wifiPw, onWifiEnabledChange, onDisconnect} : Props) => {
return (     
    <>
    <div>
    <table>
    <tbody>
  <tr>
  <th>AP State</th><td>{wifiApActive}</td>
  </tr>
  <tr>
  <th><button type="button" onClick={ () => onWifiEnabledChange(true)} disabled={wifiApActive}>Enable Wifi</button></th>
  <td><button type="button" onClick={ () => onWifiEnabledChange(false)} disabled={!wifiApActive}>Disable Wifi</button></td>
  </tr>
  <tr>
  <th>AP SSID</th><td>{wifiAp}</td>
  </tr>
  <tr>
  <th>AP Password</th><td>{wifiPw}</td>
  </tr>
  </tbody>
  </table>
  <div >
    <WifiJoin wifiAp={wifiAp} wifiPw={wifiPw} />
  </div>
  <button type="button" onClick={onDisconnect}>Disconnect</button>
  </div>
</>)
}

export default CameraDisplay;