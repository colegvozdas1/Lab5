    /*Create Chart Area*/

    let margin = {top:50,bottom: 50, left: 50, right: 50};
    const width = 700 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    const svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
	.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    /*Generate Scales*/

    const xScale = d3.scaleBand().range([0,width]);
    /*.domain(data.map(d => d.company))
    .paddingInner(0.1);*/

    const yScale = d3.scaleLinear().range([height,0]);
    /*.domain([0,d3.max(data,d=>d.stores)])*/

    /*Create Bars*/
    //barwidth=xScale.bandwidth();
    

    /*const bars = svg.selectAll('rect')
    .data(data)
    .enter()
    .append('g');

    bars.append('rect')
    .attr('class','bars')*/
    
    /*.attr('x',function(d,i){
        return (barwidth+7.5)*i
    })
    .attr('y',d=>yScale(d.stores))
    .attr('width',barwidth)
    .attr('height',d=>height-yScale(d.stores))
    .attr('fill','darkblue')*/

   
   /*Generate axes*/

    /*const yAxis = d3.axisLeft()
    .scale(yScale)
    
    const xAxis = d3.axisBottom()
    .scale(xScale)*/
    
    svg.append("g")
	.attr("class", "axis-x-axis")
	//.call(xAxis)
    .attr("transform", `translate(0, ${height})`);

    svg.append("g")
	.attr("class", "axis-y-axis")
	//.call(yAxis);

    svg.append('text')
    .attr('class','y-axis-title')
    //.text("Stores")

    let type = d3.select('#group-by option:checked').property('value');

    function update(data,type){

        xScale.domain(data.map(d=>d.company))
        .paddingInner(0.1);
        yScale.domain([0,d3.max(data,d=>d[type])]);
        
    
        barwidth=xScale.bandwidth();
    
        const bars = svg.selectAll('rect')
        .data(data,d=>d.company);
    
        bars.enter()
        .append('rect')
        .merge(bars)
        .transition()
        .duration(2000)
        .attr('x', function(d,i){
            return (barwidth+7.5)*i;
        })
        .attr('y',d=>yScale(d[type]))
        .attr('width',barwidth)
        .attr('height',d=>height-yScale(d[type]))
        .attr('fill','darkblue');
    
    
        const yAxis=d3.axisLeft()
        .scale(yScale);
        const xAxis = d3.axisBottom()
        .scale(xScale);
    
        svg.select('.axis-x-axis')
        .transition()
        .duration(2000)
        .call(xAxis);
    
        svg.select('.axis-y-axis')
        .transition()
        .duration(2000)
        .call(yAxis);
    
        svg.select('.y-axis-title')
        .transition()
        .duration(2000)
        .text(function(){
            if (type==='stores'){
                return "Stores"
            }
            else{
                return "Billion USD";
            }
        });
    
    
    
    }

    
    const data = d3.csv('coffee-house-chains.csv',row=>{
        return{
            company: row.company,
            stores: +row.stores,
            revenue: +row.revenue
        };
    }).then(data=>{
        data=data.sort(function(a,b){
            return b[type]-a[type];
        })
        sorted=0;

        update(data,type);

        d3.select('#group-by').on('change',d=>{
            type=d3.select('#group-by option:checked').property('value')
            update(data,type);
        });
        d3.select('#buttons').on('click',(e,d)=>{
            if(sorted==0){
                sorted=1
                data=data.sort(function(a,b){
                    return a[type]-b[type];
                })
            }
            else{
                sorted=0;
                data=data.sort(function(a,b){
                    return b[type]-a[type];
                })
            }
            update(data,type);
        })

    
    });
    
