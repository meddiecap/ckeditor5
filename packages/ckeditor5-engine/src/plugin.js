/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

/**
 * The base class for CKEditor plugin classes.
 *
 * @class Plugin
 */

export default class Plugin {
	constructor( editor ) {
		/**
		 * @readonly
		 * @property {core/Editor}
		 */
		this.editor = editor;
	}

	/**
	 * @returns {null/Promise}
	 */
	init() {}
}

