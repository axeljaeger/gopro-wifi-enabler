import WifiJoin from "./WifiJoin";
import FormGroup from "@mui/material/FormGroup/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import Switch from "@mui/material/Switch/Switch";
import Card from "@mui/material/Card/Card";
import CardContent from "@mui/material/CardContent/CardContent";
import TextField from "@mui/material/TextField/TextField";
import CardActions from "@mui/material/CardActions/CardActions";
import Button from "@mui/material/Button/Button";
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";
import IconButton from "@mui/material/IconButton/IconButton";
import { ContentCopy } from "@mui/icons-material";

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
                >
                  <ContentCopy />
                </IconButton>
              </InputAdornment>
            )
          }}
          margin="dense" fullWidth
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
                >
                  <ContentCopy />
                </IconButton>
              </InputAdornment>
            )
          }}
          margin="dense" fullWidth
        />
        <WifiJoin wifiAp={wifiAp} wifiPw={wifiPw} />
      </CardContent>

      <CardActions>
        <Button type="button" onClick={onDisconnect} variant="contained" style={{margin: 'auto'}}>
          Disconnect
        </Button>
      </CardActions>
    </Card>
  );
};

export default CameraDisplay;
