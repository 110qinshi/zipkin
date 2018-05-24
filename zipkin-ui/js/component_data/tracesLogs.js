import {component} from 'flightjs';

export default component(function TraceData() {
  this.after('initialize', function() {
    this.trigger(document, 'traceLogPageModelView', {name: '55'});
    console.log('log traceLogPageModelView');
  });
});
