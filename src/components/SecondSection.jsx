export default function SecondSection() {
  return (
    <section className="section second-section">
      <div className="lorem-container section-text-block">
        <p className="section-text">
          ANTES DE SEGUIR
        </p>
        <p className="section-text">
          TE INVITO A <span className="bold-text">CONOCERME</span>
        </p>
        <div className="section-avatar-container">
          <svg viewBox="0 0 270 270" className="section-avatar-svg">
            <defs>
              <path id="section-circle-text" d="M 135, 135 m -105, 0 a 105,105 0 1,1 210,0 a 105,105 0 1,1 -210,0" />
            </defs>
            <circle
              cx="135"
              cy="135"
              r="82.5"
              fill="none"
              stroke="rgba(250, 250, 250, 1.0)"
              strokeWidth="0.5"
            />
            <image
              href="https://i.ibb.co/b5BCQxNB/avatar-dark.png"
              x="75"
              y="75"
              width="120"
              height="120"
              className="section-avatar-image"
            />
            <text className="section-avatar-text" fill="rgba(250, 250, 250, 1.0)" fontSize="13" letterSpacing="0.4" dominantBaseline="middle">
              <textPath href="#section-circle-text" textLength="660" lengthAdjust="spacing">
                EN&#160;MARKETING UX&#160;DESIGNER FRONTEND&#160;VIBE&#160;CODER COPYWRITER RESEARCHER&#160;●&#160;TÉCNICO&#160;
              </textPath>
            </text>
            <circle
              cx="135"
              cy="135"
              r="127.5"
              fill="none"
              stroke="rgba(250, 250, 250, 1.0)"
              strokeWidth="0.5"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}
