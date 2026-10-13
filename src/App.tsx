import { FormEvent, useEffect, useState } from "react"

// Configure the private entry code here before publishing.
// VITE_ACCESS_CODE takes priority when it is provided by your hosting platform.
const ACCESS_CODE =
  import.meta.env.VITE_ACCESS_CODE ?? "Y24JSP29"

const introduction = [
  "Florence,",
  "I made this little space for you because there are things I wanted to say properly, without rushing them or expecting anything from you in return.",
  "You became someone who made me feel safe, someone who made Discord feel a little more like home. Maybe I didn't show that appreciation the way I should have, and I'm sorry for the ways I've hurt you.",
  "This isn't my way of asking you to forget what happened or to come back before you're ready. I just wanted to put my thoughts into words and give you the apology you deserve.",
  "Take your time. There's no pressure to respond. I hope this helps you understand what I wanted to say.",
]

const letter = [
  "I don't really know where to begin, so I think the only place I can start is with the truth.",
  "I'm sorry.",
  "Not just because things between us aren't okay right now, and not just because I miss how things used to be. I'm sorry because my words and the way I handled things made you uncomfortable, and you didn't deserve to feel that way because of me.",
  "Whatever I was thinking at the time, whatever I meant to say, none of that erases how my actions affected you. I have to take responsibility for that. I can't keep hiding behind my intentions when the impact of my words was different. I should have thought more carefully about what I was saying and how it might make you feel. You deserved that consideration from me, and I failed to give it to you.",
  "And I'm genuinely sorry for that.",
  "Florence is a name I gave you because, to me, it matched your personality. It wasn't just a random nickname. There's a reason I associated that name with you, and there's a reason your friendship became something I valued so much.",
  "You made me feel safe in ways I don't think I properly expressed. You made a place on the internet feel like a second home. Discord stopped being just an app where people talked; it became a place where I had someone I genuinely looked forward to talking to. Someone whose presence could make an ordinary day feel a little less ordinary.",
  "And somewhere along the way, you became a person I never wanted to make feel small, unwanted, or disposable.",
  "Knowing that I may have made you feel uncomfortable instead is something I need to face honestly. I can't tell you how you should feel about what happened, and I won't pretend that writing a letter can undo it. You have every right to your feelings, your boundaries, and the time you've asked for.",
  "I also want you to know why I made this little corner of the internet for you.",
  "It isn't a way to get around your request for space. It isn't a timer counting down until you come back, and it isn't a deal where you have to forgive me because I put effort into making something. You don't owe me forgiveness, a reply, or a fresh start just because you read these words.",
  "I made it because there are things I wanted to say properly, without rushing through them or letting the moment turn into another argument. I wanted to take responsibility, to acknowledge what I did wrong, and to tell you that your friendship genuinely mattered to me.",
  "When you said you needed time, I heard you. I want to respect that. If and when you're ready to talk again, I'd be grateful for the chance to start fresh—not by pretending none of this happened, but by learning from it and doing better. And if that takes time, I'll respect that too.",
  "I'm not asking you to trust my words immediately. I know that trust isn't something I can demand or repair with one apology. All I can do is be honest about where I went wrong and let my actions, from here on, speak for themselves.",
  "You were never just another person in a server to me, Florence. You were someone who helped make that place feel like home. And regardless of where things stand between us right now, I'm grateful for the good moments we shared.",
  "I'm sorry for the moments when I made that friendship feel less safe than it should have been.",
  "You deserved better from me.",
  "Take all the time you need. You don't have to respond to this letter. I just wanted you to know that I understand there's something I need to take responsibility for, that I'm not brushing it aside, and that I'm genuinely sorry.",
]

function GardenRoses({ closing = false }: { closing?: boolean }) {
  return (
    <div
      className={`rose-field${closing ? " rose-field--closing" : ""}`}
      aria-hidden="true"
    >
      {["one", "two", "three"].map((rose) => (
        <span className={`rose-bloom rose-bloom--${rose}`} key={rose}>
          <i />
          <i />
          <i />
          <b />
        </span>
      ))}
    </div>
  )
}

export default function App() {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [entered, setEntered] = useState(false)
  const [showGate, setShowGate] = useState(true)

  useEffect(() => {
    if (!entered) return

    const elements = document.querySelectorAll<HTMLElement>(".reveal")
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [entered])

  const handleProceed = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (code !== ACCESS_CODE) {
      setError("That code doesn’t seem quite right.")
      return
    }

    setError("")
    setEntered(true)
    window.setTimeout(() => {
      setShowGate(false)
      document.querySelector("main")?.focus({ preventScroll: true })
    }, 850)
  }

  return (
    <div className="site-shell">
      {showGate && (
        <section
          className={`gate${entered ? " gate--leaving" : ""}`}
          aria-label="Private entry"
        >
          <div className="garden-glow" aria-hidden="true" />
          <GardenRoses />
          <div className="gate__content">
            <span className="eyebrow">A private note</span>
            <h1>For Florence,</h1>
            <p className="gate__line">A small space, made quietly for you.</p>

            <form className="access-form" onSubmit={handleProceed}>
              <label htmlFor="access-code">Access code</label>
              <div className="access-form__row">
                <input
                  id="access-code"
                  type="password"
                  value={code}
                  onChange={(event) => {
                    setCode(event.target.value)
                    if (error) setError("")
                  }}
                  autoComplete="off"
                  spellCheck="false"
                  aria-describedby="code-hint code-error"
                />
                <button type="submit">Proceed</button>
              </div>
              <div className="access-form__meta">
                <span id="code-hint">Hint · Y24</span>
                <span id="code-error" className="form-error" role="status">
                  {error}
                </span>
              </div>
            </form>
          </div>
          <span className="gate__index" aria-hidden="true">
            01 / 04
          </span>
        </section>
      )}

      {entered && (
        <>
          <main tabIndex={-1}>
            <div className="persistent-roses">
              <GardenRoses />
            </div>

            <section className="intro reveal" id="introduction">
              <div className="section-rule">
                <span>Before the letter</span>
                <span>02 / 04</span>
              </div>
              <div className="intro__layout">
                <h2>A little note before you read</h2>
                <div className="intro__copy">
                  {introduction.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  <a className="continue-link" href="#letter">
                    Continue to the letter
                    <span aria-hidden="true">↓</span>
                  </a>
                </div>
              </div>
            </section>

            <section className="letter-section reveal" id="letter">
              <div className="section-rule">
                <span>A letter</span>
                <span>03 / 04</span>
              </div>
              <article className="letter">
                <h2>To Florence,</h2>
                <div className="letter__body">
                  {letter.map((paragraph, index) => (
                    <p
                      className={
                        index === 1 || index === 16 ? "letter__emphasis" : ""
                      }
                      key={paragraph}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                <p className="signature">— Yusuff</p>
              </article>
            </section>

            <section className="closing reveal" id="closing">
              <GardenRoses closing />
              <div className="section-rule">
                <span>Last page</span>
                <span>04 / 04</span>
              </div>
              <div className="closing__message">
                <p>
                  That&apos;s everything I wanted to say, Florence. For now,
                  I&apos;ll let these words stand on their own. If we speak
                  again someday, I hope it can be from a better place.
                </p>
                <p>Take care.</p>
                <p className="signature">— Yusuff</p>
              </div>
            </section>
          </main>

        </>
      )}
    </div>
  )
}
