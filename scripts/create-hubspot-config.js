#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

const portalId = process.env.HUBSPOT_PORTAL_ID;
const personalAccessKey = process.env.HUBSPOT_PERSONAL_ACCESS_KEY;

const portalConfig = {
  name: 'production',
  portalId,
  authType: 'personalaccesskey',
  personalAccessKey
};

const config = {
  defaultPortal: 'production',
  portals: [portalConfig],
};

fs.writeFileSync(
  path.join(process.cwd(), 'hubspot.config.yml'),
  yaml.dump(config)
);
