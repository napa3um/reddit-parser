module.exports = {
	url: 'http://www.reddit.com/r/javascript.json',

	// output fields - [prefix][field_name][postfix]
	// prefix "+" - sort ascending
	// prefix "-" - sort descending
	// postfix ":sum" - aggreagate, sum
	// postfix ":count" - aggreagate, count (may be without field name)
	// postfix ":min" - aggreagate, min
	// postfix ":max" - aggreagate, max
	fields: ['domain', ':count', '-score:sum'],

	// simple formatter, all values is strings
	formatter: {  // name and any other params
		name: 'cvs',
		separator: ', '
	}

	// other simple formatter, all values is strings
	// formatter: {  // name and any other params
	// 	name: 'sql',
	// 	table: 'reddit_pages'
	// }
};
