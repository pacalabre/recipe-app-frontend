import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found">
      <h2>Not found – 404</h2>
      <div>
        <Link className="link" href="/">
          Go back to Home
        </Link>
      </div>
    </section>
  );
}
