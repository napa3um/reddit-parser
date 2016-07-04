'use strict';

const _ = require('lodash');
const fetch = require('node-fetch');
const config = require('./config');
const formatters = require('./formatters');

const sortRem = field => field.replace(/[+-]/g, '');

fetch(config.url)
.then(res => res.json())
.then(doc => _(doc.data.children.map(row => row.data)).chain())
.then(chain => {
	if(!config.fields.some(field => /:/.test(field)))
		return chain.map(row => _.pick(row, config.fields.map(sortRem)));

	const plainFields = config.fields.filter(field => !/:/.test(field)).map(sortRem);

	chain = chain.groupBy(row => plainFields.map(field => row[field]).join('\0'))
	.map((groupRows, groupKey) => {
		const row = _.pick(groupRows[0], plainFields);

		config.fields.filter(field => /:/.test(field)).map(sortRem)
		.forEach(aggrExpr => {
			const aggrFunct = aggrExpr.replace(/^.*:/, '');
			const aggrField = aggrExpr.replace(/:.*$/, '');

			row[aggrExpr] = groupRows.reduce((accum, row) =>
				aggrFunct === 'sum' ? accum + row[aggrField]
				: aggrFunct === 'count' ? accum + 1
				: aggrFunct === 'min' ? Math.min(accum, row[aggrField])
				: aggrFunct === 'max' ? Math.max(accum, row[aggrField]) : 'BAD_AGGR_FUNCT', 0);
		});

		return row;
	});

	return chain;
})
.then(chain => {
	const sortFields = config.fields.filter(field => /[+-]/.test(field));
	return chain.orderBy(
		sortFields.map(sortRem),
		sortFields.map(field => /-/.test(field) ? 'desc' : 'asc')
	)
	.value();
})
.then(rows => console.log(formatters[config.formatter.name](rows, config.fields.map(sortRem), config.formatter)))
.catch(err => console.log(err));
