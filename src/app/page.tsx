
import Hero from "./components/landing-page/Hero"
import Steps from "./components/landing-page/Steps"
import Motivation from "./components/landing-page/Motivation"
import Info from "./components/landing-page/Info"
import Blog from "./components/landing-page//Blog"
import FAQ from "./components/landing-page/FAQ"
import FinalCTA from "./components/landing-page/FinalCTA"


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Hero />
      <Steps />
      <Motivation />
      <Info />
      <Blog />
      <FAQ />
      <FinalCTA />
    </div>
  )
}
