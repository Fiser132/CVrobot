import FinalCTA from '../components/landing-page/FinalCTA'
import Text from '../components/ui/text'
import OrangeLink from '../components/ui/orange-link'

const rows = Array(4).fill({
  poziadavka: '[Požiadavka na pracovnú pozíciu]',
  prax: '[Vaša prax]',
  obdobie: '[Časové obdobie]',
})

export default function MotivacneListyPage() {
  return (
    <div>
      <main className="bg-white text-black px-4 py-20 pb-44 flex flex-col gap-20 max-w-5xl mx-auto">
        <section>
          <Text size="xl" color="secondary" className="mb-4 font-dm-serif">
            Vzory motivačných listov
          </Text>
          <div className="flex flex-col gap-5">
            <Text>
              Ak si vytvoríte životopis podľa nejakého{' '}
              <OrangeLink href="#">vzoru životopisu</OrangeLink>, nájdeného napríklad na internete,
              potom nie je vôbec zlé ho doplniť o dokument motivačný list skôr, než svoje
              štruktúrované CV doručíte svojmu novému potenciálnemu zamestnávateľovi. Motivačnému
              listu sa tiež niekedy hovorí tzv. sprievodný list (vzor 2025 Nájdete nižšie), ale v
              podstate sa nejedná o nič iné, než o ten istý dokument.
            </Text>
            <Text>
              Nezabudnite na kreativitu, snažte sa, aby Váš motivačný list nebol samostatná kópia tu
              predložených vzorov. Snažte sa vzory si maximálne upraviť ku obrazu svojmu.{' '}
              <OrangeLink href="#">Ako napísať motivačný list</OrangeLink> Vám napovie pár vzorov
              sprievodných listov, ktorými sa môžete nechať krásne inšpirovať.
            </Text>
          </div>
        </section>

        {/* Pravidlá */}
        <section>
          <Text size="lg" color="secondary" className="mb-2">
            Pravidlá sprievodného listu
          </Text>
          <Text>
            Aj sprievodný či <strong>motivačný list vzor</strong> má svoje špecifiká a svoje
            pravidlá. <em>Pri písaní motivačného dopisu si dajte záležať</em> rovnako tak, ako na
            tvorbe životopisu. Sprievodný list je tiež dokument, podľa ktorého si na Vás nový
            zamestnávateľ môže urobiť nejaký prvotný názor...
          </Text>
        </section>

        {/* Vzor 1 */}
        <section>
          <Text size="lg" color="secondary" className="mb-2">
            Vzor motivačného listu číslo 1
          </Text>
          <div className="flex flex-col gap-5">
            <Text>Vážený [Meno príjemcu],</Text>
            <Text>máte záujem o pracovníka [názov pracovnej pozície] s:</Text>
            <ul className="list-disc list-inside space-y-2 text-[16px] marker:text-primary">
              <li>[počet rokov odpracovaných v odbore] rokmi praxe v [názov odbore]</li>
              <li>Znalosť najnovších technológií v [názov priemyselného odvetvia alebo odboru]</li>
              <li>Vynikajúcimi ústnymi a písomnými komunikačnými zručnosťami</li>
              <li>Schopnosťou učiť sa nové veci a zdokonaľovať svoje schopnosti</li>
              <li>
                Ak chcete zistiť, prečo tento{' '}
                <span className="text-orange-500 underline">motivačný list</span> zasielam práve do
                Vašej firmy? Čím ma zaujala Vaša spoločnosť?
              </li>
            </ul>
            <Text>
              Ak áno, prečítajte si, prosím, môj priložený životopis a presvedčte sa, že spĺňam
              všetky vyššie uvedené požiadavky.
            </Text>
            <Text>
              Uvítal by som možnosť stretnutia s Vami na ďalšiu diskusiu o možnostiach zamestnania v
              [Názov spoločnosti]. Ak budete chcieť navrhnúť termín schôdzky, kontaktujte ma,
              prosím, telefonicky na čísle [vaše telefónne číslo]. Ďalej vo svojom motivačnom liste
              uvádzam, že som na spomínanom tel. čísle zastihnuteľný od [najskôr] do [najneskôr], v
              ktorúkoľvek hodinu mi však môžete zanechať odkaz a ja Vás budem telefonicky
              kontaktovať.
            </Text>
            <Text>
              Ďakujem, že ste si urobil čas na prečítanie môjho Curriculum Vitae. Teším sa na
              rozhovor s Vami.
            </Text>
            <Text>
              S pozdravom
              <br />
              [Vaše meno] <br />
              Príloha
            </Text>
          </div>
        </section>

        {/* Vzor 2 */}
        <section>
          <Text size="lg" color="secondary" className="mb-2">
            Ďalšie príklad dobrého motivačného listu, číslo 2
          </Text>
          <div className="flex flex-col gap-5">
            <Text>Vážený [Meno príjemcu],</Text>
            <Text>
              pracujem ako [názov pracovnej pozície] po dobu viac než [počet rokov praxe] a preto
              som ideálnym kandidátom na pracovnú pozíciu, ktorú ste inzerovali v [umiestnení
              inzeráte].
            </Text>
            <div className="overflow-x-auto rounded-md shadow-sm border border-gray-200">
              <table className="min-w-full table-fixed border-collapse">
                <thead>
                  <tr className="bg-secondary text-white">
                    <th className="text-left px-4 py-3 font-medium">Požiadavky</th>
                    <th className="text-left px-4 py-3 font-medium">Moje praxe</th>
                    <th className="text-left px-4 py-3 font-medium">V rokoch</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={i} className="border-t border-gray-200 even:bg-gray-50 odd:bg-white">
                      <td className="px-4 py-3 text-sm">- {row.poziadavka}</td>
                      <td className="px-4 py-3 text-sm">- {row.prax}</td>
                      <td className="px-4 py-3 text-sm">- {row.obdobie}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Text>
              Na základe žiadosti vo Vašom inzeráte a tiež na základe odporúčaní v návode{' '}
              <OrangeLink href="#">ako napísať životopis</OrangeLink> uvádzam v tejto odpovedi moju
              predstavu o výške platu. Pohybuje sa v rozsahu od [najnižšej platový požiadavku] EUR
              do [najvyššej platový požiadavka] Sk a závisí na rôznych faktoroch, ako je napríklad
              miera zodpovednosti u daného pracovného miesta a ďalšie poskytované výhody.
            </Text>
            <Text>
              Uvítal by som možnosť stretnutia s Vami na ďalšiu diskusiu nad mojimi schopnosťami a
              týmto pracovným miestom. Ak máte akékoľvek otázky nezodpovedané v tomto motivačnom
              liste alebo ak budete chcieť navrhnúť termín schôdzky, kontaktujte ma prosím
              telefonicky na čísle [telefónne číslo] alebo e-mailom na adrese [e-mailová adresa]. K
              listu je priložený môj <OrangeLink href="#">profesijný životopis</OrangeLink>. Teším
              sa na Vašu odpoveď.
            </Text>
            <Text>
              S pozdravom
              <br />
              [Vaše meno] <br />
              Príloha
            </Text>
          </div>
        </section>

        {/* Vzor 3 */}
        <section>
          <Text size="lg" color="secondary" className="mb-2">
            Iný sprievodný list, vzor číslo 3
          </Text>
          <div className="flex flex-col gap-5">
            <Text>Vážený [Meno príjemcu],</Text>
            <Text>
              Odpovedám na Váš inzerát v novinách z 10. januára s ponukou voľného pracovného miesta
              obchodného zástupcu. Zasielam Vám tento motivačný list, pretože som presvedčený, že
              mám Vašej firme čo ponúknuť, hlavne vďaka piatim rokom obchodných skúseností.
            </Text>
            <Text>Tu sú niektoré moje konkrétne úspechy:</Text>
            <ul className="list-disc list-inside space-y-2 text-[16px] marker:text-primary">
              <li>
                Vďaka trvalému úsiliu a prvotriednym službám sa klientská základňa rozšírila o 40
                percent.
              </li>
              <li>Deväťdesiat percent klientov obnovovalo ročné zmluvy.</li>
              <li>Mám skúsenosti s cestovaním po veľkom území a s hospodárením s časom.</li>
            </ul>
            <Text>
              Potrebujete takú osobu? Ak áno, teším sa na ďalšie rokovania. V prílohe posielam mimo
              tohto motivačného listu k nahliadnutiu ešte aj svoj{' '}
              <OrangeLink href="#">štruktúrovaný životopis vzor</OrangeLink>. Teším sa na skorú
              odpoveď.
            </Text>
            <Text>
              S pozdravom
              <br />
              [Vaše meno] <br />
              Príloha
            </Text>
          </div>
        </section>

        <section>
          <Text size="lg" color="secondary" className="mb-2">
            Posledná vzorový list s platovými požiadavkami číslo 4
          </Text>
          <div className="flex flex-col gap-5">
            <Text>Vážený [Meno príjemcu],</Text>
            <Text>
              Pracujem ako [Názov pracovnej pozície] po dobu viac než [počet rokov praxe] a preto
              som ideálnym kandidátom na pracovnú pozíciu, ktorú ste inzerovali v [umiestnení
              inzeráte].
            </Text>
            <Text>
              Nižšie, v tomto sprievodnom, alebo ak chcete motivačnom liste uvádzam stručné
              porovnanie mojej doterajšej praxe s vašimi požiadavkami.
            </Text>
            <div className="overflow-x-auto rounded-md shadow-sm border border-gray-200">
              <table className="min-w-full table-fixed border-collapse">
                <thead>
                  <tr className="bg-secondary text-white">
                    <th className="text-left px-4 py-3 font-medium">Požiadavky</th>
                    <th className="text-left px-4 py-3 font-medium">Moje praxe</th>
                    <th className="text-left px-4 py-3 font-medium">V rokoch</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={i} className="border-t border-gray-200 even:bg-gray-50 odd:bg-white">
                      <td className="px-4 py-3 text-sm">- {row.poziadavka}</td>
                      <td className="px-4 py-3 text-sm">- {row.prax}</td>
                      <td className="px-4 py-3 text-sm">- {row.obdobie}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Text>
              Na základe žiadosti vo Vašom inzeráte uvádzam v tomto motivačnom liste moju predstavu
              o výške platu. Pohybuje sa v rozsahu od [najnižšej platový požiadavku] EUR do
              [najvyššej platový požiadavka] € a závisí na rôznych faktoroch, ako je napríklad miera
              zodpovednosti u daného pracovného miesta a ďalšie poskytované výhody.
            </Text>
            <Text>
              Uvítal by som možnosť stretnutia s Vami na ďalšiu diskusiu nad mojimi schopnosťami a
              týmto pracovným miestom. Ak máte akékoľvek otázky alebo ak budete chcieť navrhnúť
              termín schôdzky, kontaktujte ma prosím telefonicky na čísle [vaše telefónne číslo]
              alebo e-mailom na adrese [vaše e-mailová adresa]. K listu je priložený môj{' '}
              <OrangeLink href="#">životopis formulár</OrangeLink>. Teším sa na Vašu odpoveď.
            </Text>
            <Text>
              S pozdravom
              <br />
              [Vaše meno] <br />
              Príloha
            </Text>
          </div>
        </section>
      </main>
      <FinalCTA />
    </div>
  )
}
