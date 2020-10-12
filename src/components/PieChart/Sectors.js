import PropTypes from "prop-types";
import React from "react";

import Sector from "./Sector";

const Sectors = ({
  center,
  data,
  onSectorHover,
  expandSize,
  strokeWidth,
  strokeColor,
  startAngle,
  angleMargin,
  ...props
}) => {
  const total = data.reduce((prev, current) => current.value + prev, 0);
  const anglesMap = data.map((d, i) => {
    return (360 * d.value) / total;
  });
  let angleStart = startAngle;
  let angleEnd = startAngle;
  return total > 0 ? (
    <g>
      {data.map((d, i) => {
        const isLarge = d.value / total > 0.5;
        const angle = (360 * d.value) / total;
        const radius =
          (center + (d.expanded ? expandSize : 0) - strokeWidth) * 0.5;

        angleStart = angleEnd;
        angleMargin = angleMargin > angle ? angle : angleMargin;
        angleEnd = angleStart + angle - angleMargin;
        const angleMid = (angleEnd - angleStart) / 2;
        const r2 = radius * 1.2;
        const x1 = center + radius * Math.cos((Math.PI * angleStart) / 180);
        const y1 = center + radius * Math.sin((Math.PI * angleStart) / 180);
        const x2 = center + radius * Math.cos((Math.PI * angleEnd) / 180);
        const y2 = center + radius * Math.sin((Math.PI * angleEnd) / 180);
        const path = `
        M${center},${center}
        L${x1},${y1}
        A${radius},${radius}
        0 ${isLarge ? 1 : 0},1
        ${x2},${y2}
        z
      `;

        const a = angleMid + anglesMap.slice(0, i).reduce((a, b) => a + b, 0);
        const xMid = center + r2 * Math.cos((Math.PI * a) / 180);
        const yMid = center + r2 * Math.sin((Math.PI * a) / 180);
        const xEnd = xMid > center ? xMid + 5 : xMid - 5;
        const xText = xMid < center ? xEnd - d.title.length * 3 : xEnd;
        const sectorLabelLinePoints = `
        ${center},${center} 
        ${xMid} ${yMid} 
        ${xEnd} ${yMid}
        `;

        angleEnd += angleMargin;
        return (
          <g key={"sector" + i}>
            <Sector
              fill={d.color}
              path={path}
              href={d.href}
              strokeColor={strokeColor}
              strokeWidth={strokeWidth}
              total={total}
              onMouseEnter={(e) => onSectorHover(d, i, e)}
              onMouseLeave={(e) => onSectorHover(null, null, e)}
              onTouchEnd={(e) => onSectorHover(null, null, e)}
              onTouchStart={(e) => onSectorHover(d, i, e)}
              {...props}
              {...d}
            />
            <polyline
              points={sectorLabelLinePoints}
              fill="none"
              stroke={d.color}
              strokeWidth={1}
            />
            <text x={xText} y={yMid + 2} fontSize={"0.4em"}>
              {d.title}
            </text>
          </g>
        );
      })}
    </g>
  ) : null;
};

Sectors.propTypes = {
  center: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      title: PropTypes.string,
      value: PropTypes.number.isRequired
    })
  ).isRequired,
  onSectorHover: PropTypes.func,
  expandSize: PropTypes.number,
  strokeColor: Sector.propTypes.strokeColor,
  strokeWidth: Sector.propTypes.strokeWidth,
  startAngle: PropTypes.number,
  angleMargin: PropTypes.number
};

Sectors.defaultProps = {
  expandSize: 10
};

export default Sectors;
