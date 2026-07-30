"use client"

import { useState, useEffect } from "react"

const DAYS = [
  { day: "Monday", label: "The Scene" },
  { day: "Tuesday", label: "The Evidence" },
  { day: "Wednesday", label: "The Suspects" },
  { day: "Thursday", label: "The Twist" },
  { day: "Friday", label: "The Verdict" },
]

const UPCOMING = [
  {
    caseNumber: "Case #002",
    title: "The Deadliest Race in History",
    series: "Le Mans · 1955",
    teaser:
      "Le Mans 1955 killed 84 people — the worst accident in motorsport history. Mercedes withdrew from racing entirely. Were they pressured to?",
  },
  {
    caseNumber: "Case #003",
    title: "Renault's Deliberate Crash",
    series: "F1 · 2008",
    teaser:
      "A driver was ordered to crash his own car to fix a race for his teammate. How long did Renault get away with it — and who finally talked?",
  },
  {
    caseNumber: "Case #004",
    title: "Was It Fixed?",
    series: "F1 · 1994",
    teaser:
      "The championship battle that ended in a collision. Decades on, some still believe it wasn't an accident at all.",
  },
  {
    caseNumber: "Case #005",
    title: "The Race That Broke Formula One",
    series: "F1 · 2021",
    teaser:
      "One late-race decision changed a championship and split the sport in two. What really happened in race control?",
  },
  {
    caseNumber: "Case #006",
    title: "The Posthumous Champion",
    series: "F1 · 1970",
    teaser:
      "The only driver ever crowned world champion after his own death. What actually happened at Monza — and why did it take so long to explain?",
  },
  {
    caseNumber: "Case #007",
    title: "The Inferno at the 'Ring",
    series: "F1 · 1976",
    teaser:
      "A fire that should have killed him, a barrier that should never have failed, and a comeback six weeks later that still defies belief.",
  },
  {
    caseNumber: "Case #008",
    title: "The Fastest Car Nobody Could Explain",
    series: "F1 · 2009",
    teaser:
      "A team built from the wreckage of a collapsed manufacturer somehow won on debut. Rivals cried foul for a year. Were they right?",
  },
  {
    caseNumber: "Case #009",
    title: "The Finish Line Photograph",
    series: "Le Mans · 1966",
    teaser:
      "One manufacturer orchestrated the perfect podium finish — then the photograph revealed something that changed the result forever.",
  },
  {
    caseNumber: "Case #010",
    title: "The Helicopter That Never Landed",
    series: "Rally · 2007",
    teaser:
      "A champion, his family, and a young boy vanish on a quiet afternoon. The investigation that followed asked questions rallying still hasn't answered.",
  },
  {
    caseNumber: "Case #011",
    title: "The Tyre That Ended a Career",
    series: "NASCAR · 2001",
    teaser:
      "A safety device sat unused in the garage on the day it might have saved a legend. Why wasn't it fitted — and who decided that?",
  },
]

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [theme, setTheme] = useState("light")
  const [modalType, setModalType] = useState(null) // null | 'share' | 'subscribe'
  const [email, setEmail] = useState("")
  const [subscribeStatus, setSubscribeStatus] = useState("idle") // idle | loading | success | error
  const [copied, setCopied] = useState(false)
  const isLocked = activeIndex !== 0 && activeIndex !== 5

  useEffect(() => {
    const stored = window.localStorage.getItem("arcfive-theme")
    if (stored) {
      setTheme(stored)
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    window.localStorage.setItem("arcfive-theme", theme)
  }, [theme])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeModal()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"))
  }

  const changeTab = (index) => {
    const selectedDay = index === 5 ? "Coming Up" : DAYS[index]?.day

    if (typeof window !== "undefined" && window.gtag && selectedDay) {
      window.gtag?.("event", "daynav_click", {
        day: selectedDay,
      })
    }

    if (index === 4) {
      setModalType("subscribe")
    }

    setActiveIndex(index)
  }

  const openModal = () => {
    if (isLocked && activeIndex !== 5) {
      setModalType("share")
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag?.("event", "modal_click", {
          modal: "share",
        })
      }
    } else {
      setModalType("subscribe")
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag?.("event", "modal_click", {
          modal: "subscribe",
        })
      }
    }
  }

  const closeModal = () => {
    setModalType(null)
    setCopied(false)
    setSubscribeStatus("idle")
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      // clipboard unavailable — fail silently, link is still visible to select manually
    }
  }

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email || subscribeStatus === "loading") return
    setSubscribeStatus("loading")

    try {
      const formData = new URLSearchParams()
      formData.append("form-name", "subscribe")
      formData.append("email", email)

      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      })

      if (res.ok) {
        setSubscribeStatus("success")
        setEmail("")
      } else {
        setSubscribeStatus("error")
      }
    } catch (err) {
      setSubscribeStatus("error")
    }
  }

  const [shareUrl, setShareUrl] = useState("https://thearcfive.com")
  const shareText =
    "The stories motorsport never fully explained — worth a read:"

  useEffect(() => {
    setShareUrl(window.location.href)
  }, [])

  return (
    <>
      {/* ── HEADER ── */}
      <header className="header">
        <div className="logo">
          <span className="logoArc">Arc</span>
          <span className="logoFive">Five</span>
        </div>
        <div className="headerRight">
          <span className="badge">Case #001 · Motorsport Edition</span>
          <button
            className="themeToggle"
            onClick={toggleTheme}
            aria-label="Toggle light and dark theme"
          >
            {theme === "dark" ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <line x1="12" y1="2" x2="12" y2="4" />
                <line x1="12" y1="20" x2="12" y2="22" />
                <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
                <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
                <line x1="2" y1="12" x2="4" y2="12" />
                <line x1="20" y1="12" x2="22" y2="12" />
                <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
                <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* ── INTRO ── */}
      <section className="intro">
        <h2 className="introTitle">
          Five days. One story. The truth behind the headlines.
        </h2>
        <p className="introText">
          Every week, The ArcFive investigates one unresolved moment in
          motorsport history — a crash, a scandal, a decision nobody can fully
          explain. Delivered straight to your inbox each morning, in time for
          your commute. Monday sets the scene. Friday delivers the verdict. In
          between, the evidence.
        </p>
      </section>

      {/* ── DAY NAV ── */}
      <nav className="dayNav">
        {DAYS.map((d, i) => (
          <button
            key={d.day}
            className={`tab ${i === activeIndex ? "tabActive" : ""}`}
            onClick={() => changeTab(i)}
          >
            {d.day} · {d.label}
          </button>
        ))}
        <button
          className={`tab ${activeIndex === 5 ? "tabActive" : ""}`}
          onClick={() => changeTab(5)}
        >
          Coming Up
        </button>
      </nav>

      {/* ── MONDAY ── */}
      {activeIndex === 0 && (
        <section className="panel">
          <div className="dayLabel">Monday — The Scene</div>
          <h1 className="subject">The Last Corner</h1>
          <p className="subtitle">
            Imola, Italy. 1st May, 1994. The day Formula One lost its greatest
            driver — and started asking questions it has never fully answered.
          </p>
          <div className="meta">
            <span>Case #001</span>
            <span>Reading time: 4 min</span>
            <span>Era: 1994</span>
          </div>

          <div className="body">
            <p>
              It is 2:17pm on a Sunday afternoon in the Emilia-Romagna region of
              northern Italy. The San Marino Grand Prix is on lap seven. The
              safety car has just pulled in. The race is about to restart.
            </p>

            <p>
              Leading the field is <strong>Ayrton Senna</strong> — three-time
              world champion, the fastest driver Formula One had ever seen, a
              man so dominant that rivals spoke about him with something close
              to reverence. Behind him is Michael Schumacher, the young German
              who had spent the season challenging that dominance for the first
              time.
            </p>

            <p>
              The cars accelerate through the first sector. Senna builds a small
              gap. They reach the Tamburello corner — a long, sweeping
              left-hander that drivers had taken flat out for years. At 190mph,
              Senna&apos;s Williams FW16 drifts wide. It doesn&apos;t correct.
              It continues straight on, off the track, across a strip of grass,
              and into a concrete retaining wall at full speed.
            </p>

            <p>
              The car disintegrates. A piece of debris — later identified as
              part of the suspension — strikes Senna&apos;s helmet. He is
              motionless in the cockpit.
            </p>

            <blockquote className="pullQuote">
              <p>
                &ldquo;He was the most complete driver I ever saw. When he
                arrived at a circuit, the whole atmosphere changed.&rdquo;
              </p>
              <cite>Frank Williams, Team Principal, Williams F1</cite>
            </blockquote>

            <p>
              Ayrton Senna was airlifted to the Maggiore Hospital in Bologna. At
              6:40pm that evening, he was declared dead. He was 34 years old.
            </p>

            <p>
              The official cause of death was a penetrating head injury caused
              by the suspension fragment. But the question that haunted Formula
              One for the decade that followed was a different one entirely.
            </p>

            <p>
              <strong>Why did the car leave the track?</strong>
            </p>

            <p>
              Tamburello was not a corner that caused accidents. Senna had
              driven through it hundreds of times. The conditions were dry, the
              circuit was clear. There was no collision, no debris on the road,
              no obvious mechanical drama visible on television footage. The
              Williams simply went straight on.
            </p>

            <div className="factBox">
              <div className="factBoxTitle">The Weekend Before the Crash</div>
              <ul>
                <li>
                  Thursday: Roland Ratzenberger killed in qualifying — the first
                  F1 death since 1982
                </li>
                <li>
                  Friday: Rubens Barrichello suffers a terrifying accident in
                  practice, hospitalised
                </li>
                <li>
                  Saturday: Ratzenberger&apos;s death confirmed. Senna visits
                  the scene, visibly shaken
                </li>
                <li>
                  Saturday: Senna reportedly tells his girlfriend he has a
                  &quot;very bad feeling&quot; about the race
                </li>
                <li>
                  Sunday: Lap 1 — JJ Lehto and Pedro Lamy collide on the start,
                  debris in the crowd
                </li>
                <li>
                  Sunday: Safety car deployed. Senna leads the restart. Lap 7.
                  Tamburello.
                </li>
              </ul>
            </div>

            <p>
              In the years that followed, three competing explanations emerged.
              Each has serious people behind it. Each has serious problems with
              it. And three decades later, no single account has been
              universally accepted.
            </p>

            <div className="hook">
              <strong>Tomorrow on The ArcFive</strong>
              Inside the wreckage, investigators found something that
              shouldn&apos;t have been there. A piece of modified steering
              column — cut, welded, and never declared to the FIA. Williams said
              it was a routine repair. Others said it was the cause of
              everything.
            </div>
          </div>
        </section>
      )}

      {/* ── TUESDAY ── */}
      {activeIndex === 1 && (
        <section className="panel">
          <div className="dayLabel">Tuesday — The Evidence</div>
          <h1 className="subject">The Modified Column</h1>
          <p className="subtitle">
            When investigators examined the wreckage of Senna&apos;s Williams,
            they found a steering column that had been cut and welded. What
            followed was one of the most controversial legal cases in motorsport
            history.
          </p>
          <div className="meta">
            <span>Case #001</span>
            <span>Reading time: 4 min</span>
            <span>Era: 1994</span>
          </div>

          <div className="body">
            <p>
              In the days after the crash, Italian authorities opened a criminal
              investigation. The wreckage of the Williams FW16 was seized as
              evidence. Engineers, accident reconstructionists, and prosecutors
              picked through every component.
            </p>

            <p>
              What they found in the steering column stopped the investigation
              cold.
            </p>

            <p>
              The column had been <strong>cut and re-welded</strong> — a
              modification made, it later emerged, between qualifying and the
              race. Senna had complained throughout the 1994 season that the
              Williams cockpit was too wide for him.
            </p>

            <p>
              This modification had not been declared to the FIA. Under the
              regulations, any significant change to a car&apos;s
              safety-critical components required sign-off.
            </p>

            <blockquote className="pullQuote">
              <p>
                &ldquo;The weld was the weakest point in the column. Under the
                loads experienced at Tamburello, it was entirely possible that
                it failed.&rdquo;
              </p>
              <cite>
                Evidence submitted during the Imola criminal trial, 1997
              </cite>
            </blockquote>

            <p>
              Williams disputed this fiercely. Their engineers argued the damage
              was consistent with <em>impact</em> damage, not a pre-crash
              failure. They produced telemetry data suggesting Senna had made a
              steering input in the final milliseconds.
            </p>

            <div className="factBox">
              <div className="factBoxTitle">What The Telemetry Showed</div>
              <ul>
                <li>
                  Senna&apos;s car was travelling at approximately 193mph as it
                  approached Tamburello
                </li>
                <li>
                  No brake application was recorded before the car left the
                  track
                </li>
                <li>
                  A small steering input was recorded — but its timing and cause
                  remain disputed
                </li>
                <li>
                  Engine telemetry showed a sudden drop in throttle as the car
                  hit the wall
                </li>
                <li>Tyre data appeared normal — no blowout recorded</li>
              </ul>
            </div>

            <p>
              Frank Williams, Adrian Newey, and four others were charged with
              manslaughter. The trial ran for years. And the verdict, when it
              came, satisfied almost nobody.
            </p>

            <div className="hook">
              <strong>Tomorrow on The ArcFive</strong>
              One theory points to the steering column. Another points to a
              tyre. A third — the most controversial — suggests the crash was
              caused by a regulation change the FIA introduced that very season.
            </div>
          </div>
        </section>
      )}

      {/* ── WEDNESDAY ── */}
      {activeIndex === 2 && (
        <section className="panel">
          <div className="dayLabel">Wednesday — The Suspects</div>
          <h1 className="subject">Three Theories, No Consensus</h1>
          <p className="subtitle">
            A flawed steering column. An under-inflated tyre. A regulation
            change that made the cars undriveable. Three decades on, serious
            people still disagree about what killed Ayrton Senna.
          </p>
          <div className="meta">
            <span>Case #001</span>
            <span>Reading time: 5 min</span>
            <span>Era: 1994</span>
          </div>

          <div className="body">
            <p>
              Every major accident in motorsport eventually produces a consensus
              — a single explanation that becomes the accepted truth. Tamburello
              never did.
            </p>

            <p>
              <strong>Theory One: The Steering Column.</strong> The modification
              created a structural weak point. Under the cornering loads at
              Tamburello, the weld failed. Senna lost steering. At 190mph, there
              was nothing he could do.
            </p>

            <p>
              <strong>Theory Two: Tyre Pressure.</strong> During the safety car
              period, Senna&apos;s tyres cooled below their optimal operating
              temperature. The right-front tyre may have deflected or partially
              failed under load.
            </p>

            <blockquote className="pullQuote">
              <p>
                &ldquo;The 1994 cars were a disaster waiting to happen. We had
                removed the electronics that made them manageable, and nobody
                truly understood what we had done.&rdquo;
              </p>
              <cite>
                Senior F1 engineer, speaking anonymously to biographer
              </cite>
            </blockquote>

            <p>
              <strong>Theory Three: The Regulation Change.</strong> In 1994,
              Formula One banned active suspension, traction control, and
              anti-lock brakes. The Williams FW16 had been designed around
              active suspension. Senna found the redesigned car deeply
              unsettling from his very first test.
            </p>

            <div className="factBox">
              <div className="factBoxTitle">Senna on the Williams FW16</div>
              <ul>
                <li>
                  Senna tested the FW16 at Silverstone in early 1994 and
                  reportedly hated it immediately
                </li>
                <li>
                  He told engineers the car was &quot;nervous&quot; and
                  &quot;unpredictable&quot; at high speed
                </li>
                <li>
                  He had retired from both previous races in 1994 — both from
                  the lead
                </li>
                <li>
                  His race engineer David Brown later said Senna seemed &quot;on
                  edge&quot; all weekend at Imola
                </li>
                <li>
                  Senna had discussed retirement with close friends in the weeks
                  before his death
                </li>
              </ul>
            </div>

            <p>The FIA has never acknowledged this.</p>

            <div className="pollBox">
              <div className="pollTitle">This Week&apos;s Poll</div>
              <div className="pollQuestion">
                What do you think caused Senna&apos;s crash at Tamburello?
              </div>
              <div className="pollOptions">
                <div className="pollOption">
                  The modified steering column failed
                </div>
                <div className="pollOption">
                  Tyre pressure after the safety car period
                </div>
                <div className="pollOption">
                  FIA regulation changes made the car unmanageable
                </div>
                <div className="pollOption">
                  A combination of factors — no single cause
                </div>
              </div>
              <p className="pollFootnote">Results revealed Friday.</p>
            </div>
          </div>
        </section>
      )}

      {/* ── THURSDAY ── */}
      {activeIndex === 3 && (
        <section className="panel">
          <div className="dayLabel">Thursday — The Twist</div>
          <h1 className="subject">The Evidence That Disappeared</h1>
          <p className="subtitle">
            The criminal trial produced acquittals. But what happened to the
            data recorder — and why did the FIA delay releasing critical
            telemetry — has never been fully explained.
          </p>
          <div className="meta">
            <span>Case #001</span>
            <span>Reading time: 4 min</span>
            <span>Era: 1994</span>
          </div>

          <div className="body">
            <p>
              By the time the Italian criminal trial concluded in 1997, three
              years had passed. Frank Williams, Patrick Head, Adrian Newey, and
              three others were charged with manslaughter by negligence.
            </p>

            <p>All were acquitted.</p>

            <p>
              The court found that the prosecution had not proven its case
              beyond reasonable doubt. The steering column modification could
              not be definitively linked to the crash.
            </p>

            <blockquote className="pullQuote">
              <p>
                &ldquo;There are aspects of what happened to the data from that
                weekend that I find deeply troubling, and I don&apos;t think
                they have ever been properly explained.&rdquo;
              </p>
              <cite>
                Professor Sid Watkins, FIA Medical Delegate, in his memoir
              </cite>
            </blockquote>

            <p>
              The Williams FW16 carried a data recorder — a black box logging
              telemetry from every sensor on the car. What happened to it next
              became one of the most contentious aspects of the entire case.
            </p>

            <div className="factBox">
              <div className="factBoxTitle">
                Unexplained Aspects of the Investigation
              </div>
              <ul>
                <li>
                  The data recorder&apos;s chain of custody was disputed between
                  Williams and Italian investigators
                </li>
                <li>
                  Trackside monitoring data for Tamburello was incomplete at the
                  critical moment
                </li>
                <li>
                  Adrian Newey initially left Italy after the crash and was
                  tried in absentia
                </li>
                <li>
                  The FIA&apos;s own internal investigation was never made fully
                  public
                </li>
                <li>
                  Key witness statements from Williams engineers were
                  contradicted by others
                </li>
              </ul>
            </div>

            <p>
              Adrian Newey has since spoken about the crash at length,
              expressing what he describes as personal guilt and uncertainty. He
              wrote that he has never been entirely sure what caused the
              accident.
            </p>

            <div className="hook">
              <strong>Tomorrow on The ArcFive</strong>
              Friday&apos;s verdict asks the question that underpins everything:
              does it matter, at this distance, that we don&apos;t know?
            </div>
          </div>
        </section>
      )}

      {/* ── FRIDAY ── */}
      {activeIndex === 4 && (
        <section className="panel">
          <div className="dayLabel">Friday — The Verdict</div>
          <h1 className="subject">
            What We Know. What We Don&apos;t. What Changed.
          </h1>
          <p className="subtitle">
            Thirty-two years on, no single cause has been universally accepted.
            But something extraordinary came out of Imola — and it may be the
            most important thing of all.
          </p>
          <div className="meta">
            <span>Case #001</span>
            <span>Reading time: 5 min</span>
            <span>Era: 1994</span>
          </div>

          <div className="body">
            <p>
              Here is what we know with certainty about the death of Ayrton
              Senna at Tamburello on 1st May, 1994.
            </p>

            <p>
              We know that his Williams FW16 left the track without braking. We
              know the steering column had been modified without FIA
              notification. We know the car had been difficult to drive all
              season. We know Italian courts acquitted all defendants.
            </p>

            <p>Here is what we do not know.</p>

            <p>
              We do not know whether the steering column failed before or during
              impact. We do not know whether tyre temperature played a decisive
              role. We do not know what Senna himself sensed in the final
              moments.
            </p>

            <blockquote className="pullQuote">
              <p>
                &ldquo;Ayrton&apos;s death changed everything. Not just in
                Formula One — in how all motorsport thought about safety. That
                is his final legacy.&rdquo;
              </p>
              <cite>Charlie Whiting, FIA Race Director, speaking in 2014</cite>
            </blockquote>

            <p>
              What followed Imola 1994 was the most comprehensive safety
              transformation in motorsport history. Tamburello itself was
              converted from a flat-out corner into a chicane. The HANS device
              became mandatory.
            </p>

            <p>
              Between 1994 and 2015, not a single driver died in a Formula One
              race. The safety culture that now defines Formula One was built,
              in large part, on the ruins of that weekend at Imola.
            </p>

            <div className="pollBox">
              <div className="pollTitle">Your Poll Results</div>
              <div className="pollOptions">
                <div className="pollOption">
                  <span>The modified steering column failed</span>
                  <span className="pollPercent">34%</span>
                </div>
                <div className="pollOption">
                  <span>Tyre pressure after the safety car period</span>
                  <span className="pollPercent">18%</span>
                </div>
                <div className="pollOption">
                  <span>FIA regulation changes made the car unmanageable</span>
                  <span className="pollPercent">21%</span>
                </div>
                <div className="pollOption">
                  <span>A combination of factors — no single cause</span>
                  <span className="pollPercent">27%</span>
                </div>
              </div>
            </div>

            <p>
              The plurality answer — a combination of factors — may be the most
              honest one available to us. Remove any one factor, and Senna may
              have driven through Tamburello as he had a hundred times before.
            </p>

            <p>
              The case remains open in the only court that matters now — the
              court of collective memory.
            </p>

            <hr className="divider" />
            <p className="nextTeaseLabel">Next Week on The ArcFive</p>
            <p className="nextTeaseText">
              The 1955 Le Mans disaster killed 84 people — the worst accident in
              motorsport history. Mercedes withdrew from racing entirely. But
              were they pressured to?
            </p>
          </div>
        </section>
      )}

      {/* ── COMING UP ── */}
      {activeIndex === 5 && (
        <section className="panel">
          <div className="dayLabel">Coming Up — Future Cases</div>
          <h1 className="subject">What&apos;s Next on The ArcFive</h1>
          <p className="subtitle">
            A look ahead at upcoming investigations. New cases land every Monday
            — register your interest so you never miss the opening chapter.
          </p>

          <div className="upcomingList">
            {UPCOMING.map((c) => (
              <div key={c.caseNumber} className="upcomingItem">
                <div className="upcomingMeta">
                  <span>{c.caseNumber}</span>
                  <span>{c.series}</span>
                </div>
                <h3 className="upcomingTitle">{c.title}</h3>
                <p className="upcomingTeaser">{c.teaser}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── SUBSCRIBE BAR ── */}
      <div className="subscribeBar">
        <p className="subscribeText">
          {activeIndex === 5 ? (
            <>
              <strong>New cases land every Monday.</strong> Register your
              interest so you never miss the opening chapter.
            </>
          ) : isLocked ? (
            <>
              <strong>Enjoying this case?</strong> Share it with another
              motorsport fan.
            </>
          ) : (
            <>
              <strong>You&apos;re reading the free Monday edition.</strong>{" "}
              Register your interest to be notified when new chapters unlock.
            </>
          )}
        </p>
        <button className="subscribeButton" onClick={openModal}>
          {isLocked && activeIndex !== 5
            ? "Share this case"
            : "Register your interest"}
        </button>
      </div>

      {/* ── MODAL ── */}
      {modalType && (
        <div className="modalOverlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modalClose"
              onClick={closeModal}
              aria-label="Close"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {modalType === "share" && (
              <>
                <p className="modalEyebrow">Share this case</p>
                <h3 className="modalTitle">
                  Send this to someone who&apos;d love it
                </h3>
                <p className="modalText">
                  Every share helps another motorsport fan find their way to
                  The&nbsp;ArcFive.
                </p>

                <div className="shareRow">
                  <a
                    className="shareButton"
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      shareText,
                    )}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    X / Twitter
                  </a>
                  <a
                    className="shareButton"
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                      shareText + " " + shareUrl,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                  <a
                    className="shareButton"
                    href={`https://www.reddit.com/submit?url=${encodeURIComponent(
                      shareUrl,
                    )}&title=${encodeURIComponent(shareText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Reddit
                  </a>
                  <a
                    className="shareButton"
                    href={`mailto:?subject=${encodeURIComponent(
                      "Worth a read",
                    )}&body=${encodeURIComponent(shareText + " " + shareUrl)}`}
                  >
                    Email
                  </a>
                </div>

                <div className="copyLinkRow">
                  <input
                    className="copyLinkInput"
                    value={shareUrl}
                    readOnly
                    onFocus={(e) => e.target.select()}
                  />
                  <button className="copyLinkButton" onClick={handleCopyLink}>
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              </>
            )}

            {modalType === "subscribe" && (
              <>
                <p className="modalEyebrow">Case #001 · Motorsport Edition</p>
                <h3 className="modalTitle">Register your interest</h3>
                <p className="modalText">
                  We&apos;re putting the finishing touches on The&nbsp;ArcFive.
                  Be first in line by joining our launch list.
                </p>
                <p className="modalText bold">
                  As a thank you for registering, you&apos;ll receive your first
                  8 weeks completely free.
                </p>

                {subscribeStatus === "success" ? (
                  <p className="modalSuccess">
                    You&apos;re on the list. We&apos;ll be in touch as soon as
                    we launch.
                  </p>
                ) : (
                  <form className="emailForm" onSubmit={handleSubscribe}>
                    <input
                      className="emailInput"
                      type="email"
                      placeholder="you@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button
                      className="emailSubmit"
                      type="submit"
                      disabled={subscribeStatus === "loading"}
                    >
                      {subscribeStatus === "loading" ? "Joining…" : "Register"}
                    </button>
                  </form>
                )}

                {subscribeStatus === "error" && (
                  <p className="modalError">
                    Something went wrong — mind trying again?
                  </p>
                )}

                <p className="modalNote">
                  Free to register. No commitment. We&apos;ll only email you
                  when we launch.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
