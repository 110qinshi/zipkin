import {component} from 'flightjs';
import ServiceFilterSearchUI from '../component_ui/serviceFilterSearch';
import ZoomOut from '../component_ui/zoomOutSpans';
import {traceTemplate} from '../templates';
import $ from 'jquery';
import SpanPanelUI from '../component_ui/spanPanel';
import FilterAllServicesUI from '../component_ui/filterAllServices';
import JsonPanelUI from '../component_ui/jsonPanel';
import TraceUI from '../component_ui/trace';
import FullPageSpinnerUI from '../component_ui/fullPageSpinner';
import FilterLabelUI from '../component_ui/filterLabel';
import {contextRoot} from '../publicPath';
import TraceLogData from '../component_data/tracesLogs';

const TraceLogsPageComponent = component(function TraceLogsPage() {
  this.after('initialize', function() {
    window.document.title = 'Zipkin - Logs';
    TraceLogData.attachTo(document, {});
    this.on(document, 'tracePageModelView', function(ev, data) {
      this.$node.html(traceTemplate({
        contextRoot,
        ...data.modelview
      }));

      FilterAllServicesUI.attachTo('#filterAllServices', {
        totalServices: $('.trace-details.services span').length
      });
      FullPageSpinnerUI.attachTo('#fullPageSpinner');
      JsonPanelUI.attachTo('#jsonPanel');
      ServiceFilterSearchUI.attachTo('#serviceFilterSearch');
      SpanPanelUI.attachTo('#spanPanel');
      TraceUI.attachTo('#trace-container');
      FilterLabelUI.attachTo('.service-filter-label');
      ZoomOut.attachTo('#zoomOutSpans');

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
  });
});

export default function initializeTrace(traceId, config) {
  TraceLogsPageComponent.attachTo('.content', {config});
}
