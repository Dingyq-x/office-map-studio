interface Props { open: boolean; title: string; message: string; confirmText?: string; onConfirm: () => void; onCancel: () => void; }
export default function ConfirmDialog({ open, title, message, confirmText = '确认', onConfirm, onCancel }: Props) {
  if (!open) return null; return <div className="dialog-mask"><div className="confirm-dialog"><h2>{title}</h2><p>{message}</p><div><button onClick={onCancel}>取消</button><button className="danger" onClick={onConfirm}>{confirmText}</button></div></div></div>;
}
