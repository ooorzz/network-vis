(function(){"use strict";var t={5520:function(t,e,s){var i=s(9242),r=s(3396);function l(t,e){const s=(0,r.up)("router-link"),i=(0,r.up)("router-view");return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r._)("nav",null,[(0,r.Wm)(s,{to:"/top-level"},{default:(0,r.w5)((()=>[(0,r.Uk)("Top-Level")])),_:1})]),(0,r.Wm)(i)],64)}var o=s(89);const n={},a=(0,o.Z)(n,[["render",l]]);var d=a,h=s(2483),c=s(7139);function u(t,e,s,i,l,o){return(0,r.wg)(),(0,r.iD)("div",null,[(0,r._)("button",{onClick:e[0]||(e[0]=t=>o.Componentcombine())},"Combine Node"),(0,r._)("button",{onClick:e[1]||(e[1]=t=>o.switchlevel())},"Switch Level"),(0,r._)("button",{onClick:e[2]||(e[2]=t=>o.splitcom())},"Split Component"),l.newflag?((0,r.wg)(),(0,r.iD)("button",{key:0,onClick:e[3]||(e[3]=t=>o.backtoComponent())},"Back")):(0,r.kq)("",!0),(0,r._)("p",null,(0,c.zw)(l.message),1),((0,r.wg)(),(0,r.iD)("div",{ref:"chartContainer",key:l.componentKey}))])}s(560);var g=s(8301),f={name:"TopLevel",data(){return{nodesIN:null,linksIN:null,listall:null,simulation:null,svgWidth:1400,svgHeight:800,nodeRadius:16,flag:!0,newflag:!1,componentKey:0,selectedNodes:[],componentNum:0,message:"Component Level",timer:null}},async mounted(){try{const t=await fetch("./assets/FB1.json");if(!t.ok)throw new Error("Network response was not ok");const e=await t.json();let s=e.nodes.map((t=>({...t}))),i=e.links.map((t=>({...t})));const r=await fetch("./assets/festo.json");if(!r.ok)throw new Error("Network response was not ok");const l=await r.json();let o=l.nodes.map((t=>({...t}))),n=l.links.map((t=>({...t})));this.listall=[{keyid:"ComponentLevel",nodes:o,links:n}],i=i.filter((t=>"FB1"!==t.source&&"FB1"!==t.target)),s=s.filter((t=>"FB1"!==t.id)),this.linksIN=i,this.nodesIN=s,this.renderChart();let a={keyid:"ButtomLevel",nodes:this.nodesIN,links:this.linksIN};this.listall.push(a),this.linksIN=n,this.nodesIN=o,this.clearGraph(),this.renderChart();const d=await fetch("./assets/FB.json");if(!d.ok)throw new Error("Network response was not ok");const h=await d.json();let c=h.nodes.map((t=>({...t}))),u=h.links.map((t=>({...t})));a={keyid:"FB1",nodes:c,links:u},this.listall.push(a)}catch(t){console.error("Failed to fetch graph data: ",t)}},methods:{renderChart(){if(this.listall){console.log("data ok!");const s=120;var t=this.linksIN,e=this.nodesIN;let i=this.svgHeight-100,r=60;e.forEach((t=>{if(1===t.group){t.fx=s;const l=e.filter((t=>1===t.group));r=Math.ceil(i/l.length),t.fy=r*(l.indexOf(t)+1)}if(2===t.group){t.fx=this.svgWidth-s;const l=e.filter((t=>2===t.group));r=Math.floor(i/l.length),t.fy=r*(l.indexOf(t)+1)}}));let l=null,o=0;for(let t=0;t<this.selectedNodes.length;t++)l=e.filter((e=>e.id===this.selectedNodes[t].id)),3===l[0].group?(o=e.indexOf(l[0]),e[o].group=7):5===l[0].group?(o=e.indexOf(l[0]),e[o].group=8):6===l[0].group&&(o=e.indexOf(l[0]),e[o].group=9);this.simulation=g.A4v(e).force("link",g.Fsl(t).id((t=>t.id)).distance(50)).force("charge",g.q5i()).force("collide",g.Hh(this.nodeRadius)).on("tick",this.ticked);const n=g.Ys(this.$refs.chartContainer).append("svg").attr("width",this.svgWidth).attr("height",this.svgHeight).attr("viewBox",[0,0,this.svgWidth,this.svgHeight]).attr("style","max-width: 100%; height: auto;");n.append("defs").append("marker").attr("id","arrow").attr("viewBox",[0,0,10,10]).attr("refX",5).attr("refY",5).attr("markerWidth",5).attr("markerHeight",5).attr("orient","auto").append("path").attr("d","M 0 ,0 L 0,10 L 10, 5").attr("fill","black");const a=n.append("g").selectAll("g").data(t).join("g");a.append("line").attr("stroke","#999").attr("stroke-opacity",.6),a.append("line").attr("stroke","#999").attr("stroke-opacity",.6).attr("marker-end","url(#arrow)");const d=n.append("g").attr("class","nodes").selectAll("g").data(e).join("g").join("selectedNodes").on("click",this.handleNodeClick).on("dblclick",this.handleNodeDoubleClick);d.each((function(t){1===t.group?g.Ys(this).append("circle").attr("fill","#1f77b4"):2===t.group?g.Ys(this).append("circle").attr("fill","green"):3===t.group?g.Ys(this).append("circle").attr("fill","white"):4===t.group?g.Ys(this).append("circle").attr("fill","#fff2cc"):5===t.group?g.Ys(this).append("circle").attr("fill","#FFE4E1"):7===t.group||8===t.group?g.Ys(this).append("circle").attr("fill","#708090"):6===t.group?g.Ys(this).append("rect").attr("width",50).attr("height",30).attr("x",t.x-25).attr("x",t.y-15).attr("fill","orange").attr("stroke","black").attr("stroke-width",1.5):9===t.group&&g.Ys(this).append("rect").attr("width",50).attr("height",30).attr("x",t.x-25).attr("x",t.y-15).attr("fill","#708090").attr("stroke","black").attr("stroke-width",1.5)}));const h=this.$refs.chartContainer.querySelectorAll("circle");h.forEach((t=>{t.setAttribute("stroke","black"),t.setAttribute("stroke-width",1.5),t.setAttribute("r",16)})),d.append("text").attr("class","text-inner").attr("x",(t=>t.x)).attr("y",(t=>t.y)).attr("text-anchor","middle").attr("dominant-baseline","central").style("font-size","10px").style("fill",(t=>this.assignTextColor(t))).text((t=>t.title)),d.each((function(t){1===t.group&&g.Ys(this).append("text").attr("text-anchor","end").attr("class","text-left").attr("dominant-baseline","central").style("font-size","10px").style("fill","black").style("font-family","Times New Roman").style("font-weight","bold").text((t=>t.name)),2===t.group&&g.Ys(this).append("text").attr("text-anchor","start").attr("class","text-right").attr("dominant-baseline","central").style("font-size","10px").style("fill","black").style("font-family","Times New Roman").style("font-weight","bold").text((t=>t.name))})),d.call(g.ohM().on("start",this.dragstarted).on("drag",this.dragged).on("end",this.dragended));for(let t=0;t<this.selectedNodes.length;t++)l=e.filter((e=>e.id===this.selectedNodes[t].id)),7===l[0].group?(o=e.indexOf(l[0]),e[o].group=3):8===l[0].group?(o=e.indexOf(l[0]),e[o].group=5):9===l[0].group&&(o=e.indexOf(l[0]),e[o].group=6)}},Componentcombine(){let t=JSON.parse(JSON.stringify(this.listall[0].links)),e=JSON.parse(JSON.stringify(this.listall[0].nodes)),s=JSON.parse(JSON.stringify(t));for(let f=0;f<e.length;f++)if(-1===this.selectedNodes.indexOf(e[f])){let s=0,i=0;for(let r=0;r<t.length;r++)t[r].source.id===e[f].id?this.selectedNodes.indexOf(t[r].target)>-1&&(s+=1):t[r].target.id===e[f].id&&this.selectedNodes.indexOf(t[r].source)>-1&&(i+=1);i>0&&s>0&&this.selectedNodes.push(e[f])}if(this.selectedNodes=this.selectedNodes.filter((t=>6!==t.group&&9!==t.group)),0===this.selectedNodes.length)return;for(let f=0;f<this.selectedNodes.length;f++)1!==this.selectedNodes[f].group&&2!==this.selectedNodes[f].group&&(this.selectedNodes[f].index=f,delete this.selectedNodes[f].fx,delete this.selectedNodes[f].fy);this.componentNum+=1;let i=String(this.componentNum),r="Com".concat(i),l={id:r,title:"Com",group:6},o=[],n=e;n.push(l);let a=t;for(let f=0;f<this.selectedNodes.length;f++){for(let s=0;s<t.length;s++)if(this.selectedNodes[f].id!==t[s].target.id){if(this.selectedNodes[f].id===t[s].source.id)for(let i=0;i<e.length;i++)if(t[s].target.id===e[i].id){let t={source:l,target:e[i]};a.push(t),a.splice(s,1),s--;break}}else for(let i=0;i<e.length;i++)if(t[s].source.id===e[i].id){let t={source:e[i],target:l};a.push(t),a.splice(s,1),s--;break}for(let t=0;t<n.length;t++)if(this.selectedNodes[f].id===n[t].id){n.splice(t,1),t--;break}}let d=null;for(let f=0;f<a.length;f++)d=n.filter((t=>t.id===a[f].source.id)),d.length>.5&&(a[f].source=d[0]),d=n.filter((t=>t.id===a[f].target.id)),d.length>.5&&(a[f].target=d[0]);this.listall[0].links=a,this.listall[0].nodes=n;let h=1,c=1;for(let f=0;f<this.selectedNodes.length;f++)delete this.selectedNodes[f].fx,delete this.selectedNodes[f].fx;let u=JSON.parse(JSON.stringify(this.selectedNodes)),g=null;for(let f=0;f<this.selectedNodes.length;f++)for(let t=0;t<s.length;t++)if(s[t].target.id===this.selectedNodes[f].id)if(d=this.selectedNodes.filter((e=>s[t].source.id===e.id)),1===s[t].source.group){let e="?B".concat(String(h));g={id:e,title:e,name:s[t].source.name,group:1},u.push(g),o.push({source:g,target:this.selectedNodes[f]}),h++}else if(d.length<.5){let t="?B".concat(String(h));g={id:t,title:t,group:1},u.push(g),o.push({source:g,target:this.selectedNodes[f]}),h++}else d.length>.5&&o.push({source:d[0],target:this.selectedNodes[f]});else if(s[t].source.id===this.selectedNodes[f].id){if(d=this.selectedNodes.filter((e=>s[t].target.id===e.id)),1===s[t].target.group){let e="!B".concat(String(c));g={id:e,title:e,name:s[t].target.name,group:2},u.push(g),o.push({source:this.selectedNodes[f],target:g}),c++}if(d.length<.5){let t="!B".concat(String(c));g={id:t,title:t,group:2},u.push(g),o.push({source:this.selectedNodes[f],target:g}),c++}else d.length>.5&&o.push({source:this.selectedNodes[f],target:d[0]})}o=o.filter((t=>t.source.id!==t.target.id));for(let f=0;f<o.length;f++){for(let t=f+1;t<o.length;t++)if(o[f].source===o[t].source&&o[f].target===o[t].target){o.splice(t,1);break}d=u.filter((t=>t.id===o[f].source.id)),o[f].source=d[0],d=u.filter((t=>t.id===o[f].target.id)),o[f].target=d[0]}for(let f=0;f<o;f++)delete o[f].source.x,delete o[f].source.y,delete o[f].source.vx,delete o[f].source.vy,delete o[f].source.fx,delete o[f].source.fy,delete o[f].target.x,delete o[f].target.y,delete o[f].target.vx,delete o[f].target.vy,delete o[f].target.fx,delete o[f].target.fy;for(let f=0;f<u;f++)delete u[f].x,delete u[f].y,delete u[f].vx,delete u[f].vy,delete u[f].fx,delete u[f].fy;this.listall.push({keyid:r,nodes:u,links:o}),this.selectedNodes=[],this.flag&&(this.clearGraph(),this.linksIN=a,this.nodesIN=n,this.svgWidth=1400,this.svgHeight=800,this.newflag=!1,this.message="Component Level",this.renderChart())},handleNodeClick(t,e){clearTimeout(this.timer),this.timer=setTimeout((()=>{let t=!1,s=!1;for(let i=0;i<this.selectedNodes.length;i++)if(this.selectedNodes[i].id===e.id){s=!0,t=!0,this.selectedNodes.splice(i,1);break}!s&&e.group>2.5&&4!==e.group&&(t=!0,this.selectedNodes.push(e)),t&&(this.clearGraph(),this.renderChart())}),250)},handleNodeDoubleClick(t,e){if(clearTimeout(this.timer),this.selectedNodes=[],6===e.group)for(let s=0;s<this.listall.length;s++)if(this.listall[s].keyid===e.id)return this.linksIN=this.listall[s].links,this.nodesIN=this.listall[s].nodes,this.svgHeight=800,this.svgWidth=1400,this.newflag=!0,this.message="Component Level -> ".concat(this.listall[s].keyid),this.clearGraph(),void this.renderChart()},splitcom(){let t=this.selectedNodes.filter((t=>6===t.group));if(0===t.length)return;let e=JSON.parse(JSON.stringify(this.listall[0].links)),s=JSON.parse(JSON.stringify(this.listall[1].links)),i=JSON.parse(JSON.stringify(this.listall[0].nodes)),r=!1,l=null,o=null;for(let n=0;n<t.length;n++)for(let a=0;a<this.listall.length;a++){if(this.listall[a].keyid===t[n].id){r=!0;let d=JSON.parse(JSON.stringify(this.listall[a].nodes));d=d.filter((t=>1!==t.group&&2!==t.group));for(let s=0;s<e.length;s++)e[s].source.id!==t[n].id&&e[s].target.id!==t[n].id?(o=i.filter((t=>t.id===e[s].source.id)),e[s].source=o[0],o=i.filter((t=>t.id===e[s].target.id)),e[s].target=o[0]):(e.splice(s,1),s--);for(let t=0;t<s.length;t++)for(let r=0;r<d.length;r++){if(d[r].id===s[t].source.id){if(l=s[t],l.source=d[r],l.source.index=l.source.index-1,o=d.filter((e=>e.id===s[t].target.id)),o.length>0)l.target=o[0],l.target.index=l.target.index-1;else if(o=i.filter((e=>e.id===s[t].target.id)),o.length>.5)l.target=o[0];else for(let e=2;e<this.listall.length;e++)if(e!==a)for(let r=0;r<this.listall[e].nodes.length;r++)if(this.listall[e].nodes[r].id===s[t].target.id){o=i.filter((t=>t.id===this.listall[e].keyid)),l.target=o[0];break}e.push(l),s.splice(t,1),t--;break}if(d[r].id===s[t].target.id){if(l=s[t],l.target=d[r],l.target.index=l.target.index-1,o=d.filter((e=>e.id===s[t].source.id)),o.length>0)l.source=o[0],l.source.index=l.source.index-1;else if(o=i.filter((e=>e.id===s[t].source.id)),o.length>0)l.source=o[0];else for(let e=2;e<this.listall.length;e++)if(e!==a)for(let r=0;r<this.listall[e].nodes.length;r++)if(this.listall[e].nodes[r].id===s[t].source.id){o=i.filter((t=>t.id===this.listall[e].keyid)),l.source=o[0];break}e.push(l),console.log(l),s.splice(t,1),t--;break}}for(let e=0;e<i.length;e++)if(i[e].id===t[n].id){i.splice(e,1);break}i=i.concat(d)}if(r){r=!1,this.listall.splice(a,1);break}}this.selectedNodes=[],this.listall[0].links=e,this.listall[0].nodes=i,this.clearGraph(),this.linksIN=e,this.nodesIN=i,this.flag=!0,this.newflag=!1,this.svgWidth=1400,this.svgHeight=800,this.message="Component Level",this.renderChart()},clearGraph(){g.Ys(this.$refs.chartContainer).selectAll("*").remove()},switchlevel(){this.clearGraph(),this.flag?(this.linksIN=this.listall[1].links,this.nodesIN=this.listall[1].nodes,this.flag=!1,this.newflag=!1,this.svgHeight=1e3,this.svgWidth=2400,this.message="Bottom Level",this.renderChart()):(this.linksIN=this.listall[0].links,this.nodesIN=this.listall[0].nodes,this.flag=!0,this.newflag=!1,this.svgWidth=1400,this.svgHeight=800,this.message="Component Level",console.log(this.listall),this.renderChart())},backtoComponent(){this.clearGraph(),this.linksIN=this.listall[0].links,this.nodesIN=this.listall[0].nodes,this.flag=!0,this.svgWidth=1400,this.svgHeight=800,this.message="Component Level",this.newflag=!1,this.renderChart()},ticked(){const t=this.$refs.chartContainer.querySelectorAll("line"),e=this.$refs.chartContainer.querySelectorAll("circle"),s=this.$refs.chartContainer.querySelectorAll("rect"),i=this.$refs.chartContainer.querySelectorAll(".text-inner"),r=this.$refs.chartContainer.querySelectorAll(".text-left"),l=this.$refs.chartContainer.querySelectorAll(".text-right"),o=this.$refs.chartContainer.querySelectorAll(".text-link"),n=this.$refs.chartContainer.querySelectorAll(".text-bottom");t.forEach((t=>{const e=t.__data__.source.x,s=t.__data__.source.y,i=t.__data__.target.x,r=t.__data__.target.y,l=Math.atan2(r-s,i-e);t.setAttribute("x1",e),t.setAttribute("y1",s),t.setAttribute("x2",i-18*Math.cos(l)),t.setAttribute("y2",r-18*Math.sin(l))})),e.forEach((t=>{t.setAttribute("cx",t.__data__.x),t.setAttribute("cy",t.__data__.y)})),s.forEach((t=>{t.setAttribute("x",t.__data__.x-25),t.setAttribute("y",t.__data__.y-15)})),i.forEach((t=>{t.setAttribute("x",t.__data__.x),t.setAttribute("y",t.__data__.y)})),r.forEach((t=>{t.setAttribute("x",t.__data__.x-this.nodeRadius-20),t.setAttribute("y",t.__data__.y)})),l.forEach((t=>{t.setAttribute("x",t.__data__.x+this.nodeRadius+20),t.setAttribute("y",t.__data__.y)})),n.forEach((t=>{t.setAttribute("x",t.__data__.x),t.setAttribute("y",t.__data__.y+this.nodeRadius+10)})),o.forEach((t=>{t.setAttribute("x",.5*(t.__data__.source.x+t.__data__.target.x)),t.setAttribute("y",.5*(t.__data__.source.y+t.__data__.target.y))}))},dragstarted(t){t.active||this.simulation.alphaTarget(.3).restart(),t.subject.fx=t.subject.x,t.subject.fy=t.subject.y},dragged(t,e){1===e.group||2===e.group||(t.subject.fx=t.x),t.subject.fy=t.y},dragended(t,e){t.active||this.simulation.alphaTarget(0),1!==e.group&&2!==e.group&&(t.subject.fx=null),t.subject.fy=null},assignTextColor(t){return 1===t.group||2===t.group?"white":"black"}},beforeUnmount(){this.simulation&&this.simulation.stop()}};const p=(0,o.Z)(f,[["render",u]]);var k=p;const m=[{path:"/top-level",component:k}],N=(0,h.p7)({history:(0,h.PO)("/network-vis/"),routes:m});var x=N,y=s(65),_=(0,y.MT)({state:{},getters:{},mutations:{},actions:{},modules:{}});(0,i.ri)(d).use(_).use(x).mount("#app")}},e={};function s(i){var r=e[i];if(void 0!==r)return r.exports;var l=e[i]={exports:{}};return t[i].call(l.exports,l,l.exports,s),l.exports}s.m=t,function(){var t=[];s.O=function(e,i,r,l){if(!i){var o=1/0;for(h=0;h<t.length;h++){i=t[h][0],r=t[h][1],l=t[h][2];for(var n=!0,a=0;a<i.length;a++)(!1&l||o>=l)&&Object.keys(s.O).every((function(t){return s.O[t](i[a])}))?i.splice(a--,1):(n=!1,l<o&&(o=l));if(n){t.splice(h--,1);var d=r();void 0!==d&&(e=d)}}return e}l=l||0;for(var h=t.length;h>0&&t[h-1][2]>l;h--)t[h]=t[h-1];t[h]=[i,r,l]}}(),function(){s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,{a:e}),e}}(),function(){s.d=function(t,e){for(var i in e)s.o(e,i)&&!s.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={143:0};s.O.j=function(e){return 0===t[e]};var e=function(e,i){var r,l,o=i[0],n=i[1],a=i[2],d=0;if(o.some((function(e){return 0!==t[e]}))){for(r in n)s.o(n,r)&&(s.m[r]=n[r]);if(a)var h=a(s)}for(e&&e(i);d<o.length;d++)l=o[d],s.o(t,l)&&t[l]&&t[l][0](),t[l]=0;return s.O(h)},i=self["webpackChunksiemens_component"]=self["webpackChunksiemens_component"]||[];i.forEach(e.bind(null,0)),i.push=e.bind(null,i.push.bind(i))}();var i=s.O(void 0,[998],(function(){return s(5520)}));i=s.O(i)})();
//# sourceMappingURL=app.f58d7dfa.js.map