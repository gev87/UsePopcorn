import { useState } from "react";
import Star from "./Star";
import PropTypes from "prop-types"; 

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
};

StarRating.propTypes={
  maxRating: PropTypes.number,
}

export default function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  className = "",
  messages = ["Terrible", "Bad", "Okay", "Good", "Amazing"],
  defaultRating = 0,
  passRating
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };

  const handleRating = (rate) => {
    setRating(rate);
    passRating?.(rate)
  };

  const handleTempRating = (rate) => {
    setTempRating(rate);
  };
  const textContent = messages.length
    ? messages[
        Math.round(((tempRating || rating) * messages.length) / maxRating) - 1
      ]
    : tempRating || rating || "";

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, index) => (
          <Star
            key={index}
            onRate={() => handleRating(index + 1)}
            isFilled={tempRating ? index < tempRating : index < rating}
            onHoverIn={() => handleTempRating(index + 1)}
            onHoverOut={() => setTempRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>{textContent}</p>
    </div>
  );
}
