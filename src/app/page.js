"use client"

import { useState } from "react"

const DAYS = [
  { day: "Monday", label: "The Scene" },
  { day: "Tuesday", label: "The Evidence" },
  { day: "Wednesday", label: "The Suspects" },
  { day: "Thursday", label: "The Twist" },
  { day: "Friday", label: "The Verdict" },
]

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0)
  const isLocked = activeIndex !== 0

  return (
    <>
      {/* ── HEADER ── */}
      <header className="header">
        <div className="logo">
          <span className="logoArc">Arc</span>
          <span className="logoFive">Five</span>
        </div>
        <span className="badge">Case #001 · Motorsport Edition</span>
      </header>

      {/* ── DAY NAV ── */}
      <nav className="dayNav">
        {DAYS.map((d, i) => (
          <button
            key={d.day}
            className={`tab ${i === activeIndex ? "tabActive" : ""}`}
            onClick={() => setActiveIndex(i)}
          >
            {d.day} · {d.label}
          </button>
        ))}
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
              <strong>Tomorrow on The Arc Five</strong>
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
              <strong>Tomorrow on The Arc Five</strong>
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
              <strong>Tomorrow on The Arc Five</strong>
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
            <p className="nextTeaseLabel">Next Week on The Arc Five</p>
            <p className="nextTeaseText">
              The 1955 Le Mans disaster killed 84 people — the worst accident in
              motorsport history. Mercedes withdrew from racing entirely. But
              were they pressured to?
            </p>
          </div>
        </section>
      )}

      {/* ── SUBSCRIBE BAR ── */}
      <div className="subscribeBar">
        <p className="subscribeText">
          {isLocked ? (
            <>Enjoying this case? Share it with another motorsport fan.</>
          ) : (
            <>
              <strong>You&apos;re reading the free Monday edition.</strong>{" "}
              Subscribe to unlock Tuesday–Friday every week.
            </>
          )}
        </p>
        <button className="subscribeButton">
          {isLocked ? "Share this case" : "Subscribe — £6/month"}
        </button>
      </div>
    </>
  )
}
