import {component} from 'flightjs';
import {tracesLogsTemplate} from '../templates';
import {contextRoot} from "../publicPath";
const TraceLogsPageComponent = component(function TraceLogsPage(){
  this.after('initialize', function() {
    // this.on(document, 'traceLogsPageModelView', function(ev, data) {
    //   this.$node.html(tracesLogsTemplate({
    //     contextRoot,
    //     ...data.modelview
    //   }));
    // });
  });
});

export default function initializeTrace(config) {
  TraceLogsPageComponent.attachTo('.content', {config});
}
