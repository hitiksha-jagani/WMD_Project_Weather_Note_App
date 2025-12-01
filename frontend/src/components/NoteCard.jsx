export default function NoteCard({ note, onEdit, onDelete }) {
    return (
        <article className="bg-white border rounded p-3 shadow-sm">
            <header className="flex items-start justify-between mb-2">
                <h4 className="font-semibold">{note.title}</h4>
                <div className="text-sm text-slate-500">{new Date(note.createdAt).toLocaleString()}</div>
            </header>
            <p className="text-sm text-slate-700 mb-3">{note.content}</p>
            <div className="flex gap-2">
                <button className="px-2 py-1 text-sm border rounded" onClick={() => onEdit(note)}>Edit</button>
                <button className="px-2 py-1 text-sm border rounded" onClick={() => onDelete(note._id)}>Delete</button>
            </div>
        </article>
    )
}
