// Toast.jsx
// Small notification that appears briefly then fades out

export default function Toast({ message }) {
  return (
    <div className="toast" role="status" aria-live="polite">
      {message}
    </div>
  )
}