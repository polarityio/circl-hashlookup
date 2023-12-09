/*
 * Copyright (c) 2023, Polarity.io, Inc.
 */

'use strict';

const request = require('postman-request');
const async = require('async');

let Logger;

function startup(logger) {
  Logger = logger;
}

function doLookup(entities, options, cb) {
  const lookupResults = [];
  Logger.trace({ entities }, 'doLookup');

  async.each(
    entities,
    function (entity, next) {
      lookupHash(entity, options, (err, result) => {
        if (!err) {
          // add to our results if there was no error
          lookupResults.push(result);
        }
        // processing complete
        next(err);
      });
    },
    function (err) {
      Logger.trace({ lookupResults }, 'Lookup Results');
      cb(err, lookupResults);
    }
  );
}

function getHashType(entity) {
  if (entity.isMD5) {
    return 'md5';
  } else if (entity.isSHA1) {
    return 'sha1';
  } else if (entity.isSHA256) {
    return 'sha256';
  } else {
    return null;
  }
}

function lookupHash(entity, options, cb) {
  const hashType = getHashType(entity);
  request(
    {
      url: `https://hashlookup.circl.lu/lookup/${hashType}/${entity.value}`,
      json: true
    },
    function (err, response, body) {
      if (err || response.statusCode !== 200) {
        if (response.statusCode == 404) {
          cb(null, {
            entity: entity,
            data: {
              summary: ['Not Found'],
              details: {
                notFound: true
              }
            }
          });
        } else {
          // return either the error object, or the body as an error
          cb(err || body);
        }
      } else {
        // there was no error in making the GET request so process the body here
        cb(null, {
          entity: entity,
          data: {
            summary: getSummaryTags(body),
            details: body
          }
        });
      }
    }
  );
}

function getSummaryTags(body) {
  const tags = [];

  if (typeof body['hashlookup:trust'] !== undefined) {
    tags.push(`Trust Score: ${body['hashlookup:trust']}`);
  }

  if (body.FileName) {
    tags.push(body.FileName);
  }

  if (body.ProductName) {
    tags.push(body.ProductName);
  }

  if (body['snap-name']) {
    tags.push(body['snap-name']);
  }

  return tags;
}

module.exports = {
  startup: startup,
  doLookup: doLookup
};
