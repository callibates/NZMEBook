/*
 * Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */

import AuthClass from './Auth';

import { ConsoleLogger as Logger, Credentials, Amplify } from '../Common';

const logger = new Logger('Auth');

let _instance: AuthClass = null;

if (!_instance) {
    logger.debug('Create Auth Instance');
    _instance = new AuthClass(null);
}

const Auth = _instance;
Credentials.setAuthClass(Auth);
Amplify.register(Auth);

export default Auth;
export { AuthClass };
