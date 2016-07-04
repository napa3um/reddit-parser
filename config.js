module.exports = {
	url: 'http://www.reddit.com/r/javascript.json',
	fields: ['domain', ':count', '-score:sum'],

	formatter: {  // name and any other params
		name: 'cvs',
		separator: ', '
	}

	// formatter: {  // name and any other params
	// 	name: 'sql',
	// 	table: 'reddit_pages'
	// }
};
