var jadeAmd = require('jade-amd');

var createJadeAmdPreprocessor = function(logger, basePath) {
	var log = logger.create('preprocessor.jade')

	return function(content, file, done) {
		file.path = file.originalPath + '.jade.js';

		var processed = null
		try {
			processed = jadeAmd.compile(content)({});
		} catch(e) {
			log.error('%s\n  at %s', e.message, file.originalPath);
		}

		done(processed);
	}
}

createJadeAmdPreprocessor.$inject = ['logger', 'config.basePath'];

// publish
module.eports = {
	'preprocessor:jadeAmd': ['factory', createJadeAmdPreprocessor]
};
