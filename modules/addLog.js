const process = require('process');
const { Axiom } = require('@axiomhq/js');

async function addLog(msg) {
  if (process.env.AXIOM_TOKEN) {
    const axiom = new Axiom({token: process.env.AXIOM_TOKEN})
    const time = new Date().toLocaleString();
    const logStr = `${time} | ${msg}`;
    await axiom.ingestRaw('quack-quack', logStr, ContentType.JSON, ContentEncoding.Identity);
  }
}

module.exports = addLog;
