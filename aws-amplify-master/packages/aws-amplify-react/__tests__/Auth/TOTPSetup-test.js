import TOTPSetup from '../../src/Auth/TOTPSetup';
import React from 'react';
import AmplifyTheme from '../../src/AmplifyTheme';
import AuthPiece from '../../src/Auth/AuthPiece';
import { Header, Footer, InputRow, ButtonRow, Link } from '../../src/AmplifyUI';
import { Auth } from 'aws-amplify';

const acceptedStates = [
    'TOTPSetup'
];

const deniedStates = [
    'signIn',  
    'signedUp', 
    'signedOut',
    'signUp',
    'signedIn',
    'confirmSignUp',
    'forgotPassword',
    'verifyContact'
];

describe('TOTPSetup', () => {
    describe('render test', () => {
        test('render correctly', () => {
            const wrapper = shallow(<TOTPSetup/>);
            for (var i = 0; i < acceptedStates.length; i += 1){
                wrapper.setProps({
                    authState: acceptedStates[i],
                    theme: AmplifyTheme
                });
                expect(wrapper).toMatchSnapshot();
            }
        });

        test('render hidden', () => {
            const wrapper = shallow(<TOTPSetup/>);
            
            for (var i = 0; i < deniedStates.length; i += 1){
                wrapper.setProps({
                    authState: deniedStates[i],
                    theme: AmplifyTheme
                });

                expect(wrapper).toMatchSnapshot();
            }
        });

        test('hide props', () => {
            const wrapper = shallow(<TOTPSetup hide={[TOTPSetup]}/>);
            
            for (var i = 0; i < acceptedStates.length; i += 1){
                wrapper.setProps({
                    authState: acceptedStates[i],
                    theme: AmplifyTheme
                });
                expect(wrapper).toMatchSnapshot();
            }
        });
    });

    describe('onTOTPEvent test', () => {
        test('happy case', () => {
            const wrapper = shallow(<TOTPSetup/>);
            const TOTPSetupInstance = wrapper.instance();

            const spyon = jest.spyOn(TOTPSetupInstance, 'checkContact');
            TOTPSetupInstance.onTOTPEvent('Setup TOTP', 'SUCCESS', 'user');

            expect(spyon).toBeCalledWith('user');
            spyon.mockClear();
        });

        test('setup totp fail', () => {
            const wrapper = shallow(<TOTPSetup/>);
            const TOTPSetupInstance = wrapper.instance();

            const spyon = jest.spyOn(TOTPSetupInstance, 'changeState');
            TOTPSetupInstance.onTOTPEvent('Setup TOTP', 'FAIL', 'user');

            expect(spyon).not.toBeCalled();
            spyon.mockClear();
        });
    });

    describe('checkContact test', () => {
        test('contact verified', async () => {
            const wrapper = shallow(<TOTPSetup/>);
            const totpSetup = wrapper.instance();

            const spyon = jest.spyOn(Auth, 'verifiedContact').mockImplementationOnce(() => {
                return Promise.resolve({
                    verified: {
                        email: 'xxx@xxx.com'
                    }
                })
            });

            const spyon2 = jest.spyOn(totpSetup, 'changeState');

            await totpSetup.checkContact({
                user: 'user'
            });
            
            expect(spyon2).toBeCalledWith('signedIn', {user: 'user'});

            spyon.mockClear();
            spyon2.mockClear();
        });

        test('contact not verified', async () => {
            const wrapper = shallow(<TOTPSetup/>);
            const totpSetup = wrapper.instance();

            const spyon = jest.spyOn(Auth, 'verifiedContact').mockImplementationOnce(() => {
                return Promise.resolve({
                    verified: {}
                })
            });

            const spyon2 = jest.spyOn(totpSetup, 'changeState');

            await totpSetup.checkContact({
                user: 'user'
            });
            
            expect(spyon2).toBeCalledWith('verifyContact', {user: 'user', 'verified': {}});

            spyon.mockClear();
            spyon2.mockClear();
        });
    });
})