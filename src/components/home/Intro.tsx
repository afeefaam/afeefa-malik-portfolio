import { hero } from '../../data/siteContent'
import { Bounded } from './Bounded'
import nameGraphic from '../../assets/images/afeefa-malik-name-pink.png'
import polaroidPhoto from '../../assets/images/polaroid.png'

/**
 * Intro — the name-and-portrait block directly under the floral hero.
 * Both the "Afeefa Malik" wordmark and the portrait are real image assets
 * (not recreated in text/CSS): the hand-lettered name graphic (pink
 * variant) pairs with the intro paragraph in one column, set against the
 * polaroid photo, top-aligned so the photo reads level with the name
 * rather than the paragraph. On mobile everything stacks: name → polaroid
 * → paragraph.
 */
export function Intro() {
  return (
    <section id="top" className="relative z-10 -mt-4 rounded-t-[28px] bg-card pb-6 pt-10 sm:-mt-7 sm:pb-8 sm:pt-14">
      <Bounded>
        <div className="hero-grid grid items-start justify-items-center gap-x-14 gap-y-5 sm:gap-y-7 lg:justify-items-start lg:gap-x-16 xl:gap-x-24">
          <div style={{ gridArea: 'name' }}>
            <img
              src={nameGraphic}
              alt="Afeefa Malik"
              className="h-auto w-[clamp(220px,72vw,300px)] sm:w-[clamp(300px,50vw,380px)] lg:w-[clamp(400px,34vw,480px)]"
            />
          </div>

          <div style={{ gridArea: 'photo' }}>
            <img
              src={polaroidPhoto}
              alt="Polaroid-style portrait of Afeefa Malik"
              className="h-auto w-[clamp(170px,50vw,220px)] sm:w-[clamp(200px,34vw,270px)] lg:w-[clamp(280px,23vw,350px)]"
            />
          </div>

          <div style={{ gridArea: 'text' }} className="max-w-md text-center lg:text-left">
            <p className="text-[1.0625rem] leading-relaxed text-graphite">{hero.subhead}</p>
          </div>
        </div>
      </Bounded>
    </section>
  )
}
