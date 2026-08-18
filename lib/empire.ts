// L'EMPIRE — la page de NOVA-AXE.
//
// Il l'a demandée le jour où il a levé les verrous et annoncé le changement de
// régime : plus de rêverie, plus de pensée positive, action massive, des blocs
// de six à huit heures devant ses deux moniteurs.
//
// C'est pour ça que cette page ne ressemble à aucune autre de l'app. Elle ne
// s'adresse pas à lui, elle ne rappelle rien, elle n'exige rien. Elle expose
// le projet — et rien d'autre.
//
// Quatre registres la tiennent, et ce sont ses quatre verbes. L'ordre n'est
// pas décoratif : on ne domine pas ce qu'on n'a pas bâti, on ne contrôle pas
// ce qu'on ne domine pas, et rien ne change tant qu'on ne contrôle rien.
//
// Client-safe.

export const EMPIRE_NOM = "NOVA-AXE";

export const EMPIRE_DOCTRINE =
  "On ne court pas après la richesse : on se place à l'endroit par lequel elle doit obligatoirement passer.";

/**
 * L an zéro.
 *
 * La table des faits datait l an zéro de 2033. Il a corrigé lui-même : l an
 * zéro, c est maintenant. Ce n est pas une figure de style et ce n est pas
 * avancer une date — c est dire où l empire existe aujourd hui. Il ne commence
 * pas le jour de la première pierre : il commence le jour où il prend forme
 * dans une tête, et il se nourrit d une seule chose, l énergie qu il garde.
 *
 * C est aussi la jonction avec le pacte : ce qu il retient n est pas mis de
 * côté, c est déjà dépensé — dans ça.
 */
export const EMPIRE_AN_ZERO = [
  "L'an zéro, c'est maintenant.",
  "L'empire commence à prendre forme dans mon esprit — alimenté par mon énergie, conservée par ma discipline.",
  "2033 n'est pas sa naissance : c'est sa première pierre. Il existe déjà, et il se nourrit de ce que je ne dilapide pas.",
];

export const EMPIRE_ORDRE =
  "L'ordre des trente ne change jamais : il monte du plus physique — le sol, l'eau, l'énergie, la mer — vers ce qui dure plus longtemps que la matière : la norme, la mesure, le droit, la carte, le temps, la langue, et le sacré en dernier. Chaque étage suppose celui du dessous.";

export const EMPIRE_FAITS: { cle: string; valeur: string }[] = [
  { cle: "Corridor", valeur: "4 000 × 1 000 km" },
  { cle: "Superficie", valeur: "4 000 000 km²" },
  { cle: "Capital", valeur: "150 000 Md $" },
  { cle: "An Zéro", valeur: "Maintenant" },
  { cle: "Première pierre", valeur: "2033" },
  { cle: "Capitales", valeur: "Axiom · Verdia · Forge" },
  { cle: "Monnaie", valeur: "AXE" },
];

export interface Registre {
  id: string;
  verbe: string;
  /** Ce que ce registre fait, et pourquoi il est distinct des trois autres. */
  note: string;
  lignes: string[];
}

