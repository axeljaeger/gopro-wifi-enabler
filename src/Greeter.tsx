import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';

import { SiGithub } from '@icons-pack/react-simple-icons';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';

import './index.css';

interface Props {
  onConnect: () => void;
  connecting: boolean;
  bluetoothUnavailable: boolean;
}

export default function Greeter({
  onConnect,
  connecting,
  bluetoothUnavailable,
}: Props) {
  return (
    <Card style={{ maxWidth: '400px' }}>
      <CardHeader
        action={
          <IconButton
            aria-label="settings"
            href="https://github.com/axeljaeger/gopro-wifi-enabler"
          >
            <SiGithub />
          </IconButton>
        }
        title="GoPro WiFi Enabler"
        subheader="Not an offering from GoPro"
      />
      <CardContent>
        This application allows you to put your camera into WiFi Access Mode so
        that you can start working with the{' '}
        <Link href="https://gopro.github.io/OpenGoPro/http_2_0">
          GoPro HTTP API
        </Link>
        . This is done by utilizing the{' '}
        <Link href="https://gopro.github.io/OpenGoPro/ble_2_0">
          GoPro Bluetooth API
        </Link>
        .
      </CardContent>
      <CardActions>
        {bluetoothUnavailable ? (
          <div className="error">
            Plattform does not support WebBluetooth.{' '}
            <Link href="https://github.com/axeljaeger/gopro-wifi-enabler/wiki/Platform-support">
              More
            </Link>
          </div>
        ) : (
          <Button
            variant="contained"
            onClick={onConnect}
            style={{ margin: 'auto' }}
          >
            Connect to camera
          </Button>
        )}
      </CardActions>
      {connecting && <LinearProgress />}
    </Card>
  );
}
