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
import { Analytics } from 'aws-amplify';

export function trackUpdate(Comp, trackerName) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.trackerName = trackerName;
        }

        componentDidUpdate(prevProps, prevState) {
            const attributes = Object.assign({}, this.props, this.state);
            Analytics.record(this.trackerName, attributes);
        }

        render() {
            return <Comp {...this.props} />
        }
    }
}
