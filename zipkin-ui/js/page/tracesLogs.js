// eslint-disable no-nested-ternary
import {component} from 'flightjs';
import {tracesLogsTemplate} from '../templates';
import $ from 'jquery';
import {contextRoot} from '../publicPath';
import TraceLogData from '../component_data/tracesLogs';

const TraceLogsPageComponent = component(function TraceLogsPage() {
  this.after('initialize', function() {
    window.document.title = 'Zipkin - Logs';

    this.on(document, 'traceLogPageModelView', function(ev, data) {
      console.log('traceLogPageModelView execute' + data);
      this.$node.html(tracesLogsTemplate({
        contextRoot,
        ...data.modelview
      }));

      this.$node.find('#traceJsonLink').click(e => {
        e.preventDefault();
        this.trigger('uiRequestJsonPanel', {
          title: `Trace ${this.attr.traceId}`,
          obj: data.trace,
          link: `${contextRoot}api/v1/trace/${this.attr.traceId}`
        });
      });

      $('.annotation:not(.core)').tooltip({placement: 'left'});
    });
    TraceLogData.attachTo(document, {});
  });
});

export default function initializeTrace(traceId, config) {
  TraceLogsPageComponent.attachTo('.content', {config});
}
