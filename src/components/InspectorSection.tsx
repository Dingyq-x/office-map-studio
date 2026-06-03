import type { ReactNode } from 'react';
export default function InspectorSection({ title, children }: { title: string; children: ReactNode }) { return <section className="inspector-section"><h3>{title}</h3>{children}</section>; }
