var tessel = require('tessel'),
    ambient = require('ambient-attx4').use(tessel.port['A']),
    camera = require('camera-vc0706').use(tessel.port['B']);

var led1 = tessel.led[0].output(1); // yellow
var led2 = tessel.led[1].output(1); // blue

process.env.TESSEL_UPLOAD_DIR = './images';
var startingNoiseLevel;

function getNoise (done) {
  ambient.getSoundLevel(function (err, data) {
    if (err) {
      return done(err, null);
    }
    return done(null, parseFloat(data.toFixed(3)));
  });
}

function capturePhoto (done) {
  led2.toggle();
  camera.takePicture(function (err, image) {
    if (err) {
      return done(err, null);
    } else {
      process.sendfile('image-' + Date.now() + '.jpg', image);
      //camera.disable();
      return done(null, null);
    }
  })
}

function loop () {
  setInterval(function () {
    getNoise(function (err, data) {
      if (data > startingNoiseLevel) {
        var diff = data - startingNoiseLevel;
        console.log('Change ' + diff);
        setTimeout(function () {
          capturePhoto(function (err, data) {
            led2.toggle();
            if (err) {
              throw new Error(err);
            } else {
              console.log('photo captured');
            }

          });
        }, 500);

      }
    });
  }, 200);
}

// setup of devices
camera.on('ready', function () {
  ambient.on('ready', function () {
    // let's just look for a change in noise
    getNoise(function (err, data) {
      startingNoiseLevel = data;
      console.log('starting level ' + data);
    });

    loop();
  });
});

camera.on('error', function(err) {
  console.error(err);
});
