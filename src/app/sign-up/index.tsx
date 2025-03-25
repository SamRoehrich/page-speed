export default async function () {
  return (
    <div className="">
      <h1>Sign Up</h1>
      <form method="post" className="flex flex-col space-y-8 align-center mt-6">
        <div className="flex flex-col space-y-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="acme@acme.com"
            name="email"
            autoComplete="email"
            className="p-4 border border-2 border-slate-900 rounded"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder=""
            name="password"
            className="p-4 border border-2 border-slate-900 rounded"
          />
        </div>
        <button
          type="submit"
          className="p-4 bg-blue-500 hover:bg-blue-400 cursor-pointer hover:shadow rounded w-32"
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
