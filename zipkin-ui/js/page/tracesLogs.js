import {component} from 'flightjs';


const TraceLogsPageComponent = component(function TraceLogsPage() {
  this.after('initialize', function() {

  });
});

export default function initializeTrace(traceId, config) {
  TraceLogsPageComponent.attachTo('.content', {config});
}
