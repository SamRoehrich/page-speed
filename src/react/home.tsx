import { BlogCard } from "./components/blog-card";
export function Home() {
  return (
    <div>
      <section className="space-y-4 text-lg md:text-xl">
        <p>
          Software engineer located in Tucson, AZ with over 5 years expereince
          creating innovative products.
        </p>
        <p>
          Currently engineering a solution to migrate{" "}
          <a
            href="https://www.outsideonline.com"
            target="_blank"
            className="text-blue-500 hover:underline hover:text-blue-400"
          >
            Outside's
          </a>{" "}
          21 editorial brands from Wordpress to Next.js.
        </p>
      </section>
      <div className="py-8">
        <h2 className="font-bold text-2xl">
          <a href="/blog" className="hover:underline hover:text-slate-800">
            Ideas
          </a>
        </h2>
      </div>
      <section className="flex flex-col space-y-4 md:space-y-0 md:grid md:grid-cols-6 md:gap-4">
        <BlogCard
          title="Supergraph"
          description="How we make it work at Outside"
          href="/blog/graphql-next"
        />
        <BlogCard
          title="Keep Learning"
          description="How to beat AI"
          href="/blog/keep-learning"
        />
        <BlogCard
          title="Little Lies"
          description="How I built this site"
          href="/blog/react-and-bun"
        />
      </section>
    </div>
  );
}
