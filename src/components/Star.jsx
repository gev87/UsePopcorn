import EmptyStarIcon from "../icons/EmptyStarIcon";
import FilledStarIcon from "../icons/FilledStarIcon";



export default function Star({
  onRate,
  isFilled,
  onHoverIn,
  onHoverOut,
  color,
  size
}) {

  const starStyle = {
    display: "block",
    cursor: "pointer",
    width:`${size}px`,
    height:`${size}px`,
  }
  
  return (
    <span
      role="button"
      style={starStyle}
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {isFilled ? (
        <FilledStarIcon fill={color} stroke={color}/>
      ) : (
        <EmptyStarIcon stroke={color} />
      )}
    </span>
  );
}
