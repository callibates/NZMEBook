/*
 * Copyright 2017-2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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

import { AbstractInteractionsProvider } from './InteractionsProvider';
import { InteractionsOptions, InteractionsResponse } from '../types';
import { ConsoleLogger as Logger, LexRuntime, AWS } from '../../Common';
import { registerHelper } from 'handlebars';
import Auth from '../../Auth';

const logger = new Logger('AWSLexProvider');

export class AWSLexProvider extends AbstractInteractionsProvider {

    private aws_lex: LexRuntime;
    private _botsCompleteCallback: object;


    constructor(options: InteractionsOptions = {}) {
        super(options);
        this.aws_lex = new LexRuntime({ region: this._config.region });
        this._botsCompleteCallback = {};
    }

    getProviderName() { return 'AWSLexProvider'; }

    sendMessage(botname: string, message: string | Object): Promise<object> {
        return new Promise(async (res, rej) => {
            if (!this._config[botname]) {
                return rej('Bot ' + botname + ' does not exist');
            }
            const credentials = await Auth.currentCredentials();
            if (!credentials) { return rej('No credentials'); }
            AWS.config.update({
                credentials
            });

            this.aws_lex = new LexRuntime({ region: this._config[botname].region, credentials });
            //  TODO: Implement for content
            if (typeof message === 'string') {
                const params = {
                    'botAlias': this._config[botname].alias,
                    'botName': botname,
                    'inputText': message,
                    'userId': credentials.identityId
                };
                logger.debug('postText to lex', message);

                this.aws_lex.postText(params, (err, data) => {
                    if (err) {
                        rej(err);
                        return;

                    } else {
                        // Check if state is fulfilled to resolve onFullfilment promise
                        logger.debug('postText state', data.dialogState);
                        if (data.dialogState === 'ReadyForFulfillment' || data.dialogState === 'Fulfilled') {
                            if (typeof this._botsCompleteCallback[botname] === 'function') {
                                setTimeout(() => this._botsCompleteCallback[botname](null, { slots: data.slots }), 0);
                            }
                            
                            if (this._config && typeof this._config[botname].onComplete === 'function') {
                                setTimeout(() => this._config[botname].onComplete(null, { slots: data.slots }), 0);
                            }
                        }
                        
                        res(data);
                        if (data.dialogState === 'Failed') {

                            if (typeof this._botsCompleteCallback[botname] === 'function') {
                                setTimeout(
                                    () => this._botsCompleteCallback[botname]('Bot conversation failed'), 0);
                            }

                            if (this._config && typeof this._config[botname].onComplete === 'function') {
                                setTimeout(() => this._config[botname].onComplete('Bot conversation failed'), 0);
                            }
                        }

                    }
                });
            } else {
                rej("Not implemented yet");
            }
        });
    }

    onComplete(botname: string, callback) {
        if (!this._config[botname]) {
            throw new ErrorEvent('Bot ' + botname + ' does not exist');
        }
        this._botsCompleteCallback[botname] = callback;
    }
}

