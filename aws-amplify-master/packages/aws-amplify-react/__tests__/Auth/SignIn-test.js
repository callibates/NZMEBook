

import SignIn from '../../src/Auth/SignIn';
import React from 'react';
import AmplifyTheme from '../../src/AmplifyTheme';
import AuthPiece from '../../src/Auth/AuthPiece';
import { Header, Footer, InputRow, ButtonRow } from '../../src/AmplifyUI';
import { Auth } from 'aws-amplify';

const acceptedStates = [
    'signIn',  
    'signedUp', 
    'signedOut'
];

const deniedStates = [
    'signUp',
    'signedIn', 
    'comfirmSignIn',
    'confirmSignUp',
    'forgotPassword',
    'verifyContact'
];

describe('SignIn', () => {
    describe('normal case', () => {
        test('render correctly with Props signIn, signedOut or signedUp', () => {
            for (var i = 0; i < acceptedStates.length; i += 1){
                const wrapper = shallow(<SignIn/>);
                wrapper.setProps({
                    authState: acceptedStates[i],
                    theme: AmplifyTheme
                });

                expect(wrapper).toMatchSnapshot();
            }
        });

        test('render correctly with hide', () => {
            for (var i = 0; i < acceptedStates.length; i += 1){
                const wrapper = shallow(<SignIn/>);
                wrapper.setProps({
                    authState: acceptedStates[i],
                    theme: AmplifyTheme,
                    hide: [SignIn]
                });

                expect(wrapper).toMatchSnapshot();
            }
        });

        test('when clicking signIn and new password required', async () => {
            const wrapper = shallow(<SignIn/>);
            wrapper.setProps({
                authState: 'signIn',
                theme: AmplifyTheme
            });

            const spyon = jest.spyOn(Auth, 'signIn')
                .mockImplementationOnce((user, password) => {
                    return new Promise((res, rej) => {
                        res({
                            challengeName: 'NEW_PASSWORD_REQUIRED'
                        });
                    });
                });

            const spyon_changeState = jest.spyOn(wrapper.instance(), 'changeState');

            const event_username = {
                target: {
                    name: 'username',
                    value: 'user1'
                }
            }
            const event_password = {
                target: {
                    name: 'password',
                    value: 'abc'
                }
            }

            wrapper.find(InputRow).at(0).simulate('change', event_username);
            wrapper.find(InputRow).at(1).simulate('change', event_password);
            await wrapper.find(ButtonRow).simulate('click');


            expect(spyon.mock.calls.length).toBe(1);
            expect(spyon.mock.calls[0][0]).toBe(event_username.target.value);
            expect(spyon.mock.calls[0][1]).toBe(event_password.target.value);

            expect(spyon_changeState).toBeCalled();
            expect(spyon_changeState.mock.calls[0][0]).toBe('requireNewPassword');

            spyon.mockClear();
            spyon_changeState.mockClear();
        });

        test('when clicking signIn and user session null, need verification of email and phone', async () => {
            const wrapper = shallow(<SignIn/>);
            wrapper.setProps({
                authState: 'signIn',
                theme: AmplifyTheme
            });

            const spyon = jest.spyOn(Auth, 'signIn')
                .mockImplementationOnce((user, password) => {
                    return new Promise((res, rej) => {
                        res({
                            Session: null
                        });
                    });
                });

            const spyon2 = jest.spyOn(Auth, 'userAttributes')
                .mockImplementationOnce(() => {
                    return new Promise((res, rej) => {
                        res([{
                            Name: 'email',
                            Value: 'email_val'
                        }, {
                            Name: 'phone_number',
                            Value: 'phone_number'
                        }]);
                    });
                });

            const spyon_changeState = jest.spyOn(wrapper.instance(), 'changeState');

            const event_username = {
                target: {
                    name: 'username',
                    value: 'user1'
                }
            }
            const event_password = {
                target: {
                    name: 'password',
                    value: 'abc'
                }
            }

            wrapper.find(InputRow).at(0).simulate('change', event_username);
            wrapper.find(InputRow).at(1).simulate('change', event_password);
            await wrapper.find(ButtonRow).simulate('click');

           // expect(spyon_changeState).toBeCalled();

            spyon.mockClear();
            spyon2.mockClear();
            spyon_changeState.mockClear();
        });

        test('when clicking signIn and user session null, dont need verification', async () => {
            const wrapper = shallow(<SignIn/>);
            wrapper.setProps({
                authState: 'signIn',
                theme: AmplifyTheme
            });

            const spyon = jest.spyOn(Auth, 'signIn')
                .mockImplementationOnce((user, password) => {
                    return new Promise((res, rej) => {
                        res({
                            Session: null
                        });
                    });
                });

            const spyon2 = jest.spyOn(Auth, 'userAttributes')
                .mockImplementationOnce(() => {
                    return new Promise((res, rej) => {
                        res([{
                            Name: 'email_verfied',
                            Value: true
                        }, {
                            Name: 'phone_number_verified',
                            Value: true
                        }]);
                    });
                });

            const spyon_changeState = jest.spyOn(wrapper.instance(), 'changeState');

            const event_username = {
                target: {
                    name: 'username',
                    value: 'user1'
                }
            }
            const event_password = {
                target: {
                    name: 'password',
                    value: 'abc'
                }
            }

            wrapper.find(InputRow).at(0).simulate('change', event_username);
            wrapper.find(InputRow).at(1).simulate('change', event_password);
            await wrapper.find(ButtonRow).simulate('click');

           // expect(spyon_changeState).toBeCalled();

            spyon.mockClear();
            spyon2.mockClear();
            spyon_changeState.mockClear();
        });

        test('when clicking signIn and error happend', async () => {
            const wrapper = shallow(<SignIn/>);
            wrapper.setProps({
                authState: 'signIn',
                theme: AmplifyTheme
            });

            const spyon = jest.spyOn(Auth, 'signIn')
                .mockImplementationOnce((user, password) => {
                    return new Promise((res, rej) => {
                        rej('err');
                    });
                });

            const spyon2 = jest.spyOn(wrapper.instance(), 'error');

            const event_username = {
                target: {
                    name: 'username',
                    value: 'user1'
                }
            }
            const event_password = {
                target: {
                    name: 'password',
                    value: 'abc'
                }
            }

            wrapper.find(InputRow).at(0).simulate('change', event_username);
            wrapper.find(InputRow).at(1).simulate('change', event_password);
        
            await wrapper.find(ButtonRow).simulate('click');

            spyon.mockClear();
            spyon2.mockClear();
        });
    });

    describe('null case with other authState', () => {
        test('render corrently', () => {
            const wrapper = shallow(<SignIn/>);
            
            for (var i = 0; i < deniedStates.length; i += 1){
                wrapper.setProps({
                    authState: deniedStates[i],
                    theme: AmplifyTheme
                });

                expect(wrapper).toMatchSnapshot();
            }
        });
        
    });

    describe('sign in test', () => {
        test('UserNotConfirmedException, change state to confirmSignUp', async () => {
            const wrapper = shallow(<SignIn/>);
            const signIn = wrapper.instance();

            const spyon = jest.spyOn(Auth, 'signIn').mockImplementationOnce(() => {
                return Promise.reject({
                    code: 'UserNotConfirmedException'
                });
            });

            const spyon2 = jest.spyOn(signIn, 'changeState');
            await signIn.signIn();

            spyon.mockClear();
            spyon2.mockClear();
        })
    });
})
