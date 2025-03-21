import { getPost } from "@@/sql-lite/blog";

export function Blog({ title }: { title: string }) {
  const post = getPost(title);
  if (title.includes("keep-learning")) return null;
  if (post) {
    return (
      <div className="space-y-8">
        <h1>{post.title}</h1>
        <span className="mb-6">{post.description}</span>
        <section>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </section>
      </div>
    );
  } else return null;
}
