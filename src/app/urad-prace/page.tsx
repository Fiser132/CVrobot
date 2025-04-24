import FinalCTA from '../components/landing-page/FinalCTA'
import Text from '../components/ui/text'
import OrangeLink from '../components/ui/orange-link'

export default function VzorZivotopisPage() {
  return (
    <div>
      <main className="bg-white text-black px-4 py-20 pb-44 space-y-20 max-w-5xl mx-auto leading-relaxed">
        <section>
          <Text size="xl" color="secondary" className="font-dm-serif mb-4">
            O úrade práce
          </Text>
          <div className="flex flex-col gap-5">
            <Text>
              Úrad práce je inštitúcia, ktorá spadá pod{' '}
              <OrangeLink href="https://www.employment.gov.sk/sk/">
                Ministerstvo práce a sociálnych vecí.
              </OrangeLink>
            </Text>
            <Text>
              Ide o úrad, ktorý pre občanov vedené v evidencii uchádzačov o zamestnanie skrze svoje
              kontaktné pracoviská vykonáva službu jednak informačné a poradenskou a jednak
              sprostredkovateľskú.
            </Text>
            <Text>
              Na úrad práce v mieste svojho trvalého bydliska sa teda môžete obrátiť v prípade, že
              momentálne nemáte zamestnanie, nepodnikáte a neštudujete.
            </Text>
          </div>
        </section>

        <section>
          <Text size="md" className="font-semibold mb-2">
            Úrad práce
          </Text>
          <ul className="list-disc list-inside space-y-2 text-[16px] marker:text-primary">
            <li>za Vás uhradí sociálne a zdravotné poistenie</li>
            <li>
              bude s Vami konzultovať <OrangeLink href="#">Vaše hľadanie práce</OrangeLink>
            </li>
            <li>
              Niektoré evidovanej jedinca dokonca finančne podporí v nezamestnanosti (ak v
              posledných dvoch rokoch odpracovali aspoň 12 mesiacov), v sťažených podmienkach
              hľadaní zamestnania (absolventi bez skúseností, telesne zdravotne postihnutí, ...)
              alebo v začiatkoch podnikania.
            </li>
            <li>
              Tiež Vám poradí, ako na hľadanie postupovať,{' '}
              <OrangeLink href="#">ako napísať životopis</OrangeLink> či{' '}
              <OrangeLink href="#">ako napísať motivačný list</OrangeLink>.
            </li>
          </ul>
        </section>

        {/* Dlhšie odseky - úrad práce v praxi */}
        <section>
          <div className="flex flex-col gap-5">
            <Text>
              A taky pre Vás zariadi ďalšie veci, na oplátku za to, že sa Vy budete riadiť
              stanovenými pravidlami; teda chodiť na vopred určené konzultácie, hlásiť nekolidující
              zamestnanie (také, u ktorého Váš mesačný príjem nebude vyšší ako polovica minimálnej
              mzdy), neštudovať, nepodnikať, nepracovať ... Všetko ostatné sa dočítate na stránkach{' '}
              <OrangeLink href="https://www.employment.gov.sk/sk/">
                www.employment.gov.sk
              </OrangeLink>{' '}
              alebo Vám bude upresnené na kontaktnom pracovisku. Pri nedodržaní týchto pravidiel Vás
              za trest z úradu práce môžu vylúčiť.
            </Text>
            <Text>
              Všetko vyššie spomenuté je samozrejme popísané tak, ako by to v ideálnom prípade malo
              fungovať. Ale ...
            </Text>
            <Text>
              Ak chcete pomôcť s písaním životopisu a{' '}
              <OrangeLink href="#">motivačného listu</OrangeLink>, poradíme Vám, bez toho aby ste
              opustili pohodlie Vášho domova, a to priamo na našich stránkach v článku{' '}
              <OrangeLink href="#">Ako napísať životopis</OrangeLink> a{' '}
              <OrangeLink href="#">Ako napísať motivačný list</OrangeLink>. alebo si profesionálny
              životopis nechajte{' '}
              <OrangeLink href="#">vygenerovať jednoducho a rýchlo tu.</OrangeLink>
            </Text>
            <Text>
              V skutočnosti ale úrad práce bohužiaľ funguje skôr ako zhromaždisko ľudí, ktorí
              jednoducho a legálne využívajú systém, ktorý je k tomu svojím absurdným nastavením
              skôr alebo neskôr doženie.
            </Text>
            <Text>
              Tak napríklad: výška pomoci v nezamestnanosti v roku 2025 dosahuje prvé dva mesiace
              evidencie na 65% z čistého príjmu, ďalšie dva mesiace 50% a zvyšok 45%. Ak odídete bez
              vážneho dôvodu z práce sami, máte po celú dobu nárok na 45%. Dobou sa rozumie pre ľudí
              do 50 rokov 5 mesiacov, do 55 rokov 8 mesiacov a nad 55 rokov 11 mesiacov. Ak uvážime,
              že pomoc môže ísť do maximálnej výšky 14 281 korún mesačne, ukážme si, ako bude Vaša
              podpora vyzerať pri čistom plate 23 000 korún. Vo veku 40 rokov tak dostanete bez
              akejkoľvek práce (je dokonca podmienkou, že pri evidencii nesmiete pracovať!) za päť
              mesiacov dohromady krásnych 61 912 korún. Čo je síce menej ako pôvodných 115 000
              korún, ty si ale musíte zarobiť prácou. Keď navyše pripočítate uhradenej sociálne a
              zdravotné poistenie, zdalo by sa ako hriech tohto nevyužiť.
            </Text>
            <Text>
              Vlk, teda pracovný úrad, sa nažerie (zrejme dobrého pocitu, že podporuje ľudí v
              ťaživej životnej situácii) a koza, teda občan, nielenže zostane celá, naviac ale
              dostane za to, že 5 mesiacov nič nerobí, bohato zaplatené.
            </Text>
            <Text>
              Podobne to funguje u ostatných finančných podpôr. Podmienkou radu z nich totiž je, že
              na pracák strávite nepretržite vopred danú dobu, zvyčajne niekoľko mesiacov. Kto by si
              s takou hľadal prácu?
            </Text>
            <Text>
              O evidentné krivde voči ľuďom, ktorí sa dokážu znova zapojiť do pracovného procesu
              takmer po okamžite po strate predchádzajúceho zamestnania a nehodlajú tohto systému
              využívať, tak snáď nemá ani cenu hovoriť.
            </Text>
            <Text>
              Sprostredkovateľská činnosť pracovného úradu však taky nefunguje zrovna ukážkovo. Rad
              ľudí má bohužiaľ reálne takú skúsenosť, že okrem niekoľkých nezaujímavých inzerátov z
              nástenky v mieste úradu a konzultácie s častokrát veľmi neochotnú úradníčkou, táto
              služba nič moc neponúka. Ak máte skutočný záujem o to si prácu nájsť, nechajte sa
              radšej inšpirovať v článku <OrangeLink href="#">Ako hľadať prácu.</OrangeLink>
            </Text>
          </div>
        </section>
      </main>
      <FinalCTA />
    </div>
  )
}
