import FinalCTA from '../components/landing-page/FinalCTA'
import Text from '../components/ui/text'
import OrangeLink from '../components/ui/orange-link'

export default function VzorZivotopisPage() {
  return (
    <div>
      <main className="bg-white text-black px-4 py-20 pb-44 flex flex-col gap-20 max-w-5xl mx-auto">
        <section>
          <Text size="xl" color="secondary" className="mb-2">
            Vzor štruktúrovaného životopisu
          </Text>
          <Text>
            Ako si podľa základnej osnovy vytvoriť vlastný štruktúrovaný
            <OrangeLink href="#"> vzoru životopisu </OrangeLink>
            podľa požiadaviek, ktoré vyžaduje rok 2025? Štruktúrovaný životopis, ktorý sa môžete
            pokúsiť vytvoriť napr. v programe Word, musí obsahovať niektoré dôležité informácie, bez
            ktorých sa tento kľúčový dokument rozhodne nezaobíde!
          </Text>
        </section>

        <section>
          <Text size="lg" color="secondary" className="mb-2">
            Ideálne životopis má najčastejšie tieto časti:
          </Text>
          <div className="flex flex-col gap-5">
            <Text>
              Všetky uvedené časti štruktúrovaného životopisu by mali byť obsiahnuté vo Vašom
              dokumente. Ak už teda z nejakého dôvodu musíte štruktúrovaný životopis tvoriť ručne,
              skôr než nejaký poznámkový blok odporúčame aspoň program Word z balíka MS Office,
              ktorý Vám postráži preklepy a hrubky.
            </Text>
            <Text>
              Predsa len pravdou zostáva, že{' '}
              <OrangeLink href="#"> vzorový štruktúrovaný životopis</OrangeLink>, Kór v roku 2025,
              musí byť dokument, ktorý bude absolútne dokonalý a bezchybný, pretože bude možno
              rozhodovať o Vašej budúcnosti. Bez preháňania môžeme dokonca povedať, že štruktúrovaný
              životopis naozaj patrí medzi životné dokumenty, ktoré môžu ovplyvniť Váš život po
              mnoho a mnoho budúcich rokov!
            </Text>
          </div>
        </section>

        <section>
          <Text size="md" className="mb-2">
            1. Osobné údaje
          </Text>
          <ul className="list-disc list-inside space-y-2 text-[16px] marker:text-primary">
            <li>Meno</li>
            <li>Adresa</li>
            <li>Telefón</li>
            <li>E-mail</li>
            <li>Štátna príslušnosť</li>
            <li>Dátum narodenia</li>
          </ul>
        </section>

        <section>
          <Text size="md" className="mb-2">
            2. Pracovné skúsenosti
          </Text>
          <ul className="list-disc list-inside space-y-2 text-[16px] marker:text-primary">
            <li>Obdobie (od – do)</li>
            <li>Názov a adresa zamestnávateľa</li>
            <li>Oblasť podnikania alebo názov odvetvia</li>
            <li>Zastávaná pozícia</li>
            <li>Hlavná pracovná náplň a zodpovednosti</li>
          </ul>
        </section>

        <section>
          <Text size="md" className="mb-2">
            3. Vzdelanie a kurzy
          </Text>
          <ul className="list-disc list-inside space-y-2 text-[16px] marker:text-primary">
            <li>Obdobie (od – do)</li>
            <li>Názov a typ organizácie poskytujúcej vzdelanie alebo kurzy</li>
            <li>Hlavné predmety/praktické zručnosti</li>
            <li>Získaný titul</li>
            <li>Úroveň v národnej klasifikácii</li>
          </ul>
        </section>

        <section>
          <Text size="md" className="mb-2">
            4. Osobné schopnosti a zručnosti
          </Text>
          <ul className="list-disc list-inside space-y-2 text-[16px] marker:text-primary">
            <li>Materský jazyk</li>
            <li>Ostatné jazyky (úroveň – čítanie, písanie, hovorený prejav)</li>
            <li>Sociálne schopnosti a zručnosti</li>
            <li>Organizačné schopnosti a zručnosti</li>
            <li>Technické schopnosti a zručnosti</li>
            <li>Umelecké schopnosti a zručnosti</li>
            <li>Iné schopnosti a zručnosti</li>
            <li>
              Vodičský preukaz / preukazy vo
              <OrangeLink href="#"> strukturovavém životopisu</OrangeLink> tiež nesmie chýbať
            </li>
          </ul>
        </section>

        <section>
          <Text size="md" className="mb-2">
            5. Doplňujúce informácie
          </Text>
          <Text>
            Tu do štruktúrovaného životopisu uveďte všetky ďalšie relevantné informácie, napr.
            kontaktné osoby, referencie a pod.
          </Text>
        </section>

        <section>
          <Text size="lg" color="secondary" className="mb-2">
            Je možné aj prikladať prílohy?
          </Text>
          <Text>
            Prílohy k štruktúrovanému životopisu samozrejme môžu byť priložené, ale ak dopĺňajú
            uvedené informácie. Môžu to byť napríklad rôzne skúšky, certifikáty, oprávnenia či
            absolvované kurzy, či už rekvalifikačné, alebo iné.
          </Text>
        </section>

        {/* Záver */}
        <section>
          <Text size="xl" color="secondary" className="mb-2">
            No a ako teda štruktúrovaný životopis vidí profesionálna personálna agentúra?
          </Text>
          <div className="flex flex-col gap-5">
            <Text>
              Životopis, často spomínaný pod skratkou{' '}
              <OrangeLink href="#"> CV (curriculum vitae </OrangeLink> = beh života ), je v procese
              výberového konania chápaný ako opis profesijného života uchádzača, stručný výpis
              dosiahnutého vzdelania, pracovných skúseností a iných údajov, ktoré môžu výber nového
              zamestnanca výrazne ovplyvniť.
            </Text>
            <Text>
              Súčasnej dobe potom spravidla predstavuje prvý kontakt medzi uchádzačom o zamestnanie
              a potenciálnym zamestnávateľom. <OrangeLink href="#"> Napísať životopis</OrangeLink>{' '}
              nie je zložité, bohužiaľ rovnako tak nie je ťažké sa dopustiť úplne zbytočných chýb.
            </Text>
            <Text>
              To, ako má štruktúrovaný životopis vyzerať, čo v ňom uviesť a čoho sa naopak
              vyvarovať, môžete nájsť v článku{' '}
              <OrangeLink href="#"> Ako napísať životopis</OrangeLink>
              Alebo si túto prácu ušetrite a jednoducho si životopis nechajte{' '}
              <OrangeLink href="#"> vygenerovať tu</OrangeLink>.
            </Text>
            <Text>
              Snáď všetci si spomíname na základnú školu, kedy pani učiteľku zaujímal predovšetkým
              náš slohový um, a tak sme sa učili písať klasický životopis. S hektickým životným
              štýlom a navyše v čase, keď sa o niektoré pozície hlási na desiatky záujemcov, však
              nastáva potreba šetriť čas a udržať personalistovu pozornosť. Preto, ak zamestnávateľ
              priamo netrvá na životopisu klasickom, čo sa v ojedinelých prípadoch môže stať, sa
              využíva bodového zoznamu stručných, ale jasných informácií štruktúrovaného životopisu.
            </Text>
            <Text>
              Štruktúrovaný životopis by nemal v žiadnom prípade presahovať dve strany o formátu A4,
              bohato stačí len jediná stránka. Tá by mala obsahovať podstatné a pre budúceho
              zamestnávateľa atraktívne informácie. Oveľa väčšiu šancu, že Váš životopis nezapadne
              medzi ostatnými, budete mať práve vtedy, ak uvediete niečo zaujímavého, nevšedného,
              nejakú svoju pridanú hodnotu. Podrobnejšie informácie potom môžete rozviesť v
              <OrangeLink href="#"> motivačnom liste</OrangeLink> a neskôr aj osobne na pohovore, ku
              ktorému Vás pozvú práve na základe dobre napísaného životopisu.
            </Text>
          </div>
        </section>

        <section>
          <Text size="lg" color="secondary" className="mb-2">
            Životopis se běžně dělí na 4 základní kategorie:
          </Text>
          <ul className="list-disc list-inside space-y-2 text-[16px] marker:text-primary">
            <li>osobní údaje</li>
            <li>tedy jméno a příjmení</li>
            <li>dále kontaktní informace, vzdělání</li>
            <li>profesní historie, doplňující informace</li>
          </ul>
        </section>

        <section>
          <Text>
            Nezapomeňte, že informace, které uvedete, musí být za každých okolností pravdivé.
            Rozhodně se neuchylujte ke lži. V případě jejího odhalení byste totiž vystavili
            nepříjemné situaci nejen sebe, ale také zaměstnavatele, a výrazně si tím snížíte nebo
            úplně zmaříte šance na vysněnou práci.
          </Text>
        </section>
      </main>

      <FinalCTA />
    </div>
  )
}
