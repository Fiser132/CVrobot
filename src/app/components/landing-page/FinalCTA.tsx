import PrimaryButton from '../ui/primary-button'
import Text from '../ui/text'

export default function FinalCTA() {
  return (
    <section className="relative px-4 min-h-[440px] md:min-h-[600px] flex justify-center items-center bg-gradient-to-br from-blue-700 to-purple-500 text-white text-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <img
          src="/Vector1.png"
          alt="Decorative background"
          className="absolute bottom-10 right-10 blur-2xl opacity-20"
        />
        <img
          src="/Vector2.png"
          alt="Decorative background"
          className="absolute blur-2xl -top-20 left-20 opacity-20"
        />
        <img
          src="/Vector3.png"
          alt="Decorative background"
          className="absolute blur-2xl left-30 -bottom-10 h-[600px] opacity-20"
        />
      </div>

      <img
        src="/shakinghands.png"
        alt="Shaking hands"
        className="absolute left-1/2 -translate-x-1/2 -top-30 md:-top-35 xl:-top-60 h-[250px] md:h-[350px] xl:h-[510px] xl:left-[400px] z-30"
      />

      <div className="flex flex-col gap-10 sm:gap-16 items-center max-w-4xl z-30">
        <Text size='xxl' color='white'>
        Napsat životopis s CVrobot nebylo jednodušší.
        </Text>
        <PrimaryButton size="xxl">
  CHCI VYTVOŘIT ŽIVOTOPIS
</PrimaryButton>
      </div>
    </section>
  )
}
