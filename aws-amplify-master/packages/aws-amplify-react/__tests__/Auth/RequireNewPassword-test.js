import React, { Component } from 'react';
import { ButtonRow, Link } from '../../src/AmplifyUI';
import RequireNewPassword from '../../src/Auth/RequireNewPassword';
import { Auth } from 'aws-amplify';

describe('RequireNewPassword test', () => {
    describe('render test', () => {
        test('render correctly', () => {
            const wrapper = shallow(<RequireNewPassword/>);

            wrapper.setProps({
                authState: 'requireNewPassword',
                hide: false
            });

            expect(wrapper).toMatchSnapshot();
        });

        test('render nothing with incorrect authState', () => {
            const wrapper = shallow(<RequireNewPassword/>);

            wrapper.setProps({
                authState: 'signIn',
                hide: false
            });

            expect(wrapper).toMatchSnapshot();
        });

        test('render nothing with hide', () => {
            const wrapper = shallow(<RequireNewPassword/>);

            wrapper.setProps({
                authState: 'requireNewPassword',
                hide: [RequireNewPassword]
            });

            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('interaction test', () => {
        test('ButtonRow clicked', () => {
            const spyon = jest.spyOn(RequireNewPassword.prototype, 'change').mockImplementationOnce(() => {return;});

            const wrapper = shallow(<RequireNewPassword/>);

            wrapper.setProps({
                authState: 'requireNewPassword',
                hide: false
            });

            wrapper.find(ButtonRow).simulate('click');

            expect(spyon).toBeCalled();
            
            spyon.mockClear();
        });

        test('Link clicked', () => {
            const spyon = jest.spyOn(RequireNewPassword.prototype, 'changeState').mockImplementationOnce(() => {return;});

            const wrapper = shallow(<RequireNewPassword/>);

            wrapper.setProps({
                authState: 'requireNewPassword',
                hide: false
            });

            wrapper.find(Link).simulate('click');

            expect(spyon).toBeCalled();

            spyon.mockClear();
        });
    });

    describe('change test', () => {
        test('happy case', async () => {
            const props = {
                authData: {
                    challengeParam: {
                        requiredAttributes: 'requiredAttributes'
                    } 
                }
            }

            const spyon = jest.spyOn(Auth, 'completeNewPassword').mockImplementationOnce(() => {
                return new Promise((res, rej) => {
                    res('user');
                });
            });
            const spyon2 = jest.spyOn(RequireNewPassword.prototype, 'checkContact').mockImplementationOnce(() => { return; });

            const wrapper = shallow(<RequireNewPassword/>);
            const requireNewPassword = wrapper.instance();

            wrapper.setProps(props);
            requireNewPassword.inputs = {
                password: 'password'
            }

            await requireNewPassword.change();

            expect(spyon).toBeCalledWith({"challengeParam": {"requiredAttributes": "requiredAttributes"}}, 
                                        'password', 
                                        'requiredAttributes');

            expect(spyon2).toBeCalledWith('user');
            spyon.mockClear();
        });

        test('confirm sign in case', async () => {
            const props = {
                authData: {
                    challengeParam: {
                        requiredAttributes: 'requiredAttributes'
                    } 
                }
            }

            const spyon = jest.spyOn(Auth, 'completeNewPassword').mockImplementationOnce(() => {
                return new Promise((res, rej) => {
                    res({
                        challengeName: 'SMS_MFA'
                    });
                });
            });
            const spyon2 = jest.spyOn(RequireNewPassword.prototype, 'changeState').mockImplementationOnce(() => { return; });

            const wrapper = shallow(<RequireNewPassword/>);
            const requireNewPassword = wrapper.instance();

            wrapper.setProps(props);
            requireNewPassword.inputs = {
                password: 'password'
            }

            await requireNewPassword.change();

            expect(spyon).toBeCalledWith({"challengeParam": {"requiredAttributes": "requiredAttributes"}}, 
                                        'password', 
                                        'requiredAttributes');

            expect(spyon2).toBeCalledWith('confirmSignIn', { challengeName: 'SMS_MFA' });
            spyon.mockClear();
        });

        test('totp setup case', async () => {
            const props = {
                authData: {
                    challengeParam: {
                        requiredAttributes: 'requiredAttributes'
                    } 
                }
            }

            const spyon = jest.spyOn(Auth, 'completeNewPassword').mockImplementationOnce(() => {
                return new Promise((res, rej) => {
                    res({
                        challengeName: 'MFA_SETUP'
                    });
                });
            });
            const spyon2 = jest.spyOn(RequireNewPassword.prototype, 'changeState').mockImplementationOnce(() => { return; });

            const wrapper = shallow(<RequireNewPassword/>);
            const requireNewPassword = wrapper.instance();

            wrapper.setProps(props);
            requireNewPassword.inputs = {
                password: 'password'
            }

            await requireNewPassword.change();

            expect(spyon).toBeCalledWith({"challengeParam": {"requiredAttributes": "requiredAttributes"}}, 
                                        'password', 
                                        'requiredAttributes');

            expect(spyon2).toBeCalledWith('TOTPSetup', { challengeName: 'MFA_SETUP' });
            spyon.mockClear();
        });

        test('error happened with Auth completeNewPasword', async () => {
            const props = {
                authData: {
                    challengeParam: {
                        requiredAttributes: 'requiredAttributes'
                    } 
                }
            }

            const spyon = jest.spyOn(Auth, 'completeNewPassword').mockImplementationOnce(() => {
                return new Promise((res, rej) => {
                    rej('err');
                });
            });
            const spyon2 = jest.spyOn(RequireNewPassword.prototype, 'error').mockImplementationOnce(() => { return; });

            const wrapper = shallow(<RequireNewPassword/>);
            const requireNewPassword = wrapper.instance();

            wrapper.setProps(props);
            requireNewPassword.inputs = {
                password: 'password'
            }

            await requireNewPassword.change();

            spyon.mockClear();
            spyon2.mockClear();
        });
    });

    describe('checkContact test', () => {
        test('contact verified', async () => {
            const wrapper = shallow(<RequireNewPassword/>);
            const rnp = wrapper.instance();

            const spyon = jest.spyOn(Auth, 'verifiedContact').mockImplementationOnce(() => {
                return Promise.resolve({
                    verified: {
                        email: 'xxx@xxx.com'
                    }
                })
            });

            const spyon2 = jest.spyOn(rnp, 'changeState');

            await rnp.checkContact({
                user: 'user'
            });
            
            expect(spyon2).toBeCalledWith('signedIn', {user: 'user'});

            spyon.mockClear();
            spyon2.mockClear();
        });

        test('contact not verified', async () => {
            const wrapper = shallow(<RequireNewPassword/>);
            const rnp = wrapper.instance();

            const spyon = jest.spyOn(Auth, 'verifiedContact').mockImplementationOnce(() => {
                return Promise.resolve({
                    verified: {}
                })
            });

            const spyon2 = jest.spyOn(rnp, 'changeState');

            await rnp.checkContact({
                user: 'user'
            });
            
            expect(spyon2).toBeCalledWith('verifyContact', {user: 'user', 'verified': {}});

            spyon.mockClear();
            spyon2.mockClear();
        });
    });
});

