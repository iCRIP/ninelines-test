import 'babel-polyfill';
import svg4everybody from 'svg4everybody';
import $ from 'jquery';
import Foundation from 'foundation-sites';

svg4everybody();

window.$ = $;
window.jQuery = $;

Foundation.addToJquery($);
$(document).foundation();
require('ninelines-ua-parser');
