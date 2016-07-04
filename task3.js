'use strict';

const flatData = [
	{id: 1, parentId: 0},
	{id: 2, parentId: 0},
	{id: 3, parentId: 1},
	{id: 4, parentId: 1},
	{id: 5, parentId: 2},
	{id: 6, parentId: 4},
	{id: 7, parentId: 5}
];

const nodeById = {};
flatData.forEach(node => nodeById[node.id] = node);

const rootNode = {};
flatData.forEach(node => {
	const parentNode = nodeById[node.parentId] ? nodeById[node.parentId] : rootNode;
	if(!parentNode.children)
		parentNode.children = [];
	parentNode.children.push(node);
});

console.log(JSON.stringify(rootNode.children, null, 2));
