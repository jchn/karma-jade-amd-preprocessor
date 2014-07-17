var jadeAmd = require('jade-amd');
var logger = require('log4js').getLogger();

var JadeAmd = function(content, file, basePath, done) {

	file.path = file.originalPath + '.jade.js';

	var processed = null
	try {
		processed = jadeAmd.compile(content)({});
	} catch(e) {
		logger.error('%s\n  at %s', e.message, file.originalPath);
	}

	done(processed);

}

// publish
module.eports = JadeAmd
