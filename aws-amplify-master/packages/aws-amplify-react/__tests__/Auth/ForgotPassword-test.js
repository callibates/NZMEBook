import ForgotPassword from '../../src/Auth/ForgotPassword';
import React from 'react';
import AmplifyTheme from '../../src/AmplifyTheme';
import AuthPiece from '../../src/Auth/AuthPiece';
import { Header, Footer, InputRow, ButtonRow } from '../../src/AmplifyUI';
import { Auth } from 'aws-amplify';

const acceptedStates = [
    'forgotPassword'
];

const deniedStates = [
    'signIn',  
    'signedUp', 
    'signedOut',
    'signUp',
    'signedIn',
    'confirmSignIn',
    'confirmSignUp',
    'verifyContact'
];

describe('forgotPassword', () => {
    describe('normal case', () => {
        test('render correctly with authState forgotPassword', () => {
            for (var i = 0; i < acceptedStates.length; i += 1){
                const wrapper = shallow(<ForgotPassword/>);
                wrapper.setProps({
                    authState: acceptedStates[i],
                    theme: AmplifyTheme
                });
                expect(wrapper).toMatchSnapshot();
            }
        });

        test('render correctly with state delivery set', () => {
            for (var i = 0; i < acceptedStates.length; i += 1){
                const wrapper = shallow(<ForgotPassword/>);
                wrapper.setProps({
                    authState: acceptedStates[i],
                    theme: AmplifyTheme
                });
                wrapper.setState({delivery: true});

                expect(wrapper).toMatchSnapshot();
            }
        });

        test('hidden if hide include ForgotPassword', () => {
            const wrapper = shallow(<ForgotPassword/>);
            wrapper.setProps({
                authState: acceptedStates[0],
                hide: [ForgotPassword]
            });
            expect(wrapper).toMatchSnapshot();
        });

        test('simulating clicking submit', async () => {
            const spyon = jest.spyOn(Auth, 'forgotPasswordSubmit')
                .mockImplementationOnce(() => {
                    return new Promise((res, rej) => {
                        res('data');
                    });
                });
            const wrapper = shallow(<ForgotPassword/>);
            wrapper.setProps({
                authState: acceptedStates[0],
                theme: AmplifyTheme
            });
            wrapper.setState({delivery: true});

            // const event_username = {
            //     target: {
            //         name: 'username',
            //         value: 'user1'
            //     }
            // }
            const event_code = {
                target: {
                    name: 'code',
                    value: 'code'
                }
            }

            const event_password = {
                target: {
                    name: 'password',
                    value: 'abc'
                }
            }

            wrapper.find(InputRow).at(0).simulate('change', event_code);
            wrapper.find(InputRow).at(1).simulate('change', event_password);

            await wrapper.find(ButtonRow).simulate('click');

            expect(spyon).toBeCalledWith(undefined, 'code', 'abc');

            spyon.mockClear();
        });

        test('simulating clicking send', async () => {
            const spyon = jest.spyOn(Auth, 'forgotPassword')
                .mockImplementationOnce(() => {
                    return new Promise((res, rej) => {
                        res('data');
                    });
                });

            const wrapper = shallow(<ForgotPassword/>);
            wrapper.setProps({
                authState: acceptedStates[0],
                theme: AmplifyTheme
            });
            wrapper.setState({delivery: false});

            const event_username = {
                target: {
                    name: 'username',
                    value: 'user1'
                }
            }

            wrapper.find(InputRow).at(0).simulate('change', event_username);

            await wrapper.find(ButtonRow).simulate('click');

            expect(spyon).toBeCalledWith('user1');

            spyon.mockClear();
        });
    });

    describe('null case with other authState', () => {
        test('render corrently', () => {
            const wrapper = shallow(<ForgotPassword/>);
            
            for (var i = 0; i < deniedStates.length; i += 1){
                wrapper.setProps({
                    authState: deniedStates[i],
                    theme: AmplifyTheme
                });

                expect(wrapper).toMatchSnapshot();
            }
        });
    });
})