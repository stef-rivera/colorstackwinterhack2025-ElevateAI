async function testAllAPIs() {
  const base = "http://localhost:3000/api";

  // GET /api/sections
  const sections = await fetch(`${base}/sections`, { cache: "no-store" }).then(
    (r) => r.json()
  );

  // GET /api/lessons
  const lessons = await fetch(`${base}/lessons`, { cache: "no-store" }).then(
    (r) => r.json()
  );

  // GET /api/lessons/:id/questions (first lesson)
  let questions: any[] = [];
  if (lessons[0]) {
    questions = await fetch(`${base}/lessons/${lessons[0].id}/questions`, {
      cache: "no-store",
    }).then((r) => r.json());
  }

  return { sections, lessons, questions };
}

export default async function Home() {
  const { sections, lessons, questions } = await testAllAPIs();

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">API Results</h1>

      {/* Sections */}
      <div className="bg-white p-4 rounded mb-4">
        <h2 className="text-xl font-bold mb-2">Sections ({sections.length})</h2>
        {sections.map((s: any) => (
          <div key={s.id} className="p-2 bg-gray-50 rounded mb-2">
            <p className="font-bold">{s.title}</p>
            <p className="text-sm text-gray-500">ID: {s.id}</p>
          </div>
        ))}
      </div>

      {/* Lessons */}
      <div className="bg-white p-4 rounded mb-4">
        <h2 className="text-xl font-bold mb-2">Lessons ({lessons.length})</h2>
        {lessons.map((l: any) => (
          <div key={l.id} className="p-2 bg-gray-50 rounded mb-2">
            <p className="font-bold">{l.title}</p>
            <p className="text-sm text-gray-500">Section: {l.section_id}</p>
          </div>
        ))}
      </div>

      {/* Questions */}
      <div className="bg-white p-4 rounded mb-4">
        <h2 className="text-xl font-bold mb-2">
          Questions ({questions.length})
        </h2>
        {questions.map((q: any) => (
          <div key={q.id} className="p-3 bg-gray-50 rounded mb-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
              {q.type}
            </span>
            <p className="font-bold mt-1">{q.prompt}</p>
            {q.choices && (
              <ul className="mt-1 text-sm text-gray-600">
                {q.choices.map((c: any) => (
                  <li key={c.key}>• {c.label}</li>
                ))}
              </ul>
            )}
            {q.correct_answer && (
              <p className="text-green-600 text-sm mt-1">
                Answer: {q.correct_answer}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Status */}
      <div className="bg-green-100 p-4 rounded">
        <p className="text-green-800 font-bold">
          ✅ Sections: {sections.length} | Lessons: {lessons.length} |
          Questions: {questions.length}
        </p>
      </div>
    </main>
  );
}
