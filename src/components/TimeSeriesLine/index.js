import React from 'react';
import {PropTypes} from 'prop-types'
import { extent as d3ArrayExtent } from 'd3-array';
import {
  axisBottom as d3AxisBottom,
  axisLeft as d3AxisLeft,
} from 'd3-axis';
import {
  scaleLinear as d3ScaleLinear,
  scaleTime as d3ScaleTime,
} from 'd3-scale';
import { select as d3Select } from 'd3-selection';
import { line as d3Line } from 'd3-shape';
import SVG from '../SVG';
import './index.css'

const propTypes = {
  data: PropTypes.array,
  height: PropTypes.number.isRequired,
  margin: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number
      ]),
  selectX: PropTypes.func.isRequired,
  selectY: PropTypes.any.isRequired,
  width: PropTypes.number.isRequired,
};

const TimeSeriesLine = ({
  data,
  height,
  margin,
  selectX,
  selectY,
  width,
}) => {

  const xScale = d3ScaleTime()
    .domain(d3ArrayExtent(data, selectX))
    .range([0, width]);
  const yScale = d3ScaleLinear()
    .domain(d3ArrayExtent(data, selectY))
    .range([height, 0]);

  const xAxis = d3AxisBottom()
    .scale(xScale)
    .ticks(12);
  const yAxis = d3AxisLeft()
    .scale(yScale)
    .ticks(5);

  const selectScaledX = datum => xScale(selectX(datum));
  const selectScaledY = datum => yScale(selectY(datum));

  const simpleLine = d3Line()
    .x(selectScaledX)
    .y(selectScaledY);

  const linePath = simpleLine(data);

  return (
    <SVG
      className="container"
      height={height}
      margin={margin}
      width={width}
    >
      <g
        className="xAxis"
        ref={node => d3Select(node).call(xAxis)}
        style={{
          transform: `translateY(${height}px)`,
        }}
      />
      <g className="yAxis" ref={node => d3Select(node).call(yAxis)} />
      <g className="line">
        <path d={linePath} />
      </g>
    </SVG>
  );
};

TimeSeriesLine.propTypes = propTypes;

export default TimeSeriesLine
