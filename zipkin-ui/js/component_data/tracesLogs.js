import {component} from 'flightjs';

export function toContextualLogsUrl(logsUrl, traceId) {
  if (logsUrl) {
    return logsUrl.replace('{traceId}', traceId);
  }
  return logsUrl;
}

export default component(function TraceData() {
  this.after('initialize', function() {
    this.trigger('traceLogPageModelView', {});
    console.log('log traceLogPageModelView');
  });
});
