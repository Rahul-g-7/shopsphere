const Rating = ({ value, text }) => {
  return (
    <div className="flex items-center gap-1">
      <div className="flex text-gold text-sm">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>
            {value >= star ? '★' : '☆'}
          </span>
        ))}
      </div>
      {text && <span className="text-xs text-graphite font-body ml-1">{text}</span>}
    </div>
  );
};
export default Rating;
