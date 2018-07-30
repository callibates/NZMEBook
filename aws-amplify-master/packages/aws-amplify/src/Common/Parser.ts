import { AmplifyConfig } from './types';
import { ConsoleLogger as Logger } from '../Common';

const logger = new Logger('Parser');

export default class Parser {
    static parseMobilehubConfig(config): AmplifyConfig {
        const amplifyConfig: AmplifyConfig = {};
        // Analytics
        if (config['aws_mobile_analytics_app_id']) {
            const Analytics = {
                appId: config['aws_mobile_analytics_app_id'],
                region: config['aws_mobile_analytics_app_region']
            };
            amplifyConfig.Analytics = Analytics;
        }

        // Auth
        if (config['aws_cognito_identity_pool_id']) {
            const Auth = {
                userPoolId: config['aws_user_pools_id'],
                userPoolWebClientId: config['aws_user_pools_web_client_id'],
                region: config['aws_cognito_region'],
                identityPoolId: config['aws_cognito_identity_pool_id'],
                mandatorySignIn: config['aws_mandatory_sign_in'] === 'enable'? true: false
            };
            amplifyConfig.Auth = Auth;
        }

        amplifyConfig.Analytics = Object.assign({}, amplifyConfig.Analytics, config.Analytics);
        amplifyConfig.Auth = Object.assign({}, amplifyConfig.Auth, config.Auth);
        logger.debug('parse config', config, 'to amplifyconfig', amplifyConfig);
        return amplifyConfig;
    }
}
