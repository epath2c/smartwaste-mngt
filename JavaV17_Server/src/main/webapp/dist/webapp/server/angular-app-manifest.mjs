
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {},
  assets: {
    'index.csr.html': {size: 53084, hash: 'e9ceb3cc2a77b20ce966210e5722a2b1a36dfa9b6804ebbd9dc8750805775919', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1351, hash: '85a3c5fa7faf7b84378b512ba05ef9a7b2228b59e3851428e421876f82536aed', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-XASHUSZZ.css': {size: 328395, hash: '6AkjZCNfXEc', text: () => import('./assets-chunks/styles-XASHUSZZ_css.mjs').then(m => m.default)}
  },
};
