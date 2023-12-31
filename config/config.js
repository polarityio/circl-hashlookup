module.exports = {
  name: 'CIRCL Hash Lookup',
  acronym: 'HASH',
  description:
    'Integration that can search MD5, SHA1, and SHA256 hashes against the known hashes server hosted by CIRCL',
  entityTypes: ['MD5', 'SHA1', 'SHA256'],
  defaultColor: 'light-gray',
  onDemandOnly: true,
  styles: ['styles/style.less'],
  block: {
    component: {
      file: './components/hash-block.js'
    },
    template: {
      file: './templates/hash-block.hbs'
    }
  },
  logging: {
    level: 'info'
  },
  request: {
    cert: '',
    key: '',
    passphrase: '',
    ca: '',
    proxy: ''
  },
  options: [
    {
      key: 'showMisses',
      name: 'Show Hashes that are Not Found',
      description:
        "If checked, the integration will return a 'Not Found' result for hashes that are not found in the CIRCL hash lookup service",
      default: true,
      type: 'boolean',
      userCanEdit: false,
      adminOnly: true
    }
  ]
};
