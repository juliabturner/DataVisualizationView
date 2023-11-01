import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function OutputHistogram({ data, outputTitle }) {
  const svgRef = useRef();

  useEffect(() => {
    const existingSvg = d3.select(svgRef.current);
    existingSvg.selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const outputData = Object.values(data).map((experiment) => experiment.outputs);

    if (outputData.length === 0) {
        return;
    }

    const outputValues = outputData.map((experimentOutputs) => experimentOutputs[{outputTitle}]);
    const outputTitles = Object.keys(outputData[0]);

    const x = d3.scaleLinear()
      .range([0, width]);

    const y = d3.scaleLinear()
      .range([height, 0]);

    console.log('Output Titles', outputTitles)

    outputTitles.forEach((outputTitle) => {
        const outputValues = outputData.map((experimentOutputs) => experimentOutputs[outputTitle]);
        x.domain([d3.min(outputValues)-1, d3.max(outputValues)+1]);
        y.domain([0, 1]); 
      
        const histogram = d3.histogram()
            .domain(x.domain())
            .thresholds(x.ticks(10))(outputValues);

        y.domain([0, d3.max(histogram, (d) => d.length)]);

        const svg = existingSvg // Create a new SVG for each output title
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
        
        svg.selectAll("rect")
        .data(histogram)
        .enter()
        .append("rect")
        .attr("x", (d) => x(d.x0))
        .attr("y", (d) => y(d.length))
        .attr("width", (d) => x(d.x1) - x(d.x0) - 1)
        .attr("height", (d) => height - y(d.length))
        .attr("fill", "steelblue");

        svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

        svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y));

        svg.append("text")
        .attr("x", width / 2)
        .attr("y", 0)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .text(outputTitle);
    });

  }, [data]);

  return (
    <div>
      <h2>Generated Histograms</h2>
      <div ref={svgRef}></div>
    </div>
  );
}

export default OutputHistogram;
