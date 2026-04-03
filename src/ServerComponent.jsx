import { AsyncDatabaase } from "promise-sqlite3";
import path from "node:path";

const SQL_REQUEST = `
SELECT n.id as id, n.note as note, f.name as from_user, t.name as to_user
FROM notes n
JOIN users f
ON f.id = n.from_user
JOIN users t
ON t.id = n.to_user
WHERE from_user = ?`;

const USER_ID = 1;

export default async function MyNotes() {
  console.log("rendering MyNotes server component");

  async function fetchNotes() {
    console.log("running server function fetchNotes");

    const dbPath = path.resolve(__dirname, "../notes.db");
    const db = await AsyncDatabaase.open(dbPath);
    const from = await db.all(SQL_REQUEST, [USER_ID]);
    return { from };
  }

  const notes = await fetchNotes();

  return (
    <fieldset>
      <legend>Server Component</legend>
      <div>
        <table>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {notes.from.map(({ id, note, from_user, to_user }) => (
              <tr key={id}>
                <td>{from_user}</td>
                <td>{to_user}</td>
                <td>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </fieldset>
  );
}
