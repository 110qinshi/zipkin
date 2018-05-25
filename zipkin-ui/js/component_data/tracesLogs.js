import {component} from 'flightjs';
import $ from 'jquery';
import {getError} from '../../js/component_ui/error';

export default component(function TraceData() {
  this.after('initialize', function() {
    $.ajax(`api/v1/service/status`, {
      type: 'GET',
      dataType: 'json'
    }).done(trace => {
      this.trigger(document, 'traceLogPageModelView', {name: '55'});
      console.log('log traceLogPageModelView'+ trace);
    }).fail(e => {
      this.trigger('uiServerError',
        getError(`Cannot load trace ${this.attr.traceId}`, e));
    });
  });
});
