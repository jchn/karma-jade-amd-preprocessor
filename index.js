var jade = require('jade'),
	toAmdString = require('jade-amd').toAmdString;

var createJadeAmdPreprocessor = function(logger, basePath) {
	var log = logger.create('preprocessor.jade-amd')

	return function(content, file, done) {
		file.path = file.originalPath + '.js';

		var processed = null
		try {
			var compiled = jade.compileClient(content, {debug: false, pretty: false}).toString();

			processed = 'define(\'' + file.originalPath.split('src/').pop() + '\', [], function() {' + ' return ' + compiled + '});';

		} catch(e) {
			logger.error('%s\n  at %s', e.message, file.originalPath);
		}
		done(processed);
	}
}

createJadeAmdPreprocessor.$inject = ['logger', 'config.basePath'];

// publish
module.exports = {
	'preprocessor:jade-amd': ['factory', createJadeAmdPreprocessor]
};
