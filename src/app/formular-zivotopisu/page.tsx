import FinalCTA from '../components/landing-page/FinalCTA'
import Text from '../components/ui/text'
import OrangeLink from '../components/ui/orange-link'

export default function VzorZivotopisPage() {
  return (
    <div>
      <main className="bg-white text-black px-4 py-20 pb-44 space-y-20 max-w-5xl mx-auto">
        {/* Úvod */}
        <section>
          <Text size="xl" color="secondary" className="font-dm-serif mb-4">
            Formulár životopisu na vyplnenie online
          </Text>
          <div className="flex flex-col gap-5">
            <Text>
              <OrangeLink href="#">Ukážkový životopis</OrangeLink> formulár, ktorý ovplyvní
              pozitívnym spôsobom Vašu budúcnosť, môžete nájsť nižšie na týchto stránkach. Stiahnuť
              do počítača si potom môžete formulár životopisu podľa vzoru roka 2025, Ktorý otvorte
              napríklad v programe Word, alebo OpenOffice. Hľadáte návod, ako si ho správne vytvoriť
              a napísať? Alebo hľadáte ako bez chýb{' '}
              <OrangeLink href="#">napísať motivačný list</OrangeLink>? Ak áno, tak ste tu správne a
              môžete čítať ďalej.
            </Text>
            <Text className="font-bold">
              Formulár životopisu je neuveriteľne dôležitý dokument, ktorý nie je dobré podceňovať!
            </Text>
            <Text>
              Hádam, že tým, že ste našli na Internete túto stránku, ste si toho plne vedomí. Možno
              ste práve nezamestnaní, alebo možno síce prácu máte, ale zle platenú, alebo Vás hnevá
              Váš šéf, alebo ste dostali výpoveď ... Nech je za tým akákoľvek príčina, je celkom
              jasné, že <OrangeLink href="#">príklad životopis</OrangeLink> formulára budete určite
              potrebovať skôr, či neskôr.
            </Text>
            <Text>
              <strong>DÔLEŽITÉ:</strong> Formulár životopisu môže byť pútavý a účinný, ale aj nudný
              a fádny. Dnešná doba je jednoducho taká, že sa všetko zrýchľuje, rastie a vyvíja. Kto
              nestačí udržiavať krok, ten stráca. Nezamestnanosť stále stúpa a konkurencia na poli
              uchádzačov o zamestnanie rastie. Ak predtým na každé pracovné miesto pripadalo v
              priemere 5 záujemcov,
              <strong> dnes už je to 10, 20 a pri niektorých profesiách až 50!</strong>
            </Text>
            <Text>
              A to je dôvod, prečo sa nároky na zamestnancov logicky zvyšujú a firmy si môžu
              vdnešních dobách veľa vyberať. Čítajte ďalej, ak chcete zistiť, ako uspieť!
            </Text>
          </div>
        </section>

        {/* Sekcia – Čo vyplniť */}
        <section>
          <Text size="lg" color="secondary" className="mb-2">
            Čo je dobré vyplňovať do životopisu?
          </Text>
          <Text>
            Bez životopis formulára, dnes ťažko uspieť. Nech pôjdete kamkoľvek žiadať o miesto,
            ťažko nájdete firmu, ktorá by po Vás formulár životopisu nechcela. Formulár{' '}
            <OrangeLink href="#">životopis vzor </OrangeLink>
            vlastne nie je nič iné, než kompletné prierez Vášho života, ktorý zachytáva nielen Vašej
            doterajšej praxi, ale aj najvyššie dosiahnuté vzdelanie.
          </Text>
        </section>

        <section>
          <Text size="md" className="font-semibold mb-2">
            Možné sekcie formulára životopisu, ktoré by mali byť obsiahnuté:
          </Text>
          <ul className="list-disc list-inside space-y-2 text-[16px] marker:text-primary">
            <li>Osobné údaje</li>
            <li>Prax</li>
            <li>Školy</li>
            <li>Jazykové zručnosti</li>
            <li>
              Koníčky do <OrangeLink href="#">formulára životopisu </OrangeLink> môžete tiež
              začleniť
            </li>
            <li>Certifikáty a kurzy</li>
            <li>Záľuby</li>
            <li>Foto</li>
          </ul>
        </section>

        {/* Sekcia – Foto v životopise */}
        <section>
          <div className="flex flex-col gap-5">
            <Text>
              V niektorých návodoch pre tvorbu životopis formulára sa uvádza odporúčanie, s ktorým
              nesúhlasím! A to je to, že nie je dobré do formulára{' '}
              <OrangeLink href="#">profesijného životopisu </OrangeLink> vkladať osobné fotografiu.
              Že vraj by Vás mohol zamestnávateľ vopred diskvalifikovať z nejakého dôvodu z
              výberového konania, bez toho aby si Vás pozval na osobné jednanie, čiže pohovor, kde
              budete mať možnosť bojovať pri preukazovaní svojich vedomostí atď ...
            </Text>
          </div>
        </section>

        {/* Sekcia – Foto dôveryhodnosť */}
        <section>
          <Text size="lg" color="secondary" className="mb-2">
            Životopis, resumé, alebo ak chcete CV je s fotografiou oveľa dôveryhodnejšie!
          </Text>
          <div className="flex flex-col gap-5">
            <Text>
              Neverte tomu, prosím. Je faktom, že personalista môže dosť dať aj na vizáž uchádzača,
              to je pravda. Ale to je predsa absolútne v poriadku. Ako majiteľa firmy, je predsa
              mojím výsostným právom, za svoje peniaze získať takého zamestnanca, ktorý bude nielen
              kvalitné, ale bude napr. pôsobiť aj na partnerov a dodávateľov spoločnosti príjemným
              dojmom.
            </Text>
          </div>
        </section>

        {/* Sekcia – Efektivita */}
        <section>
          <Text size="lg" color="secondary" className="mb-2">
            Ušetrite čas a robte veci efektívnejšie
          </Text>
          <div className="flex flex-col gap-5">
            <Text>
              Ušetríte tak i čas. Ak Vás chce zamestnávateľ vyradiť z výberu už na základe foto,
              ušetríte tak nielen čas, ale aj energiu pred absolvovaním osobného, ústneho pohovoru,
              na ktorý by ste museli zbytočné Vážiť cestu.
            </Text>
            <Text>
              Možno si budete hovoriť, že to nie je &quot;fér&quot;, ale ja konštatujem len fakty a
              je zbytočné riešiť niečo, čo nemôžete ovplyvniť.
            </Text>
            <Text>
              Pokračujte kliknutím na <OrangeLink href="#"> štruktúrovaný životopis </OrangeLink>{' '}
              formulár, ktorý sa Vám páči, spustí sa Vám sprievodca pre tvorbu{' '}
              <OrangeLink href="#"> šablóny životopisu </OrangeLink>.
            </Text>
          </div>
        </section>
      </main>

      <FinalCTA />
    </div>
  )
}
