export default function Subject() {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="mb-4">
          <div className="text-3xl font-bold">
            Find qualified Tutors for face-
          </div>
          <div className="text-3xl font-bold">to-face and online tutoring</div>
        </div>
        <div className="text-xl font-thin">
          More than 50K students have found tutors already.
        </div>
        <div className="text-xl font-thin">
          From English to Mathematics, from History to French,
        </div>
        <div className="mb-4 text-xl font-thin">
          from C++ to Node JS, we have it all. Find a tutor now{" "}
        </div>
        <div className="mb-8">
          <a
            style={{
              display: "inline-block",
              padding: "15px 20px",
              color: "white",
              textDecoration: "none",
            }}
            href="/signin" className="text-xl bg-green-500"
          >
            Become a Tutor
          </a>
          <a
            style={{
              marginLeft: "55px",
              display: "inline-block",
              padding: "15px 30px",
              color: "white",
              textDecoration: "none",
            }}
            href="/alltutor"  className="text-xl bg-green-500"
          >
            Hire a Tutor
          </a>
        </div>
      </div>
    </>
  );
}
