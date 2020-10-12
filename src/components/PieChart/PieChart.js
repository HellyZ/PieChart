import PropTypes from "prop-types";
import React from "react";
import Circle from "./Circle";
import Sector from "./Sector";
import Sectors from "./Sectors";

class PieChart extends React.Component {
  state = {
    expandedIndex: null
  };

  handleSectorHover = (data, index, e) => {
    const { onSectorHover } = this.props;
    this.setState({ expandedIndex: index });
    onSectorHover(data, index, e);
  };

  renderSingleData(dataItem, center) {
    const { expandedIndex } = this.state;
    const { expandSize } = this.props;
    return (
      <Circle
        center={center}
        radius={
          center + (dataItem.expanded || expandedIndex === 0 ? expandSize : 0)
        }
        onMouseEnter={(e) => this.handleSectorHover(dataItem, 0, e)}
        onMouseLeave={(e) => this.handleSectorHover(null, null, e)}
        onTouchEnd={(e) => this.handleSectorHover(null, null, e)}
        onTouchStart={(e) => this.handleSectorHover(dataItem, 0, e)}
        {...dataItem}
      />
    );
  }

  renderMultipleData(center) {
    const { expandedIndex } = this.state;
    const { data, ...props } = this.props;
    return (
      <Sectors
        center={center}
        data={data.map((d, i) => ({ ...d, expanded: i === expandedIndex }))}
        {...props}
        onSectorHover={this.handleSectorHover}
      />
    );
  }

  render() {
    const { data, expandSize, viewBoxSize } = this.props;
    const center = viewBoxSize / 2;
    const offset = expandSize;
    const dataWithValue = data.filter((d) => d.value > 0);
    return dataWithValue && dataWithValue.length > 0 ? (
      <svg
        viewBox={`0 0 ${viewBoxSize + offset + 2} ${viewBoxSize + offset + 2}`}
      >
        <g transform={`translate(${offset}, ${offset})`}>
          {dataWithValue.length === 1
            ? this.renderSingleData(dataWithValue[0], center)
            : this.renderMultipleData(center)}
        </g>
      </svg>
    ) : null;
  }
}

PieChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      title: PropTypes.string,
      value: PropTypes.number.isRequired,
      href: PropTypes.string
    })
  ).isRequired,
  expandSize: PropTypes.number,
  expandedIndex: PropTypes.number,
  onSectorHover: PropTypes.func,
  strokeColor: Sector.propTypes.strokeColor,
  strokeLinejoin: Sector.propTypes.strokeLinejoin,
  strokeWidth: Sector.propTypes.strokeWidth,
  startAngle: PropTypes.number,
  angleMargin: PropTypes.number,
  viewBoxSize: PropTypes.number,
  transitionDuration: Sector.propTypes.transitionDuration,
  transitionTimingFunction: Sector.propTypes.transitionTimingFunction
};

PieChart.defaultProps = {
  data: [],
  expandSize: Sectors.defaultProps.expandSize,
  expandedIndex: -1,
  onSectorHover: null,
  shrinkOnTouchEnd: false,
  strokeColor: Sector.defaultProps.strokeColor,
  strokeLinejoin: Sector.defaultProps.strokeLinejoin,
  strokeWidth: Sector.defaultProps.strokeWidth,
  startAngle: 0,
  angleMargin: 0,
  viewBoxSize: 200,
  transitionDuration: Sector.defaultProps.transitionDuration,
  transitionTimingFunction: Sector.defaultProps.transitionTimingFunction
};

export default PieChart;
