import * as Radium from 'radium';
import * as Bootstrap from 'react-bootstrap';
const reactRouterDom = require<any>('react-router-dom');
const ReCAPTCHA = require<any>('react-google-recaptcha');

// Bootstrap components
export const ControlLabel = Radium(Bootstrap.ControlLabel);
export const FormControl = Radium(Bootstrap.FormControl);
export const Pagination = Radium(Bootstrap.Pagination);
export const HelpBlock = Radium(Bootstrap.HelpBlock);
export const FormGroup = Radium(Bootstrap.FormGroup);
export const Checkbox = Radium(Bootstrap.Checkbox);
export const Button = Radium(Bootstrap.Button);
export const Modal = Radium(Bootstrap.Modal);
export const Panel = Radium(Bootstrap.Panel);
export const Table = Radium(Bootstrap.Table);
export const Radio = Radium(Bootstrap.Radio);
export const Form = Radium(Bootstrap.Form);
export const Grid = Radium(Bootstrap.Grid);
export const Col = Radium(Bootstrap.Col);
export const Row = Radium(Bootstrap.Row);

// React-router components
export const Link = Radium(reactRouterDom.Link);

// Google ReCaptcha
export const ReCaptcha = Radium(ReCAPTCHA);
