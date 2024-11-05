import { ContentCopy } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Collapse, Link, Typography } from '@mui/material';
import Button from '@mui/material/Button/Button';
import Card from '@mui/material/Card/Card';
import CardActions from '@mui/material/CardActions/CardActions';
import CardContent from '@mui/material/CardContent/CardContent';
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import FormGroup from '@mui/material/FormGroup/FormGroup';
import IconButton, {
  type IconButtonProps,
} from '@mui/material/IconButton/IconButton';
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import Switch from '@mui/material/Switch/Switch';
import TextField from '@mui/material/TextField/TextField';
import { styled } from '@mui/material/styles';
import React from 'react';
import QRCode from 'react-qr-code';
import WifiJoin from './WifiJoin';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface Props {
  wifiApActive: boolean;
  wifiAp: string;
  wifiPw: string;
  onWifiEnabledChange: (enable: boolean) => void;
  onDisconnect: () => void;
}

const CameraDisplay = ({
  wifiAp,
  wifiApActive,
  wifiPw,
  onWifiEnabledChange,
  onDisconnect,
}: Props) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ minWidth: 275, maxWidth: 300 }}>
      <CardContent>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={wifiApActive}
                onChange={($event, checked) => onWifiEnabledChange(checked)}
              />
            }
            label="AP Enabled"
            labelPlacement="start"
          />
        </FormGroup>

        <TextField
          label="SSID"
          variant="standard"
          defaultValue={wifiAp}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() => navigator.clipboard.writeText(wifiAp)}
                >
                  <ContentCopy />
                </IconButton>
              </InputAdornment>
            ),
          }}
          margin="dense"
          fullWidth
        />
        <TextField
          label="Password"
          variant="standard"
          defaultValue={wifiPw}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() => navigator.clipboard.writeText(wifiPw)}
                >
                  <ContentCopy />
                </IconButton>
              </InputAdornment>
            ),
          }}
          margin="dense"
          fullWidth
        />
        <WifiJoin wifiAp={wifiAp} wifiPw={wifiPw} />
        <Typography variant="body2" style={{ marginTop: '16px' }}>
          Your camera is accessable at:{' '}
          <Link href="http://10.5.5.9:8080">10.5.5.9:8080</Link>. For example,
          you can browse the{' '}
          <Link href="http://10.5.5.9:8080/gopro/media/list">media</Link>.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button type="button" onClick={onDisconnect} variant="outlined">
          Disconnect
        </Button>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <QRCode
          value={`WIFI:T:WPA;S:${wifiAp};P:${wifiPw};;`}
          style={{ margin: '20px' }}
        />
      </Collapse>
    </Card>
  );
};

export default CameraDisplay;
