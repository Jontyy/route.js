(function(){

	test('It should be a globally available function',1,function(){
		ok(typeof route === 'function','It should be a globally available function');
	});

	test('It should work with a basic path',1,function(){
		var spy = this.spy();
		route('/user/jontyy',spy);
		route('/user/jontyy/');
		ok(spy.calledOnce,'Expected the callback to have been called exactly once');
	});

	test('It should only use a single route',2,function(){
		var s1 = this.spy(),
			s2 = this.spy();

		route('/user/jontyy',s1);
		route('/user',s2);
		route('/user/jontyy/messages');
		ok(s1.calledOnce,'Expected the first route to have been called');
		ok(s2.callCount === 0,'Expected the second route to not have been called');
	});

	test('It should not use incorrect routes',1,function(){
		var spy = this.spy();

		route('/user/jontyy',spy);
		route('/blog/post/12');
		ok(spy.callCount === 0,'Expected the user route to have not been called.');
	});

	test('It should allow arguments with the :arg syntax',2,function(){
		var spy = this.spy();
		route('/user/:user/message/:message',spy);
		route('/user/jontyy/message/15');
		ok(spy.calledOnce,'Expected the route to have been called once');
		ok(spy.calledWith('jontyy','15'),'Expected the arguments to have been passed')
	});

	test('It should allow optional arguments with the (/:arg) syntax',2,function(){
		var spy = this.spy();

		route('/user/:user/messages(/:filter)',spy);
		route('/user/jontyy/messages/unread');

		ok(spy.calledWith('jontyy','unread'),'Expected the optional arguments to have been passed');

		route('user/:user/messages(/:filter)',spy);
		route('/user/jontyy/messages');
		ok(spy.calledTwice,'Expected the callback to have been called if optional arg is missing');

	});

	test('It should have int argument type',3,function(){
		var spy = this.spy();

		route('/user/:int',spy);
		route('/user/jontyy');

		
		route('/user/:int',spy);
		route('/user/2');

		ok(spy.calledOnce,'Should only have been called once');
		ok(spy.neverCalledWith('jontyy'),'Should never have been called with a string');
		ok(spy.calledWith('2'),'Should have been called with 2');
	});

	test('It should have az argument type',3, function(){
		var spy = this.spy();

		route('/user/:az',spy);
		route('/user/jontyy');
		
		route('/user/:az',spy);
		route('/user/2');

		ok(spy.calledOnce,'Should only have been called once');
		ok(spy.neverCalledWith('2'),'Should never have been called with anything other than a-z');
		ok(spy.calledWith('jontyy'),'Should have been called with jontyy');
	});

	test('It should have a default route',1,function(){
		var spy = this.spy();

		route('/user/blah',function(){});
		route('/blah/blah',function(){});
		route(spy);

		route('/this/should/fall/back/to/default');
		ok(spy.calledOnce,'Default should be called if available and no routes matched');
	});
}());