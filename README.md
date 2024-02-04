# GoPro WiFI Enabler
*Enabler to work with the GoPro API*


[![Static Badge](https://img.shields.io/badge/Go%20to%20app-black?logo=github)](https://axeljaeger.github.io/gopro-wifienabler/)
[![Chromatic](https://github.com/axeljaeger/gopro-wifienabler/actions/workflows/chromatic.yaml/badge.svg)](https://github.com/axeljaeger/gopro-wifienabler/actions/workflows/chromatic.yaml)
[![Storybook](https://img.shields.io/badge/storybook-26077C?logo=storybook&logoColor=%23ffffff&labelColor=%23E06A8C)](https://main--64f774d623d944150305ccd4.chromatic.com/)

In order to start developing applications against the [GoPro HTTP API](https://gopro.github.io/OpenGoPro/http) over WIFI, you need to enable the WIFI interface using Bluetooth. This application gives you a fast and easy way to do this, so you can start working with the HTTP API. The technical foundation is the [WebBluetooth API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API).

## Plattform Support ##
This application was successfully tested on Mac using Chrome. It will not work in Safari or Firefox due to the missing WebBluetooth API. Chrome on Windows was so far not successfull.
