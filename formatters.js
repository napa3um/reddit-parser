'use strict';

module.exports = {

//------------------------------------------------------------------------------
	sql: (rows, fields, params) => `CREATE TABLE ${params.table} (
\tid INT UNSIGNED NOT NULL AUTO_INCREMENT,
\t${fields.map(field => `${field.replace(/:/g, '__')} VARCHAR(255) DEFAULT '' NOT NULL`).join(',\n\t')}
\tPRIMARY KEY(id)
)

${rows.map(row => `INSERT INTO ${params.table} (${fields.map(field => field.replace(/:/g, '__')).join(', ')})
\tVALUES (${fields.map(field => `'${row[field]}'`)});
`).join('\n')}
`,

//------------------------------------------------------------------------------
	cvs: (rows, fields, params) => rows.map(row => fields.map(field => `"${row[field]}"`).join(params.separator)).join('\n')
};
