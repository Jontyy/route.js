(function(){

	module('routr.js',{

	});

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

}());