import { useState } from "react";

import "./App.css";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton/ToggleButton";
import { SiApple, SiLinux, SiWindows } from "@icons-pack/react-simple-icons";
import TextField from "@mui/material/TextField/TextField";
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";
import IconButton from "@mui/material/IconButton/IconButton";
import { ContentCopy } from "@mui/icons-material";

enum Platform {
  Linux = "linux",
  Mac = "mac",
  Windows = "windows",
}

interface Props {
  wifiAp: string;
  wifiPw: string;
}

const commandLineForPlattform = (
  platform: Platform,
  wifiAp: string,
  wifiPw: string
): string => {
  switch (platform) {
    case Platform.Linux:
      return `Not implemented`;
    case Platform.Mac:
      return `/usr/sbin/networksetup -setairportnetwork ${wifiAp} ${wifiPw}`;
    case Platform.Windows:
      return `netsh wlan connect ssid=${wifiAp} name=gopro`;
  }
};

const WifiJoin = ({ wifiAp, wifiPw }: Props) => {
  const [platform, setPlatform] = useState(Platform.Mac);

  return (
    <>
      <TextField
        label="Join the camera's WiFi using the command line"
        variant="standard"
        multiline
        value={commandLineForPlattform(platform, wifiAp, wifiPw)}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={() => navigator.clipboard.writeText(commandLineForPlattform(platform, wifiAp, wifiPw))}>
                <ContentCopy />
              </IconButton>
            </InputAdornment>
          ),
        }}
        margin="dense"
        fullWidth
        //style={{ maxWidth: "250px" }}
      />
      <ToggleButtonGroup
        size="small"
        value={platform}
        exclusive
        onChange={(event, platform) => setPlatform(platform)}
        aria-label="Platform"
      >
        <ToggleButton value={Platform.Linux}>
          <SiLinux size={16} style={{ marginRight: "8px" }} />
          Linux
        </ToggleButton>
        <ToggleButton value={Platform.Mac}>
          <SiApple size={16} style={{ marginRight: "8px" }} />
          Mac
        </ToggleButton>
        <ToggleButton value={Platform.Windows}>
          <SiWindows size={16} style={{ marginRight: "8px" }} />
          Windows
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
};

export default WifiJoin;
