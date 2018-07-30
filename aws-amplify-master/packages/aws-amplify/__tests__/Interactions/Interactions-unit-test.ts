jest.mock('aws-sdk/clients/lexruntime', () => {
    const LexRuntime = () => { };

    LexRuntime.prototype.postText = (params, callback) => {
        if (params.inputText === 'done') {
            callback(null, {
                message: 'echo:' + params.inputText,
                dialogState: 'ReadyForFulfillment',
                slots: {
                    m1: 'hi',
                    m2: 'done',
                }
            });
        } else {
            callback(null, { message: 'echo:' + params.inputText, dialogState: 'ElicitSlot' });
        }
    }

    return LexRuntime;
});

import Interactions from '../../src/Interactions/Interactions';
import Auth from '../../src/Auth/Auth';
import { AWSLexProvider, AbstractInteractionsProvider } from '../../src/Interactions/Providers';

class AWSLexProvider2 extends AWSLexProvider {
    getProviderName() { return 'AWSLexProvider2'; }
}

class AWSLexProviderWrong extends AbstractInteractionsProvider {
    private onCompleteResolve: Function;
    private onCompleteReject: Function;

    getProviderName() { return 'AWSLexProviderWrong'; }

    getCategory() { return 'IDontKnow' };

    sendMessage(message: string | Object): Promise<Object> {
        return new Promise(async (res, rej) => {
        });
    }

    async onComplete() {
        return new Promise((res, rej) => {
            this.onCompleteResolve = res;
            this.onCompleteReject = rej;
        });
    }
}

