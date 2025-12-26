const SectionWrapper = ({ children, className = "" }) => {
  return (
    <section
      className={`w-full max-w-6xl mx-auto px-4 py-16 md:py-24 ${className}`}
    >
      {children}
    </section>
  );
};

export default SectionWrapper;
