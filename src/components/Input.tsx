import { HTMLAttributes } from 'preact/compat'

export default function (props: HTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      type={props.type ?? 'text'}
      class="input input-bordered w-full"
    />
  )
}
