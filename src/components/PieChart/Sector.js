import PropTypes from "prop-types";
import React from "react";
// Sector WIN. FATALITY
const Sector = (props) => {
  let result;
  const {
    fill,
    strokeColor,
    strokeLinejoin,
    strokeWidth,
    onTouchStart,
    onTouchEnd,
    onMouseEnter,
    onMouseLeave,
    path,
    title,
    href,
    transitionDuration,
    transitionTimingFunction
  } = props;

  const content = (
    <path
      d={path}
      fill={fill}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeLinejoin={strokeLinejoin}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        transitionProperty: "all",
        transitionTimingFunction: transitionTimingFunction,
        transitionDuration: transitionDuration
      }}
    >
      {title && <title>{title}</title>}
    </path>
  );

  if (href) {
    result = <a href={href}>{content}</a>;
  } else {
    result = content;
  }
  return result;
};

Sector.propTypes = {
  fill: PropTypes.string,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onTouchEnd: PropTypes.func,
  onTouchStart: PropTypes.func,
  path: PropTypes.string.isRequired,
  strokeColor: PropTypes.string,
  strokeLinejoin: PropTypes.string,
  strokeWidth: PropTypes.number,
  title: PropTypes.string,
  href: PropTypes.string,
  transitionDuration: PropTypes.string,
  transitionTimingFunction: PropTypes.string
};

Sector.defaultProps = {
  strokeColor: "#fff",
  strokeWidth: 1,
  strokeLinejoin: "round",
  title: null,
  href: null,
  transitionDuration: "0.3s",
  transitionTimingFunction: "ease-in-out"
};

export default Sector;
