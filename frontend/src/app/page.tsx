import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <h1 className="text-xl text-black font-bold">
            Digital Signature App
          </h1>

          <div className="flex gap-4 text-black">
            <Link
              href="/login"
              className="rounded-lg border px-4 py-2"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
              Get Started
            </Link>
          </div>

        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-24">

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

          <div>

            <h1
              className="
                                text-5xl
                                text-black
                                font-bold
                                leading-tight
                            "
            >
              Secure Digital
              Signatures for
              Modern Teams
            </h1>

            <p
              className="
                mt-6
                text-lg
                text-black
                text-gray-600
              "
            >
              Upload documents,
              collect signatures,
              send email invitations,
              track audit logs,
              and download signed PDFs
              from one platform.
            </p>

            <div className="mt-8 flex gap-4">

              <Link
                href="/register"
                className="
                                    rounded-lg
                                    bg-blue-600
                                    px-6
                                    py-3
                                    text-white
                                "
              >
                Get Started
              </Link>

              <Link
                href="/login"
                className="
                                    rounded-lg
                                    border
                                    px-6
                                    py-3
                                "
              >
                Login
              </Link>

            </div>

          </div>

          {/* Preview Card */}
          <div
            className="
                            rounded-2xl
                            bg-white
                            p-8
                            shadow-lg
                        "
          >
            <h3 className="text-lg text-black font-semibold">
              Document Workflow
            </h3>

            <div className="mt-6 space-y-4">

              <div className="rounded-lg text-black bg-gray-100 p-3">
                📄 Upload Document
              </div>

              <div className="rounded-lg text-black bg-gray-100 p-3">
                🔗 Generate Public Link
              </div>

              <div className="rounded-lg text-black bg-gray-100 p-3">
                📧 Send Invitation
              </div>

              <div className="rounded-lg text-black bg-gray-100 p-3">
                ✍️ Collect Signature
              </div>

              <div className="rounded-lg text-black bg-gray-100 p-3">
                ✅ Download Signed PDF
              </div>

            </div>
          </div>

        </div>

      </section>

      {/* Features Section */}
      <section className="bg-white py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">

            <h2 className="text-4xl text-black font-bold">
              Powerful Features
            </h2>

            <p className="mt-4 text-gray-600">
              Everything you need to manage
              digital signatures and documents.
            </p>

          </div>

          <div
            className="
                mt-12
                grid
                gap-6
                md:grid-cols-2
                lg:grid-cols-4
            "
          >

            <div className="rounded-xl border p-6 shadow-sm">
              <div className="text-3xl">
                📄
              </div>

              <h3 className="mt-4 text-xl text-black font-semibold">
                Document Upload
              </h3>

              <p className="mt-2 text-gray-600">
                Upload and manage PDF
                documents securely.
              </p>
            </div>

            <div className="rounded-xl border p-6 shadow-sm">
              <div className="text-3xl">
                ✍️
              </div>

              <h3 className="mt-4 text-xl text-black font-semibold">
                Digital Signatures
              </h3>

              <p className="mt-2 text-gray-600">
                Add signatures directly
                to documents.
              </p>
            </div>

            <div className="rounded-xl border p-6 shadow-sm">
              <div className="text-3xl">
                🔗
              </div>

              <h3 className="mt-4 text-xl text-black font-semibold">
                Public Signing Links
              </h3>

              <p className="mt-2 text-gray-600">
                Share documents with
                secure public links.
              </p>
            </div>

            <div className="rounded-xl border p-6 shadow-sm">
              <div className="text-3xl">
                📊
              </div>

              <h3 className="mt-4 text-xl text-black font-semibold">
                Audit Trail
              </h3>

              <p className="mt-2 text-gray-600">
                Track every important
                document activity.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">

            <h2 className="text-4xl text-black font-bold">
              How It Works
            </h2>

            <p className="mt-4 text-gray-600">
              Complete the signing process in a few simple steps.
            </p>

          </div>

          <div
            className="
                mt-12
                grid
                gap-6
                md:grid-cols-5
            "
          >

            <div className="rounded-xl bg-white p-6 text-center shadow-sm">
              <div className="text-4xl">📄</div>
              <h3 className="mt-4 font-semibold text-black">
                Upload
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Upload your PDF document.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 text-center shadow-sm">
              <div className="text-4xl">🔗</div>
              <h3 className="mt-4 font-semibold text-black">
                Generate Link
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Create a public signing link.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 text-center shadow-sm">
              <div className="text-4xl">📧</div>
              <h3 className="mt-4 font-semibold text-black">
                Send Invitation
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Share the document via email.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 text-center shadow-sm">
              <div className="text-4xl">✍️</div>
              <h3 className="mt-4 font-semibold text-black">
                Sign Document
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Collect signatures securely.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 text-center shadow-sm">
              <div className="text-4xl">✅</div>
              <h3 className="mt-4 font-semibold text-black">
                Download PDF
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Download the signed document.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-20 text-center text-white">

        <div className="mx-auto max-w-4xl px-6">

          <h2 className="text-4xl font-bold">
            Ready to Sign Documents Online?
          </h2>

          <p className="mt-4 text-lg text-blue-100">
            Start managing documents and collecting signatures today.
          </p>

          <Link
            href="/register"
            className="
                mt-8
                inline-block
                rounded-lg
                bg-white
                px-6
                py-3
                font-medium
                text-blue-600
            "
          >
            Create Account
          </Link>

        </div>

      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-10 text-white">

        <div className="mx-auto max-w-7xl px-6">

          <div
            className="
                flex
                flex-col
                items-center
                justify-between
                gap-6
                md:flex-row
            "
          >

            <div>

              <h3 className="text-xl font-bold">
                Digital Signature App
              </h3>

              <p className="mt-2 text-gray-400">
                Secure document signing platform
                built during the Innovexis Internship.
              </p>

            </div>

            <div className="text-center md:text-right">

              <p className="font-medium">
                Built With
              </p>

              <p className="mt-2 text-gray-400">
                Next.js • TypeScript • Node.js
              </p>

              <p className="text-gray-400">
                Express • MongoDB
              </p>

            </div>

          </div>

          <div
            className="
                mt-8
                border-t
                border-gray-800
                pt-6
                text-center
                text-sm
                text-gray-500
            "
          >
            © 2026 Digital Signature App.
            All rights reserved.
          </div>

        </div>

      </footer>

    </main>
  );
}