import { useState } from "react";
import QRCode from "react-qr-code";

import './App.css';

enum Platform  {
    Linux = 'linux',
    Mac = 'mac',
    Windows = 'windows',
};

interface Props {
    wifiAp: string;
    wifiPw: string;
}

const commandLineForPlattform = (platform : Platform, wifiAp : string, wifiPw : string): string => {
    switch(platform) {
        case Platform.Linux:
            return `Not implemented`;
        case Platform.Mac:
            return `/usr/sbin/networksetup -setairportnetwork ${wifiAp} ${wifiPw}`;
        case Platform.Windows:
            return `netsh wlan connect ssid=${wifiAp} name=gopro`
    }
}


const WifiJoin = ({wifiAp, wifiPw} : Props) => {
    const [platform, setPlatform] = useState(Platform.Mac);
    
return (     
    <>
    <QRCode value={`WIFI:T:WPA;S:${wifiAp};P:${wifiPw};;`} />
    <div>
        <span onClick={() => setPlatform(Platform.Linux)} className={ platform === Platform.Linux ? "selected" : "unselected"}>Linux</span> | 
        <span onClick={() => setPlatform(Platform.Mac)} className={ platform === Platform.Mac ? "selected" : "unselected"}>Mac</span> | 
        <span onClick={() => setPlatform(Platform.Windows)} className={ platform === Platform.Windows ? "selected" : "unselected"}>Windows</span>
    </div>
    <input type="text" readOnly value={commandLineForPlattform(platform, wifiAp, wifiPw)} /><button>COPY</button>
    </>)
}

export default WifiJoin;