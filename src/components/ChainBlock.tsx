import Field from './Field'
import type { BlockData, DerivedBlock } from '../lib/chain'

interface Props {
  block: BlockData
  derived: DerivedBlock
  onChange: (patch: Partial<BlockData>) => void
  onMine: () => void
  /** tampilan ringkas untuk kolom peer */
  compact?: boolean
}

export default function ChainBlock({
  block,
  derived,
  onChange,
  onMine,
  compact,
}: Props) {
  const idx = String(derived.index).padStart(2, '0')
  return (
    <div className={'block ' + (derived.valid ? 'valid' : 'invalid')}>
      <div className="block__header">
        <span className="block__badge">
          <span className="cube" />
          BLOCK <span className="n">#{idx}</span>
        </span>
        <span className={'block__status ' + (derived.valid ? 'ok' : 'bad')}>
          <span className="dot" />
          {derived.valid ? 'Valid' : 'Invalid'}
        </span>
      </div>

      <Field label="Nonce">
        <input
          className="text short mono"
          value={block.nonce}
          onChange={(e) => onChange({ nonce: Number(e.target.value) || 0 })}
        />
      </Field>
      <Field label="Data">
        <textarea
          className="text"
          rows={compact ? 2 : 3}
          value={block.data}
          onChange={(e) => onChange({ data: e.target.value })}
        />
      </Field>
      <Field label="Prev">
        <input className="text mono" readOnly value={derived.prev} />
      </Field>
      <Field label="Hash">
        <input className="text mono" readOnly value={derived.hash} />
      </Field>
      <button className="mine" onClick={onMine}>
        Mine
      </button>
    </div>
  )
}
