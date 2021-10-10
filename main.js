
function update(data,type){

    xScale.domain(data,data.map(d=>d.company))
    .paddingInner(0.1);
    yScale.domain([0,d3.max(data,d=>d[type])]);

    barwidth=xScale.bandwidth();

    const bars = svg.selectAll('rect')
    .data(data,d=>d[type]);

    bars.enter()
    .append('rect')
    .attr('x', function(d,i){
        return (barwidth+7.5)*i;
    })
    .attr('y',d=>yScale(d[type]))
    .attr('width',barwidth)
    .attr('height',d=>height-yScale(d[type]))
    .attr('fill','darkblue');

    /*bars.exit()
    .transition()
    .duration(2000)*/
    


    const yAxis=d3.axisLeft()
    .scale(yScale);
    const xAxis = d3.axisBottom()
    .scale(xScale);

    svg.select('.axis-x-axis')
    .call(xAxis);

    svg.select('.axis-y-axis')
    .call(yAxis);

    svg.select('y-axis-title')
    .text(data,d=>d[type])



}





const data = d3.csv('coffee-house-chains.csv',row=>{
    return{
        company: row.company,
        stores: +row.stores,
        revenue: +row.revenue
    };
}).then(data=>{

    update(data);

});
