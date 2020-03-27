const perf = () => {
  return new Promise(resolve => {
    window.onload = function() {
      setTimeout(() => {
        let t = window.performance.timing;
        resolve({
          request: (t.responseEnd - t.responseStart).toFixed(0) / 1000,
          dom: (t.domComplete - t.domInteractive).toFixed(0) / 1000 < 0 ? 0 : (t.domComplete - t.domInteractive).toFixed(0) / 1000,
          firstScreen: (t.responseStart - t.navigationStart).toFixed(0) / 1000,
          domready: (t.domContentLoadedEventEnd - t.navigationStart).toFixed(0) / 1000,
          onload: (t.loadEventEnd - t.navigationStart).toFixed(0) / 1000 < 0 ? 0 : (t.loadEventEnd - t.navigationStart).toFixed(0) / 1000,
        });
      })
    }
  })
}
export default perf;