describe('Interactions', () => {
    describe('constructor test', () => {
        test('happy case', () => {
            const interactions = new Interactions({});
        });
    });

    describe('configure test', () => {
        test('happy case', () => {
            const interactions = new Interactions({});

            const options = {
                key: 'value'
            };

            const config = interactions.configure(options);

            expect(config).toEqual({"bots": {}, "key": "value"});
        });

        test('aws-exports configuration and send message to existing bot', async () => {
            const curCredSpyOn = jest.spyOn(Auth.prototype, 'currentCredentials')
                .mockImplementationOnce(() => Promise.resolve({ identityId: '1234' }));

            const awsmobile = {
                'aws_bots': 'enable',
                'aws_bots_config': [{ "name": "BookTripMOBILEHUB", "alias": "$LATEST", "description": "Bot to make reservations for a visit to a city.", "bot-template": "bot-trips", "commands-help": ["Book a car", "Reserve a car", "Make a car reservation", "Book a hotel", "Reserve a room", "I want to make a hotel reservation"], "region": "us-east-1" }],
                'aws_project_name': 'bots',
                'aws_project_region': 'us-east-1',
            }
            const interactions = new Interactions({});

            const config = interactions.configure(awsmobile);

            expect(config).toEqual( {"aws_bots": "enable", "aws_bots_config": [{"alias": "$LATEST", "bot-template": "bot-trips", "commands-help": ["Book a car", "Reserve a car", "Make a car reservation", "Book a hotel", "Reserve a room", "I want to make a hotel reservation"], "description": "Bot to make reservations for a visit to a city.", "name": "BookTripMOBILEHUB", "region": "us-east-1"}], "aws_project_name": "bots", "aws_project_region": "us-east-1", "bots": {"BookTripMOBILEHUB": {"alias": "$LATEST", "bot-template": "bot-trips", "commands-help": ["Book a car", "Reserve a car", "Make a car reservation", "Book a hotel", "Reserve a room", "I want to make a hotel reservation"], "description": "Bot to make reservations for a visit to a city.", "name": "BookTripMOBILEHUB", "region": "us-east-1"}}});

            const response = await interactions.send('BookTripMOBILEHUB', 'hi');

            expect(response).toEqual({ dialogState: "ElicitSlot", message: 'echo:hi' });

        });

        test('aws-exports configuration with two bots and send message to existing bot', async () => {
            const curCredSpyOn = jest.spyOn(Auth.prototype, 'currentCredentials')
                .mockImplementation(() => Promise.resolve({ identityId: '1234' }));

            const awsmobile = {
                'aws_bots': 'enable',
                'aws_bots_config': [
                    { "name": "BookTripMOBILEHUB", "alias": "$LATEST", "description": "Bot to make reservations for a visit to a city.", "bot-template": "bot-trips", "commands-help": ["Book a car", "Reserve a car", "Make a car reservation", "Book a hotel", "Reserve a room", "I want to make a hotel reservation"], "region": "us-east-1" },
                    { "name": "BookTripMOBILEHUB2", "alias": "$LATEST", "description": "Bot to make reservations for a visit to a city.", "bot-template": "bot-trips", "commands-help": ["Book a car", "Reserve a car", "Make a car reservation", "Book a hotel", "Reserve a room", "I want to make a hotel reservation"], "region": "us-east-1" }
                ],
                'aws_project_name': 'bots',
                'aws_project_region': 'us-east-1',
            }
            const interactions = new Interactions({});

            const config = interactions.configure(awsmobile);

            expect(config).toEqual( {"aws_bots": "enable", "aws_bots_config": [{"alias": "$LATEST", "bot-template": "bot-trips", "commands-help": ["Book a car", "Reserve a car", "Make a car reservation", "Book a hotel", "Reserve a room", "I want to make a hotel reservation"], "description": "Bot to make reservations for a visit to a city.", "name": "BookTripMOBILEHUB", "region": "us-east-1"}, {"alias": "$LATEST", "bot-template": "bot-trips", "commands-help": ["Book a car", "Reserve a car", "Make a car reservation", "Book a hotel", "Reserve a room", "I want to make a hotel reservation"], "description": "Bot to make reservations for a visit to a city.", "name": "BookTripMOBILEHUB2", "region": "us-east-1"}], "aws_project_name": "bots", "aws_project_region": "us-east-1", "bots": {"BookTripMOBILEHUB": {"alias": "$LATEST", "bot-template": "bot-trips", "commands-help": ["Book a car", "Reserve a car", "Make a car reservation", "Book a hotel", "Reserve a room", "I want to make a hotel reservation"], "description": "Bot to make reservations for a visit to a city.", "name": "BookTripMOBILEHUB", "region": "us-east-1"}, "BookTripMOBILEHUB2": {"alias": "$LATEST", "bot-template": "bot-trips", "commands-help": ["Book a car", "Reserve a car", "Make a car reservation", "Book a hotel", "Reserve a room", "I want to make a hotel reservation"], "description": "Bot to make reservations for a visit to a city.", "name": "BookTripMOBILEHUB2", "region": "us-east-1"}}});

            const response = await interactions.send('BookTripMOBILEHUB', 'hi');

            expect(response).toEqual({ dialogState: "ElicitSlot", message: 'echo:hi' });

            const response2 = await interactions.send('BookTripMOBILEHUB2', 'hi2');

            expect(response2).toEqual({ dialogState: "ElicitSlot", message: 'echo:hi2' });

        });

        test('Interactions configuration with two bots and send message to existing bot and fullfil', async () => {
            const curCredSpyOn = jest.spyOn(Auth.prototype, 'currentCredentials')
                .mockImplementation(() => Promise.resolve({ identityId: '1234' }));
            const configuration = {
                Interactions: {
                    'bots': {
                        "BookTripMOBILEHUB": {
                            "name": "BookTripMOBILEHUB",
                            "alias": "$LATEST",
                            "region": "us-east-1",
                        },
                        "BookTripMOBILEHUB2": {
                            "name": "BookTripMOBILEHUB2",
                            "alias": "$LATEST",
                            "region": "us-east-1",
                        }
                    }
                }
            }

            const interactions = new Interactions({});

            const config = interactions.configure(configuration);

            expect(config).toEqual(configuration.Interactions);
            const response = await interactions.send('BookTripMOBILEHUB', 'hi');

            expect(response).toEqual({ dialogState: "ElicitSlot", message: 'echo:hi' });

            const response2 = await interactions.send('BookTripMOBILEHUB2', 'hi2');

            expect(response2).toEqual({ dialogState: "ElicitSlot", message: 'echo:hi2' });

        });

        describe('Sending messages to bot', () => {
            test('Interactions configuration and send message to existing bot and call onComplete from Interaction.onComplete', async (done) => {
                const curCredSpyOn = jest.spyOn(Auth.prototype, 'currentCredentials')
                .mockImplementation(() => Promise.resolve({ identityId: '1234' }));
                
                const onCompleteCallback = jest.fn((err, confirmation) => { 
                    expect(confirmation).toEqual({ "slots": { "m1": "hi", "m2": "done" } });
                    done(); 
                });

                const configuration = {
                    Interactions: {
                        'bots': {
                            "BookTripMOBILEHUB": {
                                "name": "BookTripMOBILEHUB",
                                "alias": "$LATEST",
                                "region": "us-east-1",
                            }

                        }
                    }
                }

                const interactions = new Interactions({});

                const config = interactions.configure(configuration);

                expect(config).toEqual(configuration.Interactions);
                interactions.onComplete('BookTripMOBILEHUB', onCompleteCallback);
                await interactions.send('BookTripMOBILEHUB', 'hi')
                const response = await interactions.send('BookTripMOBILEHUB', 'done');
                jest.runAllTimers();
                expect(response).toEqual({
                    dialogState: 'ReadyForFulfillment',
                    message: 'echo:done',
                    slots: {
                        m1: 'hi',
                        m2: 'done',
                    }
                });

            });
            test('Interactions configuration and send message to existing bot and call onComplete from configure onComplete', async (done) => {
                const curCredSpyOn = jest.spyOn(Auth.prototype, 'currentCredentials')
                .mockImplementation(() => Promise.resolve({ identityId: '1234' }));
                
                const onCompleteCallback = jest.fn((err, confirmation) => { 
                    expect(confirmation).toEqual({ "slots": { "m1": "hi", "m2": "done" } });
                    done(); 
                });
                    
                const configuration = {
                    Interactions: {
                        'bots': {
                            "BookTripMOBILEHUB": {
                                "name": "BookTripMOBILEHUB",
                                "alias": "$LATEST",
                                "region": "us-east-1",
                                "onComplete": onCompleteCallback
                            }

                        }
                    }
                }

                const interactions = new Interactions({});

                const config = interactions.configure(configuration);

                expect(config).toEqual(configuration.Interactions);

                await interactions.send('BookTripMOBILEHUB', 'hi')
                const response = await interactions.send('BookTripMOBILEHUB', 'done');
                jest.runAllTimers();
                expect(response).toEqual({
                    dialogState: 'ReadyForFulfillment',
                    message: 'echo:done',
                    slots: {
                        m1: 'hi',
                        m2: 'done',
                    }
                });

            });

            test('aws-exports configuration and send message to not existing bot', async () => {
                const awsmobile = {
                    'aws_bots': 'enable',
                    'aws_bots_config': [{ "name": "BookTripMOBILEHUB", "alias": "$LATEST", "description": "Bot to make reservations for a visit to a city.", "bot-template": "bot-trips", "commands-help": ["Book a car", "Reserve a car", "Make a car reservation", "Book a hotel", "Reserve a room", "I want to make a hotel reservation"], "region": "us-east-1" }],
                    'aws_project_name': 'bots',
                    'aws_project_region': 'us-east-1',
                }
                const interactions = new Interactions({});

                const config = interactions.configure(awsmobile);

                expect(config).toEqual({"aws_bots": "enable", "aws_bots_config": [{"alias": "$LATEST", "bot-template": "bot-trips", "commands-help": ["Book a car", "Reserve a car", "Make a car reservation", "Book a hotel", "Reserve a room", "I want to make a hotel reservation"], "description": "Bot to make reservations for a visit to a city.", "name": "BookTripMOBILEHUB", "region": "us-east-1"}], "aws_project_name": "bots", "aws_project_region": "us-east-1", "bots": {"BookTripMOBILEHUB": {"alias": "$LATEST", "bot-template": "bot-trips", "commands-help": ["Book a car", "Reserve a car", "Make a car reservation", "Book a hotel", "Reserve a room", "I want to make a hotel reservation"], "description": "Bot to make reservations for a visit to a city.", "name": "BookTripMOBILEHUB", "region": "us-east-1"}}});

                try {
                    await interactions.send('BookTrip', 'hi');
                } catch (err) {
                    expect(err.message).toEqual('Bot BookTrip does not exist');
                }

            });

            test('aws-exports configuration and try to add onComplete to not existing bot', async () => {
                const awsmobile = {
                    'aws_bots': 'enable',
                    'aws_bots_config': [{ "name": "BookTripMOBILEHUB", "alias": "$LATEST", "description": "Bot to make reservations for a visit to a city.", "bot-template": "bot-trips", "commands-help": ["Book a car", "Reserve a car", "Make a car reservation", "Book a hotel", "Reserve a room", "I want to make a hotel reservation"], "region": "us-east-1" }],
                    'aws_project_name': 'bots',
                    'aws_project_region': 'us-east-1',
                }
                const interactions = new Interactions({});

                const config = interactions.configure(awsmobile);

                expect(config).toEqual({"aws_bots": "enable", "aws_bots_config": [{"alias": "$LATEST", "bot-template": "bot-trips", "commands-help": ["Book a car", "Reserve a car", "Make a car reservation", "Book a hotel", "Reserve a room", "I want to make a hotel reservation"], "description": "Bot to make reservations for a visit to a city.", "name": "BookTripMOBILEHUB", "region": "us-east-1"}], "aws_project_name": "bots", "aws_project_region": "us-east-1", "bots": {"BookTripMOBILEHUB": {"alias": "$LATEST", "bot-template": "bot-trips", "commands-help": ["Book a car", "Reserve a car", "Make a car reservation", "Book a hotel", "Reserve a room", "I want to make a hotel reservation"], "description": "Bot to make reservations for a visit to a city.", "name": "BookTripMOBILEHUB", "region": "us-east-1"}}});

                try {
                    await interactions.onComplete('BookTrip', () => {});
                } catch (err) {
                    expect(err.message).toEqual('Bot BookTrip does not exist');
                }

            });


        });

        describe('Adding pluggins', () => {
            test('Adding AWSLexProvider2 bot not found', async () => {
                const configuration = {
                    Interactions: {
                        'bots': {
                            "BookTripMOBILEHUB": {
                                "name": "BookTripMOBILEHUB",
                                "alias": "$LATEST",
                                "region": "us-east-1",
                                "providerName": "AWSLexProvider2"
                            }
                        }

                    }
                }

                const interactions = new Interactions({});

                const config = interactions.configure(configuration);

                interactions.addPluggable(new AWSLexProvider2());

                try {
                    await interactions.send('BookTrip', 'hi');
                } catch (err) {
                    expect(err.message).toEqual('Bot BookTrip does not exist');
                }
            });

            test('Adding custom pluggin happy path', async () => {
                const configuration = {
                    Interactions: {
                        'bots': {
                            "BookTripMOBILEHUB": {
                                "name": "BookTripMOBILEHUB",
                                "alias": "$LATEST",
                                "region": "us-east-1",
                                "providerName": "AWSLexProvider2"
                            }

                        }
                    }
                }

                const interactions = new Interactions({});
                const config = interactions.configure(configuration);
                expect(config).toEqual({"bots": {"BookTripMOBILEHUB": {"alias": "$LATEST", "name": "BookTripMOBILEHUB", "providerName": "AWSLexProvider2", "region": "us-east-1"}}});
                const pluggin = new AWSLexProvider2({});
                
                interactions.addPluggable(pluggin);
                
                const response = await interactions.send('BookTripMOBILEHUB', 'hi');

                expect(response).toEqual({ dialogState: "ElicitSlot", message: 'echo:hi' });

            });
        });
    });

});