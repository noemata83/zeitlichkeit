import red from '@material-ui/core/colors/red';
import pink from '@material-ui/core/colors/pink';
import purple from '@material-ui/core/colors/purple';
import indigo from '@material-ui/core/colors/indigo';
import blue from '@material-ui/core/colors/blue';
import lightBlue from '@material-ui/core/colors/lightBlue';
import cyan from '@material-ui/core/colors/cyan';
import green from '@material-ui/core/colors/green';
import lime from '@material-ui/core/colors/lime';
import yellow from '@material-ui/core/colors/yellow';
import orange from '@material-ui/core/colors/orange';
import brown from '@material-ui/core/colors/brown';
import grey from '@material-ui/core/colors/grey';
import blueGrey from '@material-ui/core/colors/blueGrey';

const getColorRange = color => [color[300], color[500], color[700]];

export default [
  ...getColorRange(red),
  ...getColorRange(pink),
  ...getColorRange(purple),
  ...getColorRange(indigo),
  ...getColorRange(blue),
  ...getColorRange(lightBlue),
  ...getColorRange(cyan),
  ...getColorRange(green),
  ...getColorRange(lime),
  ...getColorRange(yellow),
  ...getColorRange(orange),
  ...getColorRange(brown),
  ...getColorRange(grey),
  ...getColorRange(blueGrey),
];
