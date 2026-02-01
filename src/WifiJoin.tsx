import { useState } from 'react';

import './App.css';
import { SiApple, SiLinux } from '@icons-pack/react-simple-icons';
import { ContentCopy } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

enum Platform {
  Linux = 'linux',
  Mac = 'mac',
}

interface Props {
  wifiAp: string;
  wifiPw: string;
}

const commandLineForPlattform = (
  platform: Platform,
  wifiAp: string,
  wifiPw: string,
): string => {
  switch (platform) {
    case Platform.Linux:
      return 'Not implemented';
    case Platform.Mac:
      return `/usr/sbin/networksetup -setairportnetwork ${wifiAp} ${wifiPw}`;
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
              <IconButton
                edge="end"
                onClick={() =>
                  navigator.clipboard.writeText(
                    commandLineForPlattform(platform, wifiAp, wifiPw),
                  )
                }
              >
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
          <SiLinux size={16} style={{ marginRight: '8px' }} />
          Linux
        </ToggleButton>
        <ToggleButton value={Platform.Mac}>
          <SiApple size={16} style={{ marginRight: '8px' }} />
          Mac
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
};

export default WifiJoin;