export const REGISTRES: Registre[] = [
  {
    id: "fera",
    verbe: "Il fera",
    note: "Les ouvrages, un par un. Ce que l'empire fait sortir du sol ou met en service — pas ce qu'il annonce.",
    lignes: [
      "Grand Inga relèvera les tranches qui tournent aujourd'hui sous leur puissance nominale, portera le site à plusieurs dizaines de gigawatts, et une dorsale à courant continu distribuera cette énergie du Sahel au Kalahari.",
      "Le mégaport de l'embouchure du Congo ouvrira ses quais sur l'eau profonde que le canyon amène à terre sans dragage, accueillera les seize mètres de tirant d'eau, et ses chantiers navals lanceront le pavillon souverain.",
      "Posera quatre mille kilomètres de voie à un seul écartement, une seule charge à l'essieu, une seule rampe maximale, pour qu'aucune grue ne reprenne un conteneur entre l'Atlantique et l'océan Indien.",
      "L'Hyperloop suivra une emprise rectiligne réservée avant tout tracé, avec des courbures de l'ordre de la centaine de kilomètres et des joints dimensionnés pour un centimètre de dilatation par cent mètres et dix degrés.",
      "Les raffineries de FORGE feront descendre le concentré à travers des centaines d'étages d'extraction par solvant, et le laboratoire accrédité qui les jouxte signera le dosage sur lequel la tonne sera payée.",
      "Bâtira les mégafabs et, avant elles, l'atelier des machines qui font les machines : commandes numériques, optiques de précision, bancs de mesure, sans quoi une salle blanche reste un bâtiment vide.",
      "Les centres de calcul d'AXIOM tourneront sur des poids détenus et non loués, adossés aux turbines du fleuve, et entraîneront leurs modèles sans qu'une règle d'exportation étrangère puisse en couper l'alimentation.",
      "Ouvrira la chaîne nucléaire de bout en bout : conversion et enrichissement de l'uranium nigérien, réacteurs à sels fondus alimentés au thorium sorti avec les terres rares, couvertures au lithium pour engendrer le tritium.",
      "Les hôpitaux du corridor répéteront le même geste chirurgical plusieurs fois par jour, et les usines voisines produiront les vaccins et les principes actifs que le continent importe aujourd'hui presque entièrement.",
      "Les cliniques de rajeunissement de VERDIA mesureront l'âge biologique tissu par tissu, élimineront les cellules sénescentes et reprogrammeront partiellement les tissus, avec les trois facteurs retenus après l'écartement de c-Myc.",
      "Ouvrira les universités et les académies militaires où se formeront les ingénieurs, les chirurgiens, les juristes et les officiers des sept nations, et la bibliothèque de dépôt qui gardera leurs actes, leurs revues et leurs données.",
      "Le pas de tir équatorial encaissera les quatre cent soixante-cinq mètres par seconde de la rotation terrestre et rejoindra la géostationnaire sans changement de plan, à cadence industrielle plutôt qu'à l'événement.",
      "Mettra en orbite ses propres constellations de navigation, d'observation et d'alerte, et l'agence cartographique en tirera le cadastre continental, parcelle par parcelle, à une résolution et à une date que personne d'autre ne fixera.",
      "L'anneau orbital et l'ascenseur spatial, ancrés sur l'équateur parce que seul un contrepoids placé à 35 786 kilomètres y reste immobile, ramèneront le prix du kilogramme mis en orbite vers son coût énergétique.",
      "Extraira la glace des cratères polaires lunaires pour en tirer l'ergol au sommet du puits, ouvrira les astéroïdes métalliques, et l'atelier orbital tirera les verres et les alliages que la pesanteur interdit ici.",
      "Les villes verticales d'AXIOM, de VERDIA et de FORGE monteront au lieu de s'étaler, et la forêt reprendra au pied des fondations le sol qu'un étalement aurait consommé.",
      "La banque centrale, l'hôtel des monnaies et la chambre de compensation de l'AXE tiendront le même quadrilatère que la bourse des métaux et la cour d'arbitrage : coter, régler, trancher au même endroit.",
      "Dressera les tours de capture du carbone sur le courant du fleuve et rendra à l'éléphant de forêt le sous-bois qu'il éclaircit, puisque son passage fait grossir les arbres les plus denses.",
    ],
  },
  {
    id: "dominera",
    verbe: "Il dominera",
    note: "Les positions tenues, et contre qui. Chaque ligne nomme le concurrent réel et le mécanisme qui le déclasse.",
    lignes: [
      "Le transit continental : l'Autorité du canal de Suez plafonne son tarif sur le détour par le cap de Bonne-Espérance ; un axe terrestre nord-sud lui impose un second plafond, plus bas, qu'aucune écluse ne peut abaisser.",
      "Le débouché des enclavés : Djibouti achemine la quasi-totalité du commerce extérieur éthiopien et loue son sol à deux armées étrangères ; sept États cessent d'acheter leur sortie à la douane d'un voisin.",
      "Le raffinage des métaux critiques : la RDC extrait l'essentiel du cobalt mondial, la Chine en raffine la majeure partie. Le corridor tient les deux étages, et l'étage rentable change de continent.",
      "La séparation des terres rares : elles ne sont pas rares, elles sont chimiquement jumelles, et les séparer demande des centaines d'étages d'extraction par solvant. Mountain Pass expédiait son concentré en Chine faute de cette chimie.",
      "L'eau douce : le Congo porte le deuxième débit de la planète après l'Amazone, et le Chari qui alimente le lac Tchad naît en Centrafrique. L'amont d'un continent sec se tient à l'intérieur du corridor.",
      "L'énergie bon marché : Inga et l'irradiance sahélienne, reliés par courant continu, placent le mégawattheure sous celui des fondeurs du Golfe adossés à un gaz subventionné — et une fonderie va toujours au courant.",
      "Le lancement orbital : à l'équateur un lanceur reçoit 465 mètres par seconde de la rotation terrestre, contre zéro aux pôles, et rejoint la géostationnaire sans changement de plan. Kourou est à cinq degrés, Cap Canaveral à vingt-huit, Baïkonour à quarante-six.",
      "La constellation : plus de la moitié des satellites actifs appartiennent aujourd'hui à un seul opérateur commercial. À l'Union internationale des télécommunications, la priorité suit la date de dépôt — l'orbite se prend au greffe avant de se prendre au feu.",
      "L'enrichissement : environ quarante pour cent de la capacité mondiale reste russe, la première part du monde. Un uranium nigérien converti et enrichi sur place retire à Rosatom l'étage où se prend la valeur.",
      "La pharmacopée du bassin : la pervenche de Madagascar a donné la vincristine, une bactérie de source chaude la Taq polymérase sans laquelle la PCR n'existe pas. La bibliothèque est déjà testée par l'évolution, et elle est ici.",
      "Le carbone : la cuvette centrale abrite la plus vaste tourbière tropicale connue. Les certificateurs privés décidaient seuls de ce qui compte comme une tonne ; le stock, lui, ne s'est jamais déplacé.",
      "La longévité : les cliniques de rajeunissement du Nord vendent des protocoles à qui peut voyager. VERDIA fait de la médecine que le monde vient chercher plutôt que celle qu'il faut aller acheter.",
      "Le calcul souverain : la mémoire à haute bande passante sort de trois entreprises au monde et le conditionnement avancé d'un seul fondeur. Un modèle entraîné sur des poids détenus ne s'éteint sur la règle d'exportation de personne.",
      "La finance des matières premières : Londres et Chicago cotent aujourd'hui des métaux qu'elles n'extraient pas. Un contrat de référence coté dans le corridor déplace le carnet d'ordres vers le gisement.",
      "L'arbitrage commercial : l'essentiel des contrats de matières premières se rédige en droit anglais, et la Convention de New York de 1958 rend une sentence exécutoire dans plus de cent soixante États. Le siège choisi désigne le juge.",
      "La métrologie : l'UTC est une moyenne calculée sur des horloges atomiques nationales, et un pays sans horloge consomme le temps sans le fabriquer. AXIOM entre dans la moyenne, et son laboratoire signe les étalons du continent.",
      "Le spectre et les créneaux orbitaux : ils s'attribuent par ordre de dépôt et se perdent s'ils ne sont pas mis en service dans le délai. Sept États déposant ensemble occupent une bande équatoriale que personne ne récupère ensuite.",
      "La formation des élites : former l'élite d'un pays, c'est le diriger par procuration. Dans trente ans, les ingénieurs, les juristes et les officiers du continent auront eu le même professeur — et il n'aura été ni parisien, ni pékinois.",
    ],
  },
  {
    id: "controlera",
    verbe: "Il contrôlera",
    note: "Les goulots. Ce registre n'est pas celui de la production mais du refus : ce que coûte, à celui qui le subit, un « non » venu du corridor.",
    lignes: [
      "La douane continentale est unique sur quatre mille kilomètres : un même code, un même guichet. Reclasser un chargement en contrôle renforcé ne le refuse pas ; il l'immobilise, et l'immobilisation seule casse un contrat à date.",
      "Le tarif de transit se module par cargaison, par pavillon et par destination : celui qui n'obtient pas le tarif reprend le contournement par le Cap ou par Suez, et paie l'écart en semaines de mer.",
      "Un câble ne se refuse pas en mer mais à terre : la station d'atterrage délivre le local, l'énergie et la licence, et un consortium éconduit doit rallonger son tracé de milliers de kilomètres.",
      "Au point d'échange, l'appairage se consent ou se refuse : l'opérateur éconduit repasse en transit payant et voit sa latence s'allonger d'un détour européen, sur chaque paquet et sur chaque client.",
      "Les métaux du corridor se facturent en AXE : il faut en détenir avant d'acheter, et fermer un compte de règlement retire à l'acheteur non pas une devise, mais l'accès à la marchandise.",
      "La chambre de compensation décide de l'instant où un paiement devient définitif ; suspendre un adhérent ne saisit rien, cela laisse ses opérations en suspens, et un flux non dénoué vaut un flux mort.",
      "Le contrat de référence sur le cobalt se cote dans le corridor : radier un entrepôt ou un négociant rend son stock non livrable, et un métal non livrable cesse d'être un actif finançable.",
      "Le certificat d'origine et de titre suit la cargaison partout : le retirer ne change pas un gramme au chargement, il le rend inéligible aux marchés qui exigent une chaîne documentée.",
      "Une norme ne vaut que par l'organisme qui la vérifie : suspendre cet agrément périme les certificats déjà délivrés, et l'industriel se retrouve avec une chaîne entière à faire réhomologuer.",
      "Un brevet déposé à l'intérieur de la norme se paie sur l'objet entier : refuser la licence n'interdit pas de produire, cela interdit de produire conforme, donc de vendre là où la norme s'applique.",
      "Le créneau et la fréquence s'obtiennent par la date de dépôt : un opérateur non coordonné doit brider sa puissance au-dessus du corridor ou renoncer à desservir toute la bande équatoriale.",
      "Le pavillon donne sa nationalité au navire et le parrainage donne son existence au contractant des fonds marins : retirer l'un immobilise une coque, retirer l'autre éteint un permis d'exploitation déjà financé.",
      "L'accès aux souches, aux échantillons et à leurs séquences numériques se contractualise avant tout prélèvement : le refuser ne retarde pas un programme pharmaceutique, il le prive de sa seule matière première irremplaçable.",
      "Le visa scientifique ouvre l'instrument, le calculateur et le panel de référence : le refuser à une équipe étrangère ne l'empêche pas de chercher, cela l'empêche de vérifier ce qu'elle affirme.",
      "L'agrément des médicaments décide de ce qui est un traitement à l'intérieur du corridor : un produit non autorisé n'y existe pas, et son fabricant perd des centaines de millions de patients.",
      "L'heure de référence horodate les ordres et le registre d'état civil atteste les personnes : sans le premier, un ordre n'a pas de rang ; sans le second, un homme n'a ni héritier ni recours.",
      "Le cadastre inscrit ou n'inscrit pas : un acte signé à Genève ou à Dubaï sur une terre du corridor n'est opposable à personne tant que le registre ne l'a pas porté.",
      "La banque de semences conserve les variétés adaptées à la chaleur et à la sécheresse : en refuser l'accès prive un sélectionneur d'allèles qu'aucun laboratoire ne synthétise, à l'heure où le climat les rend nécessaires.",
    ],
  },
  {
    id: "changera",
    verbe: "Il changera",
    note: "Le monde d'après. Chaque ligne nomme une règle du monde qui cesse d'être vraie une fois l'empire debout.",
    lignes: [
      "La règle qui voulait que la matière parte brute et que la marge se prenne un étage plus haut cesse de s'appliquer : l'étage rentable se tient désormais du côté du gisement.",
      "Contourner l'Afrique cesse d'être la route la moins chère : entre l'Atlantique et l'océan Indien, la ligne droite traverse le continent, et tout affréteur inscrit ce troisième tarif dans ses calculs.",
      "La valeur cesse de naître à la signature d'un tiers installé sur un autre continent : le gisement, l'analyse et le certificat se font au même endroit, et le tampon se délivre là où la matière repose.",
      "La conditionnalité disparaît avec le prêteur : nul ne dicte un budget, un tarif douanier ou un calendrier de cessions à un État qui finance ses barrages sur ses propres recettes de passage.",
      "Le rapport entre un État pauvre et son créancier s'inverse : celui qui emprunte dans la monnaie où il vend cesse de voir sa dette croître sans qu'un seul chiffre du contrat ait bougé.",
      "L'aide cesse d'exister comme catégorie : ce qui se donnait sous condition se vend, s'achète ou s'échange, et la générosité redevient ce qu'elle a toujours été, un contrat dont on discute les termes.",
      "Le prix du carbone cesse d'être fixé par celui qui l'achète : une tonne laissée sous la tourbière se facture au tarif du marché qui la valorise, non au tarif que consent le donateur.",
      "La fuite des cerveaux s'éteint sans qu'aucune frontière ne se ferme : un chercheur part vers l'instrument, et l'instrument le plus fin se trouve désormais au centre du continent.",
      "Un enfant né dans le corridor peut viser le bloc opératoire, la paillasse, le pas de tir et la bibliothèque sans quitter sa latitude : le départ cesse d'être la condition de la carrière.",
      "La longévité cesse d'être un privilège de latitude : une thérapie se fabrique là où la maladie tue plutôt que là où elle se rembourse, et l'espérance de vie cesse de suivre le passeport.",
      "La démographie du siècle cesse d'être un problème à contenir pour devenir un actif à employer : les économies vieillissantes viennent négocier avec le continent qui garde désormais ses vingt ans.",
      "Les institutions cessent de délibérer dans la langue d'un ancien tuteur : la norme, la revendication de brevet et la clause qui fait foi sont rédigées ici, et la traduction se paie de l'autre côté.",
      "La carte cesse d'être dressée par ceux qui ne l'habitent pas : la projection, la résolution et les noms retenus relèvent du satellite et du greffe du corridor, et le monde travaille sur cette image.",
      "Le méridien d'origine et l'heure de référence cessent d'être un héritage du dix-neuvième siècle : un horodatage venu de l'équateur suffit, et la conversion incombe à ceux qui ne siègent pas dans la salle.",
      "L'accès à l'orbite cesse d'être un privilège des puissances anciennes : la géométrie désigne l'équateur pour le tir comme pour l'ancrage, et une géométrie ne se négocie ni ne se rachète.",
      "La puissance cesse de se lire dans le produit intérieur brut : elle se compte en décisions étrangères obligées de franchir un point tenu, et ce total ne figure dans aucune comptabilité nationale.",
      "Un continent cesse de recevoir les décisions qui le concernent : le prix de son cacao, le taux de sa dette et la molécule autorisée pour sa maladie passent désormais par un refus qu'il peut opposer.",
      "Dans deux siècles, on aura oublié le montant, la date et les fondateurs ; il restera une heure que le monde consulte, un droit qu'il invoque et un continent qu'on ne contourne plus.",
    ],
  },
];
