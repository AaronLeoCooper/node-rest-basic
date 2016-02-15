# node-rest-basic
#### _What a catchy title!_

<br />

A basic REST API built with Node and other goodies for my own personal learning and development practice.

Feel free to use any of this code as you see fit, most of this is here for my own learning path of using NodeJS and MongoDB to produce a _hopefully_ standards-based REST API.

Big thanks to **2359 Media** for being so supportive of me spending time getting to grips with these awesome web technologies, and another big thanks to the developers that have produced the incredible frameworks and libraries that I've used in this mini project.

I don't recommend you use any of this code in a production site. But, well, I'm not your mother.

<br />
<br />

## Getting MongdoDB running locally

<br />

**Note:** This will _ONLY_ work for **my personal setup**, yours will almost certainly differ. This is really just here to remind me should I forget how to boot up my local MongoDB & Node testing environment.

My strong advice is don't follow these steps unless you so happen to have your MongoDB installed and set up exact as I do. Which you won't, because I haven't written up any documentation (yet) about setting up a local MongoDB.

<br />

1. In a Terminal window run:
```
mongod --dbpath ~/Personal/mongoData
```

2. In a second Terminal window run:
```
mongo
```
...and then in the same window once the connection is established to the MongoDB instance, run this to connect to the test database:
```
use test_blog_db
```

3. And finally, to run the app locally use:
```
nodemon
```

<br />
<br />

### Oh, and sorry..

<br />

I'm not going to include my \_config.js file, and no, I have no plans to include it in the future either. If you're using this repo, then you'll need to create your own configuration and place it into /models. The config will look something like this dummy data, where you'll need to change the key of 'secretCode' to whatever you wish your app to use where the key is being referenced.

<br />

```
module.exports = {
  'secretCode': 'averysecretcode!',
  'database': 'mongodb://localhost:27017/test_blog_db'
};
```
