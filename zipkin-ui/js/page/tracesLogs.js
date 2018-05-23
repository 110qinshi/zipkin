import {component} from 'flightjs';

const TraceLogsPageComponent = component(function TraceLogsPage() {
  /* eslint prefer-arrow-callback: ["error", { "allowNamedFunctions": true }] */
  this.after('initialize', function() {
    console.log('xxx');
  });
});

export default function initializeTrace(traceId, config) {
  TraceLogsPageComponent.attachTo('.content', {config});
}
