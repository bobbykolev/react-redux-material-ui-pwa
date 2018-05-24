// More info on Webpack's Node API here: https://webpack.github.io/docs/node.js-api.html
// Allowing console calls below since this is a build file.
/* eslint-disable no-console */
import webpack from 'webpack';
import configCordova from '../webpack.config.cordova';
import configProd from '../webpack.config.prod';
import {chalkError, chalkSuccess, chalkWarning, chalkProcessing} from './chalkConfig';
import fs from 'fs';

const env = process.env.config ? process.env.config.split('_')[0] : 'dev';
const isCordova = process.env.config ? !!(process.env.config.split('_')[1] && process.env.config.split('_')[1] === 'cordova') : false;

process.env.NODE_ENV = 'production'; // this assures React is built in prod mode and that the Babel dev config doesn't apply.

console.log(chalkProcessing('Generating minified bundle. This will take a moment... ENV: ', process.env.config));

function moveConfig () {
  let readStream, writeStream,
      outputFolder = isCordova ? './Cordova/www/' : './dist/',
      envFolder = env,
      file = 'config.json';

  if (isCordova) {
    let config = require('../env/' + envFolder + '/' + file);

    fs.writeFile(outputFolder + 'config.js', "window.config = "+JSON.stringify(config), function(err) {
        if(err) {
            return console.log(err);
        }

        console.log('config.js moved');
    });
  } else {
    readStream = fs.createReadStream('./env/' + envFolder + '/' + file);
    writeStream = fs.createWriteStream(outputFolder + file);

    readStream.on('error', function(){});
    writeStream.on('error', function(){});

    readStream.pipe(writeStream);
  }

}

moveConfig();

webpack(isCordova ? configCordova : configProd).run((error, stats) => {
  if (error) { // so a fatal error occurred. Stop here.
    console.log(chalkError(error));
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(chalkError(error)));
  }

  if (jsonStats.hasWarnings) {
    console.log(chalkWarning('Webpack generated the following warnings: '));
    jsonStats.warnings.map(warning => console.log(chalkWarning(warning)));
  }

  console.log(`Webpack stats: ${stats}`);

  // if we got this far, the build succeeded.
  console.log(chalkSuccess('Your app is compiled in production mode in /dist. It\'s ready to roll!'));

  return 0;
});
