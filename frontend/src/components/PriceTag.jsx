// The signature visual element of ShopSphere: a small rotated price tag,
// evoking a string-tied paper tag on real merchandise.
const PriceTag = ({ price }) => {
  return (
    <div
      className="absolute -top-2 -right-2 bg-gold text-ink font-display font-semibold text-sm px-3 py-1 rounded-sm shadow-md select-none"
      style={{ transform: 'rotate(-4deg)' }}
    >
      ₹{price.toFixed(2)}
      <span
        className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-paper rounded-full border border-ink/20"
        aria-hidden="true"
      />
    </div>
  );
};

export default PriceTag;
