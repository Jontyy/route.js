# Route.js

needs docs :)

```javascript
//simple route
route('/dashboard/',function(){});

//arguments
route('/blog/post/:id',function(id){

});

//optional arguments
route('/blog/posts(/:filter)',function(filter){

});

//int argument
route('/product/:int',function(id){});

//a-z argument
route('/user/:az',function(username){});

//alphanumeric type
route('/user/:alnum',function(username){});

route(function(){
   // the default route if nothing else matched
});

route(location.pathname); //any string will start off routing
```