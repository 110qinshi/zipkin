import {component} from 'flightjs';


const TraceLogsPageComponent = component(function TraceLogsPage() {
});

export default function initializeTrace(traceId, config) {
  TraceLogsPageComponent.attachTo('.content', {config});
}
