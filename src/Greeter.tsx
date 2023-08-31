import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';


import { SiGithub } from '@icons-pack/react-simple-icons';

interface Props {
    onConnect: () => void;
}

export default function Greeter({ onConnect } : Props) {
    return (
<Card>
<CardHeader
        action={
          <IconButton aria-label="settings" href="https://axeljaeger.github.io/goprowifienabler/">
            <SiGithub />
          </IconButton>
        }
        title="GoPro WiFi Enabler"
        subheader="Not an offering from GoPro"
      />
<CardContent>
    <p><Link href="https://gopro.github.io/OpenGoPro/ble_2_0">GoPro BLE API</Link></p>
</CardContent>
<CardActions>
    <Button variant="contained" onClick={onConnect} style={{margin: 'auto'}}>Connect to camera</Button>
</CardActions>
</Card>
    )
}