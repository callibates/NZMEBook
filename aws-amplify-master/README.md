<img src="https://s3.amazonaws.com/aws-mobile-hub-images/aws-amplify-logo.png" alt="AWS Amplify" width="550" >

<a href="https://nodei.co/npm/aws-amplify/">
  <img src="https://nodei.co/npm/aws-amplify.svg?downloads=true&downloadRank=true&stars=true">
</a>
<p>
  <a href="https://gitter.im/AWS-Amplify/Lobby?utm_source=share-link&utm_medium=link&utm_campaign=share-link" target="_blank">
    <img src="https://badges.gitter.im/aws/aws-amplify.png" alt="Gitter Chat" />  
  </a>
  <a href="https://badge.fury.io/js/aws-amplify">
    <img src="https://badge.fury.io/js/aws-amplify.svg" alt="npm version" height="18">
  </a>
  <a href="https://npmjs.org/aws-amplify">
    <img src="https://img.shields.io/npm/dm/aws-amplify.svg" alt="npm downloads" height="18">
  </a>
  <a href="https://codecov.io/gh/aws/aws-amplify">
    <img src="https://codecov.io/gh/aws/aws-amplify/branch/master/graph/badge.svg" />
  </a>
  <a href="https://circleci.com/gh/aws/aws-amplify">
    <img src="https://circleci.com/gh/aws/aws-amplify.svg?style=svg" alt="build:started">
  </a>
</p>

### AWS Amplify is a JavaScript library for frontend and mobile developers building cloud-enabled applications. 

AWS Amplify provides a declarative and easy-to-use interface across different categories of cloud operations. AWS Amplify goes well with any JavaScript based frontend workflow, and React Native for mobile developers. 

Our default implementation works with Amazon Web Services (AWS), but AWS Amplify is designed to be open and pluggable for any custom backend or service.

### Features / APIs

