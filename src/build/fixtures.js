/***
 * Copyright (c) 2016 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the BSD License. See the accompanying LICENSE file for terms.
 */
/* global module, Promise */
import fs from 'fs';
import path from 'path';
import utils from 'utils/node';

/**
 * Factory for the fixtures task.
 * Runs each test fixture generator in generatorsDir in parallel.
 * Each fixtures generator is assumed to export a node style async function.
 *
 * @param {Object} settings - The project settings.
 * @returns {Function} The fixtures task.
 */
export default function fixturesTaskFactory (settings) {
  const generatorsDir = `./${settings.src.tests}/generators`;
  const options = {
    'routes-models.js': {
      output: {
        routes: `${settings.src.tests}/fixtures/routes-response.js`,
        models: `${settings.src.tests}/fixtures/models-response.js`
      }
    }
  }

  return function fixtures () {
    return utils.nodeCall(fs.readdir, generatorsDir)
    .then((generators) => {
      return Promise.all(generators.map((generatorScript) => {
        const generator = path.resolve('.', generatorsDir, generatorScript);
        return utils.nodeCall(
          module.require(generator),
          options[generatorScript].output
        );
      }))
      .catch((error) => {
        throw new Error(`fixtures task failed: ${error}`);
      })
    })
    .catch((error) => {
      throw new Error(`fixtures task failed: ${error}`);
    });
  };
}