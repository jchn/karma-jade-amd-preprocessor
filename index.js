var jade = require('jade'),
	toAmdString = require('jame-amd').toAmdString,
	logger = require('log4js').getLogger();

var createJadeAmdPreprocessor = function(logger, basePath) {
	var log = logger.create('preprocessor.jadeAmd')

	return function(content, file, done) {
		file.path = file.originalPath + '.jade.js';

		var processed = null
		try {
			processed = toAmdString(jade.compile(content)({}));
		} catch(e) {
			logger.error('%s\n  at %s', e.message, file.originalPath);
		}

		done(processed);
	}
}

createJadeAmdPreprocessor.$inject = ['logger', 'config.basePath'];

// publish
module.eports = {
	'preprocessor:jadeAmd': ['factory', createJadeAmdPreprocessor]
};
