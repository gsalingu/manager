import angular from 'angular';
import '@ovh-ux/manager-core';
import '@ovh-ux/ng-ovh-cloud-universe-components';
import '@ovh-ux/ng-translate-async-loader';
import '@uirouter/angularjs';
import 'angular-translate';
import 'ovh-api-services';

import component from './kill.component';
import routing from './kill.routing';

const moduleName = 'ovhManagerPciTrainingJobsKill';

angular
  .module(moduleName, [
    'ngOvhCloudUniverseComponents',
    'ngTranslateAsyncLoader',
    'oui',
    'ovh-api-services',
    'ovhManagerCore',
    'pascalprecht.translate',
    'ui.router',
  ])
  .config(routing)
  .component('pciProjectTrainingJobsKillComponent', component)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
