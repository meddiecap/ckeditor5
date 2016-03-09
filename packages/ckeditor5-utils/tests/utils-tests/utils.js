/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import testUtils from '/tests/_utils/utils.js';
import moduleTestUtils from '/tests/_utils/module.js';
import utilsTestUtils from '/tests/utils/_utils/utils.js';
import Model from '/ckeditor5/utils/ui/model.js';
import Creator from '/ckeditor5/utils/creator.js';
import EmitterMixin from '/ckeditor5/utils/emittermixin.js';

let createFn3 = () => {};
let destroyFn3 = () => {};

testUtils.createSinonSandbox();

utilsTestUtils.defineEditorCreatorMock( 'test1' );
utilsTestUtils.defineEditorCreatorMock( 'test2', {
	foo: 1,
	bar: 2
} );
utilsTestUtils.defineEditorCreatorMock( 'test3', {
	create: createFn3,
	destroy: destroyFn3
} );

const modules = moduleTestUtils.require( {
	testCreator1: 'creator-test1/creator-test1',
	testCreator2: 'creator-test2/creator-test2',
	testCreator3: 'creator-test3/creator-test3'
} );

///////////////////

let TestCreator1, TestCreator2, TestCreator3;

before( () => {
	TestCreator1 = modules.testCreator1;
	TestCreator2 = modules.testCreator2;
	TestCreator3 = modules.testCreator3;
} );

describe( 'utilsTestUtils.defineEditorCreatorMock()', () => {
	it( 'should register all creators', () => {
		expect( TestCreator1.prototype ).to.be.instanceof( Creator );
		expect( TestCreator2.prototype ).to.be.instanceof( Creator );
		expect( TestCreator3.prototype ).to.be.instanceof( Creator );
	} );

	it( 'should copy properties from the second argument', () => {
		expect( TestCreator2.prototype ).to.have.property( 'foo', 1 );
		expect( TestCreator2.prototype ).to.have.property( 'bar', 2 );

		expect( TestCreator3.prototype ).to.have.property( 'create', createFn3 );
		expect( TestCreator3.prototype ).to.have.property( 'destroy', destroyFn3 );
	} );
} );

describe( 'utilsTestUtils.getIteratorCount()', () => {
	it( 'should returns number of editable items', () => {
		const count = utilsTestUtils.getIteratorCount( [ 1, 2, 3, 4, 5 ] );
		expect( count ).to.equal( 5 );
	} );
} );

describe( 'utilsTestUtils.createObserver()', () => {
	let observable, observable2, observer;

	beforeEach( () => {
		observer = utilsTestUtils.createObserver();
		observable = new Model( { foo: 0, bar: 0 } );
		observable2 = new Model( { foo: 0, bar: 0 } );
	} );

	it( 'should create an observer', () => {
		function Emitter() {}
		Emitter.prototype = EmitterMixin;

		expect( observer  ).to.be.instanceof( Emitter );
		expect( observer.observe ).is.a( 'function' );
		expect( observer.stopListening ).is.a( 'function' );
	} );

	describe( 'Observer', () => {
		/* global console:false  */

		it( 'logs changes in the observable', () => {
			const spy = testUtils.sinon.stub( console, 'log' );

			observer.observe( 'Some observable', observable );
			observer.observe( 'Some observable 2', observable2 );

			observable.foo = 1;
			expect( spy.callCount ).to.equal( 1 );

			observable.foo = 2;
			observable2.bar = 3;
			expect( spy.callCount ).to.equal( 3 );
		} );

		it( 'stops listening when asked to do so', () => {
			const spy = testUtils.sinon.stub( console, 'log' );

			observer.observe( 'Some observable', observable );

			observable.foo = 1;
			expect( spy.callCount ).to.equal( 1 );

			observer.stopListening();

			observable.foo = 2;
			expect( spy.callCount ).to.equal( 1 );
		} );
	} );
} );
