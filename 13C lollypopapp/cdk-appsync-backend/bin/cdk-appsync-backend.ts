#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkAppsyncBackendStack } from '../lib/cdk-appsync-backend-stack';

const app = new cdk.App();
new CdkAppsyncBackendStack(app, 'CdkAppsyncBackendStack');
