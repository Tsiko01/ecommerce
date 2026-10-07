import type { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function Input({ label, error, id, ...props }: Props) {
  const inputId = id ?? props.name
  const errorId = inputId ? `${inputId}-error` : undefined
  return (
    <label className={`form-field ${error ? 'has-error' : ''}`} htmlFor={inputId}>
      <span>{label}</span>
      {error && <span className="field-error" id={errorId} role="alert">{error}</span>}
      <input {...props} id={inputId} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} />
    </label>
  )
}
