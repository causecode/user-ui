import * as React from 'react';
import * as Radium from 'radium';
import * as Router from 'react-router-dom';
import * as Bootstrap from 'react-bootstrap';
const ReCAPTCHA = require<any>('react-google-recaptcha').default;

// Bootstrap components
export const ControlLabel: React.ComponentClass<Bootstrap.ControlLabelProps> = Radium(Bootstrap.ControlLabel);
export const FormControl: React.ComponentClass<Bootstrap.FormControlProps> = Radium(Bootstrap.FormControl);
export const Pagination: React.ComponentClass<Bootstrap.PaginationProps> = Radium(Bootstrap.Pagination);
export const HelpBlock: React.ComponentClass<Bootstrap.HelpBlockProps> = Radium(Bootstrap.HelpBlock);
export const FormGroup: React.ComponentClass<Bootstrap.FormGroupProps> = Radium(Bootstrap.FormGroup);
export const Checkbox: React.ComponentClass<Bootstrap.CheckboxProps> = Radium(Bootstrap.Checkbox);
export const Button: React.ComponentClass<Bootstrap.ButtonProps> = Radium(Bootstrap.Button);
export const Modal: React.ComponentClass<Bootstrap.ModalProps> = Radium(Bootstrap.Modal);
export const ModalBody: React.ComponentClass<Bootstrap.ModalBodyProps> = Radium(Bootstrap.ModalBody);
export const ModalFooter: React.ComponentClass<Bootstrap.ModalFooterProps> = Radium(Bootstrap.ModalFooter);
export const ModalHeader: React.ComponentClass<Bootstrap.ModalHeaderProps> = Radium(Bootstrap.ModalHeader);
export const Panel: React.ComponentClass<Bootstrap.PanelProps> = Radium(Bootstrap.Panel);
export const Table: React.ComponentClass<Bootstrap.TableProps> = Radium(Bootstrap.Table);
export const Radio: React.ComponentClass<Bootstrap.RadioProps> = Radium(Bootstrap.Radio);
export const Form: React.ComponentClass<Bootstrap.FormProps> = Radium(Bootstrap.Form);
export const Grid: React.ComponentClass<Bootstrap.GridProps> = Radium(Bootstrap.Grid);
export const Col: React.ComponentClass<Bootstrap.ColProps> = Radium(Bootstrap.Col);
export const Row: React.ComponentClass<Bootstrap.RowProps> = Radium(Bootstrap.Row);

// React-router components
export const Link: React.ComponentClass<Router.LinkProps> = Radium(Router.Link);

// Google ReCaptcha
export const ReCaptcha = Radium(ReCAPTCHA);
