export default function Toast({ message }) {
  return (
    <div style={{ background: "#d4edda", padding: "10px", marginBottom: "10px" }}>
      {message}
    </div>
  );
}
