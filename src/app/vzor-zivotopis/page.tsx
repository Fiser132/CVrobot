import FinalCTA from '../components/landing-page/FinalCTA'

export default function VzorZivotopisPage() {
  return (
    <div>
      <main className="bg-white text-black px-4 py-20 pb-44 space-y-20 max-w-5xl mx-auto leading-relaxed">
        {/* Úvod */}
        <section>
          <h1 className="text-[32px] sm:text-[42px] lg:text-[56px] text-blue-700 font-dm-serif mb-4">
            Vzor štruktúrovaného životopisu
          </h1>
          <p className="text-base sm:text-[16px]">
            Ako si podľa základnej osnovy vytvoriť vlastný štruktúrovaný{' '}
            <a href="#" className="text-blue-600 underline">
              vzor životopisu
            </a>{' '}
            podľa požiadaviek, ktoré vyžaduje rok 2025? Štruktúrovaný životopis, ktorý sa môžete
            pokúsiť vytvoriť napr. v programe Word, musí obsahovať niektoré dôležité informácie, bez
            ktorých sa tento kľúčový dokument rozhodne nezaobíde!
          </p>
        </section>

        {/* Sekcia – Ideálny životopis */}
        <section>
          <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-dm-serif text-secondary mb-4">
            Ideálne životopis má najčastejšie tieto časti:
          </h2>
          <div className="flex flex-col gap-5 sm:text-[16px]">
            Všetky uvedené časti štruktúrovaného životopisu by mali byť obsiahnuté vo Vašom
            dokumente. Ak už teda z nejakého dôvodu musíte štruktúrovaný životopis tvoriť ručne,
            skôr než nejaký poznámkový blok odporúčame aspoň program Word z balíka MS Office, ktorý
            Vám postráži preklepy a hrubky.{' '}
            <p>
              Predsa len pravdou zostáva, že vzorový štruktúrovaný životopis, Kór v roku 2025, musí
              byť dokument, ktorý bude absolútne dokonalý a bezchybný, pretože bude možno rozhodovať
              o Vašej budúcnosti. Bez preháňania môžeme dokonca povedať, že štruktúrovaný životopis
              naozaj patrí medzi životné dokumenty, ktoré môžu ovplyvniť Váš život po mnoho a mnoho
              budúcich rokov!
            </p>
          </div>
        </section>

        {/* Sections (reused and responsive) */}
        {[
          {
            title: '1. Osobné údaje',
            items: ['Meno', 'Adresa', 'Telefón', 'E-mail', 'Štátna príslušnosť', 'Dátum narodenia'],
          },
          {
            title: '2. Pracovné skúsenosti',
            items: [
              'Obdobie (od – do)',
              'Názov a adresa zamestnávateľa',
              'Oblasť podnikania alebo názov odvetvia',
              'Zastávaná pozícia',
              'Hlavná pracovná náplň a zodpovednosti',
            ],
          },
          {
            title: '3. Vzdelanie a kurzy',
            items: [
              'Obdobie (od – do)',
              'Názov a typ organizácie poskytujúcej vzdelanie alebo kurzy',
              'Hlavné predmety/praktické zručnosti',
              'Získaný titul',
              'Úroveň v národnej klasifikácii',
            ],
          },
          {
            title: '4. Osobné schopnosti a zručnosti',
            items: [
              'Materský jazyk',
              'Ostatné jazyky (úroveň – čítanie, písanie, hovorený prejav)',
              'Sociálne schopnosti a zručnosti',
              'Organizačné schopnosti a zručnosti',
              'Technické schopnosti a zručnosti',
              'Umelecké schopnosti a zručnosti',
              'Iné schopnosti a zručnosti',
              <>
                Vodičský preukaz / preukazy –{' '}
                <a href="#" className=" underline">
                  v štruktúrovanom životopise
                </a>
              </>,
            ],
          },
        ].map((section, index) => (
          <section key={index}>
            <h3 className="font-semibold text-[20px] sm:text-xl mb-2">{section.title}</h3>
            <ul className="list-disc list-inside space-y-2 text-[16px] marker:text-primary">
              {section.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>
        ))}

        {/* Doplňujúce info */}
        <section>
          <h3 className="font-bold text-lg sm:text-xl mb-2">Doplňujúce informácie</h3>
          <p className="text-base sm:text-[16px]">
            Tu do štruktúrovaného životopisu uveďte všetky ďalšie relevantné informácie, napr.
            kontaktné osoby, referencie a pod.
          </p>
        </section>

        {/* Prílohy */}
        <section>
          <h2 className="text-2xl sm:text-3xl lg:text-[36px] text-blue-700 font-dm-serif mb-2">
            Je možné aj prikladať prílohy?
          </h2>
          <p className="text-base sm:text-[16px]">
            Prílohy k štruktúrovanému životopisu samozrejme môžu byť priložené, ale ak dopĺňajú
            uvedené informácie. Môžu to byť napríklad rôzne skúšky, certifikáty, oprávnenia či
            absolvované kurzy, či už rekvalifikačné, alebo iné.
          </p>
        </section>

        {/* Záver */}
        <section>
          <h2 className="text-[32px] sm:text-[42px] lg:text-[56px] text-blue-700 font-dm-serif mb-2">
            No a ako teda štruktúrovaný životopis vidí profesionálna personálna agentúra?
          </h2>
          <div className="text-base sm:text-[16px] flex flex-col gap-5">
            Životopis, často spomínaný pod skratkou CV (curriculum vitae = beh života ), je v
            procese výberového konania chápaný ako opis profesijného života uchádzača, stručný výpis
            dosiahnutého vzdelania, pracovných skúseností a iných údajov, ktoré môžu výber nového
            zamestnanca výrazne ovplyvniť.
            <p>
              súčasnej dobe potom spravidla predstavuje prvý kontakt medzi uchádzačom o zamestnanie
              a potenciálnym zamestnávateľom. Napísať životopis nie je zložité, bohužiaľ rovnako tak
              nie je ťažké sa dopustiť úplne zbytočných chýb. To, ako má štruktúrovaný životopis
              vyzerať, čo v ňom uviesť a čoho sa naopak vyvarovať, môžete nájsť v článku Ako napísať
              životopis.
            </p>
            <p>
              {' '}
              Alebo si túto prácu ušetrite a jednoducho si životopis nechajte vygenerovať tu. Snáď
              všetci si spomíname na základnú školu, kedy pani učiteľku zaujímal predovšetkým náš
              slohový um, a tak sme sa učili písať klasický životopis. S hektickým životným štýlom a
              navyše v čase, keď sa o niektoré pozície hlási na desiatky záujemcov, však nastáva
              potreba šetriť čas a udržať personalistovu pozornosť. Preto, ak zamestnávateľ priamo
              netrvá na životopisu klasickom, čo sa v ojedinelých prípadoch môže stať, sa využíva
              bodového zoznamu stručných, ale jasných informácií štruktúrovaného životopisu.
            </p>
            <p>
              {' '}
              Štruktúrovaný životopis by nemal v žiadnom prípade presahovať dve strany o formátu A4,
              bohato stačí len jediná stránka. Tá by mala obsahovať podstatné a pre budúceho
              zamestnávateľa atraktívne informácie. Oveľa väčšiu šancu, že Váš životopis nezapadne
              medzi ostatnými, budete mať práve vtedy, ak uvediete niečo zaujímavého, nevšedného,
              nejakú svoju pridanú hodnotu. Podrobnejšie informácie potom môžete rozviesť v
              motivačnom liste a neskôr aj osobne na pohovore, ku ktorému Vás pozvú práve na základe
              dobre napísaného životopisu.
            </p>
          </div>
        </section>

        {[
          {
            title: 'Životopis se běžně dělí na 4 základní kategorie:',
            items: [
              'osobní údaje',
              'tedy jméno a příjmení',
              'dále kontaktní informace,vzdělání',
              'profesní historie,doplňující informace',
            ],
          },
        ].map((section, index) => (
          <section key={index}>
            <h3 className="font-semibold text-[20px] sm:text-xl mb-2">{section.title}</h3>
            <ul className="list-disc list-inside space-y-2 text-[16px] marker:text-primary">
              {section.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>
        ))}

        <section>
          <p className="text-base sm:text-[16px] space-y-4">
            Nezapomeňte, že informace, které uvedete, musí být za každých okolností pravdivé.
            Rozhodně se neuchylujte ke lži. V případě jejího odhalení byste totiž vystavili
            nepříjemné situaci nejen sebe, ale také zaměstnavatele, a výrazně si tím snížíte nebo
            úplně zmaříte šance na vysněnou práci.
          </p>
        </section>
      </main>

      <FinalCTA />
    </div>
  )
}
