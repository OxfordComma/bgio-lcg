import "./Button.css";

export default function Button({ text, ...props }) {
  return (
    <button className="button" {...props}>
      {text}
    </button>
  );
}