- [__Authentication__](https://aws.github.io/aws-amplify/media/authentication_guide): APIs and building blocks for developers who want to create user authentication experiences.  
- [__Analytics__](https://aws.github.io/aws-amplify/media/analytics_guide): Easily collect analytics data for you app. Analytics data includes user sessions and other custom events that you want to track in your app.  
- [__API__](https://aws.github.io/aws-amplify/media/api_guide): Provides a simple solution when making HTTP requests. It provides an automatic, lightweight signing process which complies with AWS Signature Version 4.
- [__GraphQL Client__](https://aws.github.io/aws-amplify/media/api_guide#configuration-for-graphql-server): Interact with your GraphQL server or AWS AppSync API with an easy to use & configure GraphQL client.  
- [__Storage__](https://aws.github.io/aws-amplify/media/storage_guide): Provides a simple mechanism for managing user content for your app in public, protected or private storage buckets.  
- [__Push Notifications__](https://aws.github.io/aws-amplify/media/push_notifications_setup): Allows you to integrate push notifications in your app with Amazon Pinpoint targeting and campaign management support.
- [__Interactions__](https://aws.github.io/aws-amplify/media/interactions_guide): Create conversational bots powered by deep learning technologies..  
- [__PubSub__](https://aws.github.io/aws-amplify/media/pub_sub_guide): Provides connectivity with cloud-based message-oriented middleware.  
- [__Internationalization__](https://aws.github.io/aws-amplify/media/i18n_guide): A lightweight internationalization solution.
- [__Cache__](https://aws.github.io/aws-amplify/media/cache_guide): Provides a generic LRU cache for JavaScript developers to store data with priority and expiration settings.  

#### Visit our [Web Site](https://aws.github.io/aws-amplify) to learn more about AWS Amplify.

* [Documentation](https://aws.github.io/aws-amplify)
* [Installation](#installation)
* [Configuration](#configuration)
* [Examples](#examples)
* [Contributing](https://github.com/aws/aws-amplify/blob/master/CONTRIBUTING.md)

## Installation

AWS Amplify is available as `aws-amplify` package on [npm](https://www.npmjs.com/)

__Web__

```bash
$ npm install aws-amplify --save
```

__React__

If you are developing a [React](https://github.com/facebook/react/) app, you can install an additional package `aws-amplify-react` containing [Higher Order Components](https://reactjs.org/docs/higher-order-components.html):

```bash
$ npm install aws-amplify --save
$ npm install aws-amplify-react --save
```

__Angular__

If you are developing an [Angular](https://github.com/angular/angular) app, you can install an additional package `aws-amplify-angular`. This package contains an [Angular module](https://docs.angularjs.org/api/ng/function/angular.module) with a [provider and components](https://aws.github.io/aws-amplify/media/angular_guide):

```bash
$ npm install aws-amplify --save
$ npm install aws-amplify-angular --save
```

Visit our [Installation Guide for Web](https://aws.github.io/aws-amplify/media/install_n_config?platform=javascript) to start building your web app.  

__React Native__

For React Native development, install `aws-amplify` 

```bash
$ npm install aws-amplify --save
```

If you are developing a [React Native](https://github.com/facebook/react-native) app, you can install an additional package `aws-amplify-react-native` containing [Higher Order Components](https://reactjs.org/docs/higher-order-components.html):

```bash
$ npm install aws-amplify-react-native --save
```

Visit our [Installation Guide for React Native](https://aws.github.io/aws-amplify/media/install_n_config?platform=react-native) to start building your web app.  

## Configuration  

Somewhere in your app, preferably at the root level, configure Amplify with your resources.

__Using AWS Resources__

```js
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

```

__Without AWS__

```js
Amplify.configure({
  API: {
    graphql_endpoint: 'https://www.example.com/my-graphql-endpoint'
  }
});
```

## Examples

AWS Amplify supports many category scenarios such as Auth, Analytics, APIs and Storage as outlined in the [Developer Guide](https://aws.github.io/aws-amplify/media/developer_guide). A couple of samples are below:

### 1. Collect user session metrics

By default, AWS Amplify can collect user session tracking data with a few lines of code:

```js
import { Analytics } from 'aws-amplify';

Analytics.record('myCustomEvent');
```

See our [Analytics Developer Guide](https://aws.github.io/aws-amplify/media/analytics_guide) for detailed information. 

### 2. Add Authentication to your App

Add user sign up and sign in using two of the many methods available to the [Auth class](https://aws.github.io/aws-amplify/api/classes/authclass.html):

```js
import { Auth } from 'aws-amplify';

Auth.signUp({
  username: 'AmandaB',
  password: 'MyCoolPassword1!',
  attributes: {
    email: 'someemail@example.com'
  }
});

Auth.signIn(username, password)
  .then(success => console.log('successful sign in!'))
  .catch(err => console.log(err));
```

See our [Authentication Developer Guide](https://aws.github.io/aws-amplify/media/authentication_guide) for detailed information. 

__React__

Adding authentication to your React or React Native app is as easy as wrapping your app's main component with our `withAuthenticator` higher order component. AWS Amplify will provide you customizable UI for common use cases such as user registration and login.

```jsx

import { withAuthenticator } from 'aws-amplify-react-native';

export default withAuthenticator(App);
```

__Angular__

To add authentication to your Angular app you can also use the built-in service provider and components:

```js
// app.component.ts
import { AmplifyService }  from 'aws-amplify-angular';

...

constructor( public amplify:AmplifyService ) {
  // handle auth state changes
  this.amplify.authStateChange$
    .subscribe(authState => {
      this.authenticated = authState.state === 'signedIn';
      if (!authState.user) {
        this.user = null;
      } else {
        this.user = authState.user;
      }
  });
}

// app.component.html
<amplify-authenticator></amplify-authenticator>

```

See our [Angular Guide](https://aws.github.io/aws-amplify/media/angular_guide) for more details on Angular setup and usage.

### 3. Sign HTTP requests

AWS Amplify automatically signs your REST requests with [AWS Signature Version 4](http://docs.aws.amazon.com/general/latest/gr/signature-version-4.html) when using the API module :

```js
let apiName = 'MyApiName';
let path = '/path'; 
let options = {
  headers: {...} // OPTIONAL
}
API.get(apiName, path, options).then(response => {
  // Add your code here
});
```

See our [API Developer Guide](https://aws.github.io/aws-amplify/media/api_guide) for detailed information. 

### 4. GraphQL API Operations  

To access a GraphQL API with your app, you need to make sure to configure the endpoint URL in your app’s configuration.

```js
// Configure a custom GraphQL endpoint
Amplify.configure({
  API: {
    graphql_endpoint: 'https://www.example.com/my-graphql-endpoint'
  }
});


// Or configure an AWS AppSync endpoint.
let myAppConfig = {
  // ...
  'aws_appsync_graphqlEndpoint': 'https://xxxxxx.appsync-api.us-east-1.amazonaws.com/graphql',
  'aws_appsync_region': 'us-east-1',
  'aws_appsync_authenticationType': 'API_KEY',
  'aws_appsync_apiKey': 'da2-xxxxxxxxxxxxxxxxxxxxxxxxxx',
  // ...
}

Amplify.configure(myAppConfig);
```

__queries__

```js
import { API, graphqlOperation } from "aws-amplify";

const ListEvents = `query ListEvents {
  listEvents {
    items {
      id
      where
      description
    }
  }
}`;

const allEvents = await API.graphql(graphqlOperation(ListEvents));
```

__mutations__

```js
import { API, graphqlOperation } from "aws-amplify";

const CreateEvent = `mutation CreateEvent($name: String!, $when: String!, $where: String!, $description: String!) {
  createEvent(name: $name, when: $when, where: $where, description: $description) {
    id
    name
    where
    when
    description
  }
}`;

const eventDetails = {
  name: 'Party tonight!',
  when: '8:00pm',
  where: 'Ballroom',
  decription: 'Coming together as a team!'
};

const newEvent = await API.graphql(graphqlOperation(CreateEvent, eventDetails));
```

__subscriptions__

```js
import { API, graphqlOperation } from "aws-amplify";

const SubscribeToEventComments = `subscription subscribeToComments {
  subscribeToComments {
    commentId
    content
  }
}`;

const subscription = API.graphql(
  graphqlOperation(SubscribeToEventComments)
).subscribe({
  next: (eventData) => console.log(eventData)
});
```

See our [GraphQL API Developer Guide](https://aws.github.io/aws-amplify/media/api_guide#configuration-for-graphql-server) for detailed information.

### 5. Upload and Download public or private content

AWS Amplify provides an easy-to-use API to store and get content from public or private storage folders:  

```js
Storage.put(key, fileObj, {level: 'private'})
  .then (result => console.log(result))
  .catch(err => console.log(err));
      
  // Stores data with specifying its MIME type
Storage.put(key, fileObj, {
  level: 'private',
  contentType: 'text/plain'
})
.then (result => console.log(result))
.catch(err => console.log(err));
```

See our [Storage Developer Guide](https://aws.github.io/aws-amplify/media/storage_guide) for detailed information. 
