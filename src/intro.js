/**
 *
 * FULL TILT
 * http://github.com/richtr/Full-Tilt
 *
 * A standalone DeviceOrientation + DeviceMotion JavaScript library that
 * normalises orientation sensor input, applies relevant screen orientation
 * transforms, returns Euler Angle, Quaternion and Rotation
 * Matrix representations back to web developers and provides conversion
 * between all supported orientation representation types.
 *
 * Copyright: 2014 Rich Tibbett
 * License:   MIT
 *
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], function () {
            return (root.returnExportsGlobal = factory());
        });
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals
        root.returnExportsGlobal = factory();
    }
}(this, function () {

var M_PI   = Math.PI;
var M_PI_2 = M_PI / 2;
var M_2_PI = 2 * M_PI;

// Degree to Radian conversion
var degToRad = M_PI / 180;
var radToDeg = 180 / M_PI;

// Internal device orientation + motion variables
var sensors = {
	"orientation": {
		active:    false,
		callbacks: [],
		data:      undefined
	},
	"motion": {
		active:    false,
		callbacks: [],
		data:      undefined
	}
};
var screenActive = false;

// Internal screen orientation variables
var hasScreenOrientationAPI = window.screen && window.screen.orientation && window.screen.orientation.angle !== undefined && window.screen.orientation.angle !== null ? true : false;
var screenOrientationAngle = ( hasScreenOrientationAPI ? window.screen.orientation.angle : ( window.orientation || 0 ) ) * degToRad;

var SCREEN_ROTATION_0        = 0,
    SCREEN_ROTATION_90       = M_PI_2,
    SCREEN_ROTATION_180      = M_PI,
    SCREEN_ROTATION_270      = M_2_PI / 3,
    SCREEN_ROTATION_MINUS_90 = - M_PI_2;
