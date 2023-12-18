import { PropsWithChildren } from 'preact/compat'

export default function ({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-4 items-start">{children}</div>
}
