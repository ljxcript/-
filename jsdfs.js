class Node{
	constructor(value, children) {
		this.value = value;
        if (typeof children === "undefined") this.children = false;
		else 
		this.children = (Array.isArray(children) ? children : [children]);
	}
	appendChild(child) {

		if (!this.children) {
			if (Array.isArray(child)) {
				this.children = child;
			} else {
				this.children = [child];
            }
		} else {
			if (Array.isArray(child)) {
				this.children = this.children.concat(child);
            } else {
				this.children.push(child);
            }
		}
	}
	
}
function isLeaf(node) {
	return !node.children || (Array.isArray(node.children) && node.children.length === 0);
}
function visit(node, queue) {
	console.log(node.value);
	if (!isLeaf(node)) {
		node.children.forEach(ele=>{queue.push(ele)})
	}
}
function dfs(root) {
	let queue = [];
	
	queue.push(root);
	while( queue.length ) {
		visit(queue.shift(), queue)
	}
		
let ROOT = new Node("guangzhou")

ROOT.appendChild([new Node("tianhe", [new Node("dongpu", new Node("xujing")), new Node("tangxia"), new Node("chebei")]), new Node("baiyun", []), new Node("panyu", [])]) 
