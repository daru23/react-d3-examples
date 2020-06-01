import * as d3 from 'd3';
const WIDTH = 900;
const HEIGHT = 600;
let counts = {};

export default class D3Tree {
    constructor(element, data) {

        let vis = this;
        vis.g = d3.select(element).append("svg")
        .attr('width', WIDTH)
        .attr('height', HEIGHT)
        .append("g")
        .attr("transform", "translate(50,50)");

        let svg = vis.g;
        let dataStructure = d3.stratify()
        .id(function(d){
            // Generating new ids to avoid ambiguos ids
            // We keep a track of repeated nodes, parent
            // and generate a new compose id
            if (!counts[d.child]){
                counts[d.child] = 1;
                return d.child;
            } else {
                return d.child + "-" + ++counts[d.child];
            }
        })
        .parentId(function(d) { return d.parent;})(data);

        var treeStructure = d3.tree().size([WIDTH - 100, HEIGHT - 100]);
        var information = treeStructure(dataStructure);

        var connections1 = svg.append("g")
        .selectAll("path")
        .data((d) => {
            // Removing root links
            let links = information.links().filter(e => !e.source.data.root);
            // We go through the links to render correct path for nodes
            // with multiple parents
            links.map((node, idx) => {
                let duplicate = links.find( (node2, idx2) => {
                    let ids = node.target.id.split("-");
                    if (ids.length > 1) {
                        let idTarget = ids[0];
                        return node2.target.id === idTarget && idx > idx2;
                    } else {
                        return false;
                    }
                });
                // If this node is duplicate, point the target to first
                // sibling
                if (duplicate) {
                    node.target = duplicate.target;
                    node.duplicate = true;
                }
                return node;
            });
            return links;
        });

        connections1.enter()
        .append("path")
        .attr("d", function(d){
            // Calculate the offset of the path for siblings
            let offsetTargetX = !d.duplicate ? d.target.x - 20 : d.target.x - 60;
            return `M ${d.source.x - 20} ${d.source.y} ${offsetTargetX} ${d.target.y} `;
        });

        var rectangles = svg.append("g")
        .selectAll("rect")
        .data((d) => {
            let des = information.descendants();
            // Filtering the nodes to avoid double render nodes width
            // multiple parents
            return (des.filter((v,i,a) =>
            a.findIndex(t=>(t.data.child===v.data.child))===i))
            .filter(e => !e.data.root);
        });

        rectangles.enter()
        .append("rect")
        .attr("x", function(d){return d.x-60;})
        .attr("y", function(d){return d.y-20;});

        var names = svg.append("g")
        .selectAll("text")
        .data((d) => {
            let des = information.descendants();
            // Filterning names to avoid render names of nodes with multiple
            // parents
            return des.filter((v,i,a) => a.findIndex(t=>(t.data.child===v.data.child))===i)
        });

        names.enter()
        .append("text")
        .text(function(d){
            // No returning name of the root
            return !d.data.root ? d.data.child : null;
        })
        .attr("x", function(d){return d.x-20;})
        .attr("y", function(d){return d.y;})
        .classed("bigger", true);

        vis.update();
    }

    update() {
        let vis = this;
    }
}
