import Text from '../ui/text'

export default function Motivation() {
  return (
    <section className="bg-white py-10 px-4 lg:px-0">
      <div className=" mx-auto flex flex-col xl:flex-row gap-10 lg:gap-20 items-center">
        <img src="/girl.png" alt="Motivace" className="w-full max-w-[900px] h-auto object-cover" />

        <div className="max-w-full lg:max-w-[640px] px-4 flex flex-col gap-7">
          <Text size="xl" color="secondary">
            Nehledejte vzory. Vytvořte si CV sami.
          </Text>
          <Text>
            Již nemusíte na Seznamu, což je mimochodem stále nejpoužívanější český vyhledávač,
            hledat vzory životopisů ke stažení do Vašeho počítače. Proč? Jelikož si u nás můžete
            velmi rychle, jednoduše, bez chyb a elegantně, vytvořit svůj vlastní profesionální
            životopis dle aktuálního vzoru roku 2024. Použijte životopis vzor generátor Curriculum
            Vitae, jak se životopisu také někdy říká. U nás můžete totiž nalézt chytrý životopis
            formulář, který je mnohem jednodušší než např. tzv. Europass.
          </Text>
        </div>
      </div>
    </section>
  )
}
