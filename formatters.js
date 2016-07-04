'use strict';

// http://stackoverflow.com/questions/7744912/making-a-javascript-string-sql-friendly
const sqlEscStr = str => String(str).replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, char => {
	switch (char) {
    case "\0":
        return "\\0";
    case "\x08":
        return "\\b";
    case "\x09":
        return "\\t";
    case "\x1a":
        return "\\z";
    case "\n":
        return "\\n";
    case "\r":
        return "\\r";
    case "\"":
    case "'":
    case "\\":
    case "%":
        return "\\" + char;
	}
});

module.exports = {

//------------------------------------------------------------------------------
	sql: (rows, fields, params) => `CREATE TABLE ${params.table} (
\tid INT UNSIGNED NOT NULL AUTO_INCREMENT,
\t${fields.map(field => `${field.replace(/:/g, '__')} VARCHAR(255) DEFAULT '' NOT NULL`).join(',\n\t')}
\tPRIMARY KEY(id)
)

${rows.map(row => `INSERT INTO ${params.table} (${fields.map(field => field.replace(/:/g, '__')).join(', ')})
\tVALUES (${fields.map(field => `'${sqlEscStr(row[field])}'`)});
`).join('\n')}
`,

//------------------------------------------------------------------------------
	cvs: (rows, fields, params) => rows.map(row => fields.map(field => `"${row[field]}"`).join(params.separator)).join('\n')
};
