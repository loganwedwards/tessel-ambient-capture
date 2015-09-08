# Tessel: Ambient Capture
Photo Capture based on ambient noise level. When the system starts, it captures the noise level and sets this as the threshold. When the noise exceeds this level, an image is captured with the default camera settings into the user-defined folder.

## Setup
### Tools
1. Tessel
1. Tessel Ambient Module
1. Tessel Camera Module

### Installation
1. Plug the Tessel Ambient Module into port A
1. Plug the Tessel Camera Module into port B
1. `cd` into project directory and run `npm install`

## Usage
If wanting to use an `images` directory in the project, invoke the program as follows:

`tessel run app.js --upload-dir ./images`
