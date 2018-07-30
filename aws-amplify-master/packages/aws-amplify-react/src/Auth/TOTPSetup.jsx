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

import React, { Component } from 'react';
import { Auth, I18n, Logger, JS } from 'aws-amplify';

import AuthPiece from './AuthPiece';
import AmplifyTheme from '../AmplifyTheme';
import {
    FormSection,
    SectionHeader,
    SectionBody,
    SectionFooter,
    InputRow,
    ButtonRow,
    Link
} from '../AmplifyUI';

import QRCode from 'qrcode.react';
import { TOTPSetupComp } from '../Widget';

const logger = new Logger('TOTPSetup');

export default class TOTPSetup extends AuthPiece {
    constructor(props) {
        super(props);

        this._validAuthStates = ['TOTPSetup'];
        this.onTOTPEvent = this.onTOTPEvent.bind(this);
        this.checkContact = this.checkContact.bind(this);
    }

    checkContact(user) {
        Auth.verifiedContact(user)
            .then(data => {
                if (!JS.isEmpty(data.verified)) {
                    this.changeState('signedIn', user);
                } else {
                    user = Object.assign(user, data);
                    this.changeState('verifyContact', user);
                }
            });
    }

    onTOTPEvent(event, data, user) {
        logger.debug('on totp event', event, data);
        //const user = this.props.authData;
        if (event === 'Setup TOTP') {
            if (data === 'SUCCESS') {
                this.checkContact(user);
            }
        }
    }

    showComponent(theme) {
        const { hide } = this.props;
        if (hide && hide.includes(TOTPSetup)) { return null; }

        return (
            <TOTPSetupComp {...this.props} onTOTPEvent={this.onTOTPEvent} />
        )
    }
}
