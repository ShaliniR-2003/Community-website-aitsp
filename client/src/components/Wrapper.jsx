export default function Wrapper({ children }) {
  return (
    <div
      style={{
        padding: "20px",
        margin: "20px auto",
        maxWidth: "800px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#fff"
      }}
    >
      {children}
    </div>
  );
}
