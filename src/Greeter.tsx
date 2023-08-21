interface Props {
    onConnect: () => void;
}

export default function Greeter({ onConnect } : Props) {
    return (
        <>
        <h1>GoPro WiFi Enabler</h1>
        <div>Not an offering from GoPro</div>
        <p><a href="https://gopro.github.io/OpenGoPro/ble_2_0">GoPro BLE API</a></p>
        <a href="https://axeljaeger.github.io/goprowifienabler/"><img alt="GitHub" src="github-mark.svg" width={24}></img></a>
        <button onClick={onConnect}>Connect to camera</button>
        </>
    )
}