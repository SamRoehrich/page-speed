import { getPost } from "@@/sql-lite/blog";

export function Blog({ title }: { title: string }) {
  const postTitle = title.split("/blog/")[1];
  const post = getPost(postTitle);
  if (post) {
    return (
      <div className="space-y-8 ">
        <h1>{post.title}</h1>
        <span>{post.description}</span>
        <section>{post.content}</section>
      </div>
    );
  } else return null;
}
