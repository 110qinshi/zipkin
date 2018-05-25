import {component} from 'flightjs';
import $ from 'jquery';
import {getError} from '../../js/component_ui/error';

export default component(function TraceData() {
  this.after('initialize', function() {
    $.ajax('api/v1/service/status', {
      type: 'GET',
      dataType: 'json'
    }).done(trace => {
      this.trigger(document, 'traceLogPageModelView', {name: trace});
      console.log('log traceLogPageModelView');
    }).fail(e => {
      this.trigger('uiServerError',
        getError('Cannot load trace', e));
    });
  });
});
