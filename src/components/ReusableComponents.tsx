import * as Radium from 'radium';
import * as Bootstrap from 'react-bootstrap';
const ReCAPTCHA = require<any>('react-google-recaptcha');

// Bootstrap components
export const ControlLabel = Radium(Bootstrap.ControlLabel);
export const FormControl = Radium(Bootstrap.FormControl);
export const HelpBlock = Radium(Bootstrap.HelpBlock);
export const FormGroup = Radium(Bootstrap.FormGroup);
export const Checkbox = Radium(Bootstrap.Checkbox);
export const Button = Radium(Bootstrap.Button);
export const Panel = Radium(Bootstrap.Panel);
export const Radio = Radium(Bootstrap.Radio);
export const Form = Radium(Bootstrap.Form);
export const Col = Radium(Bootstrap.Col);
export const Row = Radium(Bootstrap.Row);

// Google ReCaptcha
export const ReCaptcha = Radium(ReCAPTCHA);
