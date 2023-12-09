<template>
    <div ref="chartContainer"></div>
</template>

<script>
import * as d3 from 'd3';
export default {
    name: 'FBLevel',
    data() {
        return {
            graphData: null,
            simulation: null,
            svgWidth: 1200,
            svgHeight: 800,
            nodeRadius: 16,
        };
    },
    async mounted() {
        try {
            // const response = await fetch("./assets/festo.json"); // 使用实际的JSON文件路径
            const response = await fetch("./assets/FB1.json"); // 使用实际的JSON文件路径
            // const response = await fetch("./assets/simpleData.json"); // 使用实际的JSON文件路径
            if (!response.ok) throw new Error('Network response was not ok');
            this.graphData = await response.json();
            this.renderChart();
        } catch (error) {
            console.error("Failed to fetch graph data: ", error);
        }
    },
    methods: {
        renderChart() {
            if (this.graphData) {
                console.log("data ok!")
                // const width = 1200;
                // const height = 600;
                // const color = d3.scaleOrdinal(d3.schemeCategory10);
                const margin = 20;

                // The force simulation mutates links and nodes, so create a copy
                // so that re-evaluating this cell produces the same result.
                const links = this.graphData.links.map(d => ({ ...d }));
                const nodes = this.graphData.nodes.map(d => ({ ...d }));
                const spacing = 60;

                const maxCnt = Math.max(nodes.filter(node => node.group === 1).length, nodes.filter(node => node.group === 2).length)
                this.svgHeight = spacing * (maxCnt + 1);
                nodes.forEach((d) => {
                    // 把group为1的结点固定在最左侧
                    if (d.group === 1) {
                        d.fx = margin; // 固定 x 坐标在最左侧
                        const group1Nodes = nodes.filter(node => node.group === 1);
                        // const spacing = this.svgHeight / (group1Nodes.length + 1);
                        d.fy = spacing * (group1Nodes.indexOf(d) + 1); // 计算均匀分布的 y 坐标
                        //    leftHeight= spacing *(group1Nodes.length + 1);
                        //     d.fy = spacing * (group1Nodes.indexOf(d) + 1);
                    }
                    // 把group为2的结点固定在最右侧
                    if (d.group === 2) {
                        d.fx = this.svgWidth - margin; // 固定 x 坐标在最右侧
                        const group2Nodes = nodes.filter(node => node.group === 2);
                        const spacing = this.svgHeight / (group2Nodes.length + 1);
                        d.fy = spacing * (group2Nodes.indexOf(d) + 1);  // 计算均匀分布的 y 坐标
                        // rightHeight= spacing *(group2Nodes.length + 1);
                        // d.fy = spacing * (group2Nodes.indexOf(d) + 1);
                    }
                });

                console.log(nodes)

                // 定义了一个力学模拟，在每个tick步骤的时候运行ticked函数
                this.simulation = d3.forceSimulation(nodes)
                    // 这里用distance属性使连线变长
                    .force("link", d3.forceLink(links).id(d => d.id).distance(50))
                    .force("charge", d3.forceManyBody())
                    .force("collide", d3.forceCollide(this.nodeRadius))
                    // .force("center", d3.forceCenter(this.svgWidth / 2, this.svgHeight / 2))
                    // .force("boundingBox", this.boundingBoxForce())
                    .on("tick", this.ticked);

                const svg = d3.select(this.$refs.chartContainer) //选择文档中的chartContainer元素
                    .append('svg') //添加一个svg元素
                    .attr("width", this.svgWidth)
                    .attr("height", this.svgHeight)
                    .attr("viewBox", [0, 0, this.svgWidth, this.svgHeight])
                    .attr("style", "max-width: 100%; height: auto;");

                // 创建svg线段元素，并设置他们的格式
                svg.append("g")//g表示group，一个容器元素，用于将很多svg元素组合到一起
                    .attr("stroke", "#999")
                    .attr("stroke-opacity", 0.6)
                    .selectAll('line')//选择svg内所有的line元素
                    .data(links)//绑定links数组
                    .join("line")
                    .attr("stroke-width", d => Math.sqrt(d.value));

                // 创建一个节点组来包含圆和文本
                const node = svg.append("g")
                    .attr("class", "nodes") // 给组添加一个类，以便我们可以引用它
                    .selectAll("g")
                    .data(nodes)
                    .join("g"); // 为每个节点数据创建一个'g'元素

                // 在节点组中添加圆形
                node.append("circle")
                    .attr("r", this.nodeRadius)
                    // .attr("fill", d => color(d.group))
                    .attr("fill", d => this.assignFillColor(d))
                    .attr("stroke", "black")
                    .attr("stroke-width", 1.5);

                // 在节点组中添加文本
                node.append("text")
                    .attr('x', d => d.x)
                    .attr('y', d => d.y)
                    .attr('dx', "-.9em") // 使文本在垂直方向上居中对齐
                    .attr('dy', ".35em") // 使文本在垂直方向上居中对齐
                    .style('font-size', '10px') // 设置字体大小
                    // .style('fill', 'white')// 设置字体颜色
                    .style('fill', d => this.assignTextColor(d))
                    .text(d => d.title); // 将节点数据的id设置为文本内容


                // console.log(node);

                // 添加拖拽行为，包含开始、进行和结束时的行为
                node.call(d3.drag()
                    .on("start", this.dragstarted)
                    .on("drag", this.dragged)
                    .on("end", this.dragended));
            }

        },
        ticked() {
            const link = this.$refs.chartContainer.querySelectorAll('line');
            const node = this.$refs.chartContainer.querySelectorAll('circle');
            const text = this.$refs.chartContainer.querySelectorAll('text');

            link.forEach(lk => {
                lk.setAttribute('x1', lk.__data__.source.x);
                lk.setAttribute('y1', lk.__data__.source.y);
                lk.setAttribute('x2', lk.__data__.target.x);
                lk.setAttribute('y2', lk.__data__.target.y);
            });

            node.forEach(nd => {
                nd.setAttribute('cx', nd.__data__.x);
                nd.setAttribute('cy', nd.__data__.y);
            });

            text.forEach(td => {
                td.setAttribute('x', td.__data__.x);
                td.setAttribute('y', td.__data__.y);
                // td.setAttribute('dy', ".35em");
            });
        },
        // boundingBoxForce() {
        //     return function (d) {
        //         d.x = Math.max(20, Math.min(1200 - 20, d.x));
        //         d.y = Math.max(20, Math.min(600 - 20, d.y));
        //         // d.x = Math.max(this.nodeRadius, Math.min(this.svgWidth - this.nodeRadius, d.x));
        //         // d.y = Math.max(this.nodeRadius, Math.min(this.svgHeight - this.nodeRadius, d.y));
        //     };
        // },
        dragstarted(event) {
            if (!event.active) this.simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        },

        dragged(event, d) {
            if (d.group === 1 || d.group === 2) {
                event.subject.fy = event.y; // 只更新 y，保持 x 固定
            } else {
                event.subject.fx = event.x;
                event.subject.fy = event.y;
            }

        },

        dragended(event, d) {
            if (!event.active) this.simulation.alphaTarget(0);
            if (d.group !== 1 && d.group !== 2) {
                event.subject.fx = null;
            }
            event.subject.fy = null;
        },

        assignFillColor(d) {
            if (d.group === 1) {
                return "#1f77b4"
            }
            if (d.group === 2) {
                return "green"
            }
            if (d.group === 4) {
                return "#fff2cc"
            }
            if (d.group === 5) {
                return "#7f7f7f"
            }
            else {
                return "white"
            }
        },
        assignTextColor(d) {
            if (d.group === 1 || d.group === 2) {
                return "white"
            }
            else {
                return "black"
            }
        }
    },

    beforeUnmount() {
        // 停止模拟
        if (this.simulation) {
            this.simulation.stop();
        }
    }
}
</script>

<style>
/* 全局样式 */
.button-container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: absolute;
    /* 或者使用 fixed 根据需求 */
    top: 20;
    left: 0;
    right: 0;
}
</style>