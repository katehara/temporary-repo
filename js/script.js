$(document).ready(function(){
		var tipbar = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
              return "<span>#tweets: </span> <span>" + d.val + "</span>";
            })
        var tipdot = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
              return "<b>" + d.key + "</b><br><span>Followers: </span> <span>" + d.fol + "</span><br><span>Retweets: </span> <span>" + d.values + "</span>";
            })


	d3.csv("ktrfulldata.csv", function(data) {

		data.forEach(function(d){ 
			d['nofol'] = +d['nofol'];
			d['nofav'] = +d['nofav'];
			d['timestamp'] = moment(d['timestamp'], 'YYYY-MM-DD hh:mm:ss');
			d['time'] = moment(d['time'], 'hh:mm:ss');
			d['date'] = moment(d['date'], 'YYYY-MM-DD');


		}); 

		var pane = d3.select('body').select('.content1').select('.vis')

		var margin = {
		    top: 20,
		    right: 20,
		    bottom: 70,
		    left: 30
		},
		width = pane.node().getBoundingClientRect().width - margin.left - margin.right,
		height = pane.node().getBoundingClientRect().width/1.5 - margin.top - margin.bottom;

		var placetweets = function(st){
			times = st.split("-")
			t1 = moment(times[0] , 'hh:mm')
			t2 = moment(times[1] , 'hh:mm')

			smalldata = []
			for(i=0;i<data.length;i++){
				k =data[i]['time']
				f = data[i]['retfl']
				if( k >= t1 && k < t2 && f == 'False')
					smalldata.push(data[i])
			}

			smalldata.sort(function(a,b) {return (a.noret > b.noret) ? -1 : ((b.noret > a.noret) ? 1 : 0);})
			r1 = smalldata[0]
			r2 = smalldata[1]
			r3 = smalldata[2]

			twe1 = d3.select('.twe1')
			twe1.selectAll('*').remove()			
			twe1.append('img')
			  .attr('src',r1['picurl'])
			  .attr('class', 'responsive-img col s2')
			twe1.append('p')
				.attr("class" , "col s10")
				.html("\"<span class = \"one\">" + r1['text'] + "</span>\"<br>-<span class = \"two\">@" + r1['user']+"</span>")

			twe2 = d3.select('.twe2')
			twe2.selectAll('*').remove()			
			twe2.append('img')
			  .attr('src',r2['picurl'])
			  .attr('class', 'responsive-img col s2')
			twe2.append('p')
				.attr("class" , "col s10")
				.html("\"<span class = \"one\">" + r2['text'] + "</span>\"<br>-<span class = \"two\">@" + r2['user']+"</span>")
				
			twe3 = d3.select('.twe3')
			twe3.selectAll('*').remove()			
			twe3.append('img')
			  .attr('src',r3['picurl'])
			  .attr('class', 'responsive-img col s2')
			twe3.append('p')
				.attr("class" , "col s10")
				.html("\"<span class = \"one\">" + r3['text'] + "</span>\"<br>-<span class = \"two\">@" + r3['user']+"</span>")

		}

		timecount = [
			{ 	key : "00:00-03:00",
			 	val: 0 
			},
			{	key : "03:00-06:00",
				val : 0
			},
			{ 	key : "06:00-09:00",
			 	val: 0 
			},
			{	key : "09:00-12:00",
				val : 0
			},
			{ 	key : "12:00-15:00",
			 	val: 0 
			},
			{	key : "15:00-18:00",
				val : 0
			},
			{ 	key : "18:00-21:00",
			 	val: 0 
			},
			{	key : "21:00-24:00",
				val : 0
			}
		]

		for(i=0;i<data.length;i++){
			k = data[i]['time']
			if(k >= moment("00:00" , 'hh:mm') && k < moment("03:00" , 'hh:mm'))
				for(j=0; j<timecount.length; j++){
					if(timecount[j].key == "00:00-03:00")
						timecount[j].val++;
				}
			else if(k >= moment("03:00" , 'hh:mm') && k < moment("06:00" , 'hh:mm'))
				for(j=0; j<timecount.length; j++){
					if(timecount[j].key == "03:00-06:00")
						timecount[j].val++;
				}
			else if(k >= moment("06:00" , 'hh:mm') && k < moment("09:00" , 'hh:mm'))
				for(j=0; j<timecount.length; j++){
					if(timecount[j].key == "06:00-09:00")
						timecount[j].val++;
				}
			else if(k >= moment("9:00" , 'hh:mm') && k < moment("12:00" , 'hh:mm'))
				for(j=0; j<timecount.length; j++){
					if(timecount[j].key == "09:00-12:00")
						timecount[j].val++;
				}
			else if(k >= moment("12:00" , 'hh:mm') && k < moment("15:00" , 'hh:mm'))
				for(j=0; j<timecount.length; j++){
					if(timecount[j].key == "12:00-15:00")
						timecount[j].val++;
				}
			else if(k >= moment("15:00" , 'hh:mm') && k < moment("18:00" , 'hh:mm'))
				for(j=0; j<timecount.length; j++){
					if(timecount[j].key == "15:00-18:00")
						timecount[j].val++;
				}
			else if(k >= moment("18:00" , 'hh:mm') && k < moment("21:00" , 'hh:mm'))
				for(j=0; j<timecount.length; j++){
					if(timecount[j].key == "18:00-21:00")
						timecount[j].val++;
				}
			else if(k >= moment("21:00" , 'hh:mm') && k < moment("24:00" , 'hh:mm'))
				for(j=0; j<timecount.length; j++){
					if(timecount[j].key == "21:00-24:00")
						timecount[j].val++;
				}
		}

		meanVal = d3.mean(timecount , function(d){return d.val});
		maxVal = d3.max(timecount , function(d){return d.val});

		x = d3.scale.ordinal()
            .domain(timecount.map(function(d){ return d.key;}))
            .rangeRoundBands([0, width] , 0.5);

	    y = d3.scale.linear()
	            .domain([0,d3.max(timecount , function(d){return d.val})])
	            .range([height , 0]);


	    xAxis = d3.svg.axis()
	                .scale(x)
	                .orient("bottom")
	                .tickSize(0.5)
	    
	    yAxis = d3.svg.axis()
	                .scale(y)
	                .orient("left")
	                .ticks(5)
	                .tickSize(0.5)

		var svg = pane.append("svg")
              		.attr("class" , "svg")
              		.attr("width" , width + margin.left + margin.right)
              		.attr("height" , height + margin.top + margin.bottom)
              		.append("g")
                		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        svg.call(tipbar);    

        svg.append("g")
	      .attr("class" , "x axis")
	      .attr("transform" , "translate(0," + height + ")")
	      .call(xAxis)
	      .selectAll("text") 
	      	.style("font-size" , ".7em") 
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-90)" );

	    svg.append("g")
	      .attr("class" , "y axis")
	      .attr("transform" , "translate(0,0)")
	      .call(yAxis)
	      .selectAll("text") 
	      	.style("font-size" , ".7em");

	    svg.append("text")
		    .attr("class", "x label")
		    .attr("text-anchor", "end")
		    .attr("x", width/1.7)
		    .attr("y", 10)
		    .html("Time of the day &#8594");

    	svg.append("text")
		    .attr("class", "y label")
		    .attr("text-anchor", "end")
		    .attr("x", -40)
		    .attr("y", width-20)
		    .attr("dy", ".75em")
		    .attr("transform", "rotate(-90)")
		    .html("Tweet Count &#8594;");

		// svg.append("line")
		// 	.attr("stroke" , "#4B4966")
		// 	.attr("stroke-width" , 0.5)
		//     .attr("x1", 0)
		//     .attr("y1", y(meanVal))
		//     .attr("x2", width-margin.right)
		//     .attr("y2", y(meanVal))
		//     .on('mouseover', tipbar.show)
		// 	.on('mouseout', tipbar.hide)

	    var bars =  svg.selectAll('.bar')
	    				.data(timecount)
	    				.enter().append('rect')
	    				.attr("class" , function(d) { return "red-bar bar"})
	    				.attr("x" , function(d){return x(d.key);})
			              .attr("y" , function(d){return y(d.val);})
			              .attr("width" , function(d){return x.rangeBand();})
			              .attr("height" , function(d){return Math.abs(y(d.val)-y(0))})
			              .on('mouseover', tipbar.show)
        					.on('mouseout', tipbar.hide)
        					.on("click" , function(){
					        	placetweets(d3.select(this).data()[0].key);						        
					        })
					        .style("cursor", "pointer");
		

		placetweets("00:00-24:00")

/*--------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------------------*/

		var userinfo = d3.nest()
					  .key(function(d) { return d.user; })
					  .rollup(function(v) { return  d3.sum(v, function(d) { return (d.retfl == "False")? d.noret : 0 }) })
					  .entries(data);

		for(i=0; i<userinfo.length; i++)
			for(j=0;j<data.length;j++)
				if(userinfo[i].key == data[j].user){
					userinfo[i].fol = data[j].nofol;
					break;
				}
			
		var pane2 = d3.select('body').select('.content2').select('.bubbles')

		var margin2 = {
		    top: 20,
		    right: 20,
		    bottom: 30,
		    left: 20
		},
		width2 = pane2.node().getBoundingClientRect().width*.95 - margin2.left - margin2.right,
		height2 = pane2.node().getBoundingClientRect().width*.2 - margin2.top - margin2.bottom;

		// console.log(d3.sum(userinfo , function(d){return d.fol;}))

		var s = d3.scale.log().domain([1, 100000000]).range([10000000, 0])

		x2 = d3.scale.log()
			.base(10)
            .domain([1 , d3.max(userinfo , function(d){return d.fol;})])//.nice()
            .range([0, width2]);

	    rad = d3.scale.linear()
	            .domain([0,d3.max(userinfo , function(d){return d.values;})])//.nice()
	            .range([1, height2/6]);

	    y2 = d3.scale.linear()
	    		.domain([-0.2,1.2])
	    		.range([height2 , 0]);

	    xAxis2 = d3.svg.axis()
	                .scale(x2)
	                .orient("bottom")
	                .tickSize(0.5)
	                .tickFormat(function (d) {
					  	return s.tickFormat(7,d3.format(",d"))(d)
					})
	                
		var svg2 = pane2.append("svg")
              		.attr("class" , "svg")
              		.attr("width" , width2 + margin2.left + margin2.right)
              		.attr("height" , height2 + margin2.top + margin2.bottom)
              		.append("g")
                		.attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");
        
        svg2.call(tipdot);    

        svg2.append("g")
	      	.attr("class" , "x axis")
	      	.attr("transform" , "translate(0," + height2 + ")")
	      	.call(xAxis2)
	      	.selectAll("text") 
	      		.style("font-size" , ".7em") 
            	.style("text-anchor", "end")
           

	    svg2.append("text")
		    .attr("class", "x label")
		    .attr("text-anchor", "end")
		    .attr("x", width2/1.8)
		    .attr("y", height2 + 30)
		    .html("Reach of Twitterati &#8594");

		svg2.append("text")
		    .attr("class", "x label")
		    .attr("font-size" , "0.7em")
		    .attr("text-anchor", "end")
		    .attr("x", width2)
		    .attr("y", 0)
		    .html("**Size of bubble depicts reach of tweets by the twitterati");

	    var circles =  svg2.selectAll('.dot')
	    				.data(userinfo)
	    				.enter().append('circle')
	    				.attr("class" , "dot")
	    				.attr("r", function(d) {return rad(d.values);})
				      	.attr("cy", function(d) {return y2(Math.random());})
				      	.attr("cx", function(d) {return x2(d.fol);})
			            .on('mouseover', tipdot.show)
        				.on('mouseout', tipdot.hide)

	});
});

window.onload = function () { 
	d3.select('main').style("opacity" , 1);
	d3.select('.loader').style("opacity" , 0);
}