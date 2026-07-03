import type { ReactNode } from 'react'

interface FieldProps {
  label: string
  children: ReactNode
}

/** Satu baris: label rata-kanan di kiri, kontrol di kanan. */
export default function Field({ label, children }: FieldProps) {
  return (
    <div className="field">
      <label>{label}</label>
      <div className="control">{children}</div>
    </div>
  )
}
