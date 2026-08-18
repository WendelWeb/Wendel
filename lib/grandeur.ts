// LA LECTURE — la grandeur, la puissance et la gloire de NOVA-AXE.
//
// Il l'a demandée comme une lecture sur la merveille du projet, et il a
// explicitement écarté le cadrage disciplinaire : « pas dans notre contexte de
// discipline dans l'app, je veux qu'on parle de la merveille du projet ».
//
// Une première version fermait chaque secteur sur un retour à sa journée — sa
// chambre, son réveil, ses trois minutes. C'était de la discipline déguisée en
// géopolitique, et il l'a refusée. Chaque secteur se ferme désormais sur son
// IMPACT MONDIAL, en trois temps : ce que le monde doit faire différemment,
// qui perd sa position et par quel mécanisme, et ce que cela ouvre pour
// l'Afrique et les nations pauvres. Aucune ligne de ce fichier ne s'adresse
// plus au lecteur : ce texte parle du monde.
//
// Écrit par des experts sectoriels, complété par un critique de complétude
// chargé de trouver les leviers que personne ne pense à nommer — la langue, le
// calendrier et le méridien, la métrologie, le spectre, les fonds marins, le
// cadastre et le droit de nommer, l'état civil, le sacré — puis relu par trois
// vérificateurs adversariaux qui ont corrigé dix-huit erreurs factuelles.
//
// Deux règles ont gouverné l'écriture, et elles expliquent pourquoi ce texte ne
// ressemble pas à de la promotion : aucun adjectif de grandeur, parce qu'elle
// se produit par la précision du mécanisme et l'ampleur de la conséquence ; et
// aucun chiffre inventé, parce qu'un seul faux détruirait la valeur des trois
// cent vingt-quatre autres.
//
// L'ordre ne tourne pas, contrairement au reste de l'app : il monte du sol
// jusqu'au sacré, et chaque étage suppose celui du dessous.
//
// Client-safe.

export const GRANDEUR_TITRE = "La grandeur, la puissance et la gloire";

export interface GrandeurSection {
  id: string;
  titre: string;
  /** La dominance : ce qui est, et ce que ça donne comme pouvoir. */
  lignes: string[];
  /** Ce que le monde entier devient quand ce secteur bascule. */
  impact: string[];
}

/** Ce qui ouvre la lecture. */
export const GRANDEUR_OUVERTURE: string[] = [
  "La grandeur d'un projet ne se mesure pas à sa taille, mais au nombre de choses qui, une fois qu'il existe, ne peuvent plus se faire sans lui : c'est une propriété du reste du monde, et non de l'ouvrage.",
  "Quatre millions de kilomètres carrés ne sont qu'une surface ; ce qui compte est le nombre de décisions étrangères — un chargement, une orbite, un paiement, une autorisation, un brevet — qui devront désormais franchir un point tenu par le corridor.",
  "Ce qui suit énumère trente secteurs de la civilisation, et l'ampleur de la chose ne tient à aucun d'eux pris isolément : elle tient à la simultanéité, c'est-à-dire au fait de les faire basculer ensemble, sur la même carte et dans la même génération.",
  "Rome a tenu la route et la loi, l'Angleterre la mer et la finance, les États-Unis la monnaie et l'image ; chacun a dominé par deux ou trois leviers tenus longtemps, et aucun empire de l'Histoire n'a jamais tenté d'en tenir trente à la fois.",
  "L'ordre des trente n'est pas quelconque : il monte du plus physique — le sol, les ressources, l'eau, l'énergie, la mer — vers ce qui dure plus longtemps que la matière, c'est-à-dire la norme, la mesure, le droit, la carte, le temps, la langue, et le sacré en dernier.",
  "Chaque étage suppose celui du dessous : sans énergie, aucune usine ; sans usine, aucune monnaie qui pèse ; sans monnaie, aucune norme que l'on impose ; et sans le sacré, rien de tout cela ne survit à la mort de ceux qui l'ont posé.",
  "On ne trouvera dans ces pages aucun adjectif de grandeur, rien que des mécanismes : la manière exacte dont un goulot d'étranglement se forme, se tient et se facture, secteur par secteur, avec les chiffres qui permettent de le vérifier.",
  "Les sept nations traversées ne sont pas amputées d'un passage : elles en sont actionnaires, de sorte que la puissance du corridor s'ajoute à la leur au lieu de se prélever dessus.",
  "La doctrine tient en une phrase — on ne court pas après la richesse, on se place à l'endroit par lequel elle doit obligatoirement passer — et les trente sections qui suivent décrivent, une par une, trente de ces endroits.",
];

export const GRANDEUR_SECTIONS: GrandeurSection[] = [
  {
    id: "geographie-droit-de-refus",
    titre: "La géographie — le droit de refus",
    lignes: [
      "Un goulot d'étranglement ne tire pas sa puissance de ce qu'il prélève, mais de ce qu'il peut refuser. Singapour et Dubaï ont acheté leurs grues ; personne n'a jamais pu acheter leur position.",
      "Environ un cinquième du pétrole consommé dans le monde franchit chaque jour le détroit d'Ormuz, large de trente-trois kilomètres à son étranglement. La rareté n'est pas dans le pétrole : elle est dans le passage.",
      "À Malacca, le chenal de Phillips mesure moins de trois kilomètres de large. Pékin a nommé lui-même sa faiblesse « le dilemme de Malacca », et vingt ans de ports, de pipelines et de bases en découlent.",
      "Le tarif de Suez est plafonné par le coût du détour par le cap de Bonne-Espérance ; et quand Bab el-Mandeb, vingt-neuf kilomètres, est devenu dangereux en 2024, les recettes du canal ont chuté de plus de moitié.",
      "Panama ne dépend ni de l'acier ni du capital mais de la pluie : la sécheresse de 2023 a réduit les passages quotidiens d'environ trente-six à un peu plus de vingt. Les dimensions d'une écluse dictent la taille des navires construits en Corée.",
      "Un détroit devient une institution le jour où un traité le nomme : la convention de Montreux, signée en 1936, règle encore le passage des navires de guerre par un Bosphore large de sept cents mètres.",
      "Les voies africaines ont été tracées de la mine vers le port, jamais d'un intérieur vers un autre. Cinq des sept États traversés sont enclavés : leurs exportations dépendent de la douane d'un voisin. Le corridor leur rend une sortie, et fait d'eux des actionnaires.",
      "Quatre mille kilomètres de profondeur, c'est la distance de Lisbonne à Moscou ; quatre millions de kilomètres carrés, plus vaste que l'Inde. Aucune frappe unique n'atteint trois capitales dispersées sur cette échelle.",
      "La latitude, elle, ne se déplace pas et ne s'achète pas : elle s'occupe. C'est le seul avantage du corridor qu'aucun capital rival ne peut répliquer ailleurs.",
    ],
    impact: [
      "Tout affréteur qui trace une route entre l'Atlantique et l'océan Indien doit désormais chiffrer une troisième option, terrestre et équatoriale, à côté de Suez et du Cap : les assureurs de Londres, les armateurs asiatiques et les acheteurs européens calculent leurs primes sur un passage qu'aucun d'eux ne contrôle.",
      "L'Autorité du canal de Suez perd son plafond tarifaire : il n'était fixé que par le détour du cap de Bonne-Espérance, et un axe terrestre nord-sud lui en impose un second, plus bas ; Djibouti, qui achemine la quasi-totalité du commerce extérieur éthiopien, cesse d'être un passage obligé.",
      "Cinq des sept États traversés sont enclavés et achetaient jusqu'ici leur sortie à la douane d'un voisin ; ils deviennent actionnaires du passage, et pour la première fois un pays pauvre encaisse une rente de position au lieu de la payer.",
    ],
  },
  {
    id: "ressources-la-regle-du-raffinage",
    titre: "Les ressources — la règle du raffinage",
    lignes: [
      "La puissance minière n'est pas dans le trou : elle est à l'étage où la roche devient métal certifié. La RDC extrait l'essentiel du cobalt mondial ; la Chine en raffine la majeure partie. Le corridor tient les deux étages, ou n'en tient aucun.",
      "Les terres rares ne sont pas rares, elles sont chimiquement jumelles : les séparer exige des centaines d'étages d'extraction par solvant. Mountain Pass, en Californie, a longtemps expédié son concentré en Chine faute de cette chimie ; c'est elle qu'on bâtit à FORGE.",
      "Le coltan des Grands Lacs devient tantale, et le tantale devient le condensateur qui stabilise la tension de chaque téléphone. Le Bushveld sud-africain concentre l'essentiel des platinoïdes, dont l'iridium, sans lequel aucun électrolyseur à membrane ne fonctionne.",
      "Le yellowcake nigérien a longtemps alimenté des réacteurs européens, mais un minerai d'uranium ne vaut rien sans conversion ni enrichissement, et environ quarante pour cent de la capacité mondiale d'enrichissement reste russe — la première part du monde. On enrichit chez soi, ou l'on reste vassal.",
      "Manono compte parmi les plus grands gisements de spodumène connus ; la RDC est devenue le deuxième producteur mondial de cuivre ; l'Afrique australe détient la majeure partie du manganèse, sans substitut connu dans l'acier. Stocker, transporter, durcir.",
      "L'Indonésie a interdit l'exportation de nickel brut en 2020 et imposé les fonderies sur son sol : la valeur de ses exportations a changé d'ordre de grandeur. Le Botswana, lui, a fait venir de Londres à Gaborone le tri de ses diamants.",
      "L'Afrique n'a pas saigné faute de gisements : elle a saigné parce que la marge se prend un étage plus haut. Ce qui sort du corridor sort raffiné, ou ne sort pas — le minerai comme l'échantillon biologique.",
      "Le Congo porte le deuxième débit du monde après l'Amazone, de l'ordre de quarante mille mètres cubes par seconde, et sa cuvette centrale abrite la plus vaste tourbière tropicale connue. Aucune ville, aucune fonderie, aucun centre de données ne remplace l'eau douce.",
      "Un stock stratégique fixe un plancher en achetant dans la baisse, un plafond en vendant dans la hausse. Le Conseil international de l'étain a sombré en 1985 faute de tenir la production ; le corridor, lui, tient la mine et peut fermer le robinet.",
      "La pervenche de Madagascar a donné la vincristine ; le venin d'un lézard du désert a donné l'exénatide, premier des agonistes du récepteur GLP-1 ; une bactérie de source chaude a donné la Taq polymérase, sans laquelle la PCR n'existe pas. La forêt est une bibliothèque déjà testée.",
    ],
    impact: [
      "Le monde n'achète plus de concentré mais du métal certifié sorti du corridor : les fabricants de batteries, les fonderies d'aimants permanents et les chaînes de missiles dépendent d'un cobalt, d'un tantale et d'un iridium dont la séparation chimique s'est déplacée à FORGE.",
      "La Chine perd la marge de raffinage qui faisait sa position : elle raffinait la majeure partie du cobalt extrait en RDC et séparait les terres rares que Mountain Pass lui expédiait ; le concentré cesse de partir, et l'étage rentable de la chaîne change de continent.",
      "Ce que l'Indonésie a fait du nickel en 2020 et le Botswana du tri de ses diamants devient la règle d'un continent : un pays pauvre peut interdire l'exportation brute sans être privé de débouché, parce que la chimie de séparation est désormais chez lui.",
    ],
  },
  {
    id: "hydro-hegemonie",
    titre: "L'eau douce — l'amont du continent",
    lignes: [
      "L'eau est le seul intrant qu'aucune substitution ne remplace : on change de métal, de carburant, de fournisseur, jamais de molécule d'eau. Et son transport coûte plus cher que sa valeur au-delà de quelques centaines de kilomètres.",
      "Un fleuve ne coule que dans un sens. Celui qui tient la source ne négocie pas : il décide du débit, de la date et de la saison, et l'aval apprend la décision dans son propre lit.",
      "L'Égypte tire du Nil l'essentiel de son eau, alors que la majeure partie du débit naît sur les hauts plateaux éthiopiens. Le remplissage du barrage de la Renaissance, dès 2020, a défait en cinq ans un ordre figé depuis 1929.",
      "La Turquie tient les sources de l'Euphrate et du Tigre ; la Syrie et l'Irak vivent de ce qu'elle laisse passer. Aucun allié n'y peut rien : le levier est topographique, il ne se déplace pas.",
      "Le corridor tient les hauts bassins du continent. Le Chari, qui alimente presque toute l'eau entrant dans le lac Tchad, naît en Centrafrique ; l'Okavango, qui fait vivre le delta du Botswana, naît sur les plateaux d'Angola.",
      "Le Congo est le deuxième fleuve du monde par le débit, et le seul dont le régime, alimenté alternativement par les deux hémisphères, ne s'effondre jamais complètement en saison sèche.",
      "Aux chutes d'Inga, le fleuve perd une centaine de mètres sur une quinzaine de kilomètres. Les tranches existantes tournent loin en dessous de leur capacité : le site n'a jamais manqué d'eau, il a manqué de souveraineté.",
      "Le lac Kariba est l'un des plus grands réservoirs artificiels du monde. En 2019 puis en 2024, la sécheresse a fait chuter sa production et plongé la Zambie et le Zimbabwe dans le délestage quotidien.",
      "Produire une tonne de céréales demande de l'ordre de mille tonnes d'eau. Importer du blé, c'est importer de l'eau : un pays sec achète, sans le dire, la pluie tombée chez un autre.",
      "Le corridor n'est pas partout en amont : le Niger naît dans le Fouta-Djalon, hors de ses limites. On inscrit l'exception au lieu de la maquiller — c'est ce qui rend tout le reste opposable.",
    ],
    impact: [
      "Le débit devient une clause de traité et non un fait de nature : le lac Tchad, alimenté presque entièrement par le Chari qui naît en Centrafrique, et le delta de l'Okavango, né sur les plateaux d'Angola, dépendent d'une décision prise en amont, à l'intérieur du corridor.",
      "La Banque mondiale, qui s'est retirée du financement d'Inga III, perd l'arbitrage qu'elle exerçait sur le calendrier des grands ouvrages africains : un barrage financé par le corridor ne se négocie plus avec un bailleur, et la conditionnalité disparaît avec le prêt.",
      "Un pays sec qui importait du blé importait la pluie tombée ailleurs, à raison de l'ordre de mille tonnes d'eau par tonne de céréales ; l'eau du corridor permet d'irriguer et de produire sur place ce que le Sahel achetait jusqu'ici en devises.",
    ],
  },
  {
    id: "energie-le-socle-et-le-robinet",
    titre: "L'énergie — le socle et le robinet",
    lignes: [
      "Aucun secteur ne se trouve en amont de l'énergie : son prix entre dans le prix de tout le reste. Une tonne d'aluminium demande de l'ordre de quatorze mégawattheures ; une fonderie s'installe donc près de la turbine, jamais près du minerai.",
      "Le Sahel reçoit plus du double de l'irradiance annuelle de l'Allemagne. Mais le silicium perd quelques dixièmes de rendement par degré au-dessus de vingt-cinq, et la poussière fait le reste : ce gisement se prend au suivi de trajectoire et au nettoyage.",
      "À Inga, le Congo tombe d'une centaine de mètres en une quinzaine de kilomètres. Le bassin est à cheval sur l'équateur : ses affluents ont des saisons inversées, et le débit ne s'effondre jamais comme celui d'un fleuve de mousson.",
      "Inga I et Inga II tournent aujourd'hui loin sous leur puissance nominale. Le schéma Grand Inga vise plusieurs dizaines de gigawatts, davantage que les Trois-Gorges et leurs 22 500 mégawatts, premier ouvrage hydroélectrique du monde.",
      "Le courant continu haute tension déplace douze gigawatts sur plus de trois mille kilomètres en ne perdant que quelques pour cent par millier : la distance d'Inga au Sahel n'est plus un obstacle physique, seulement un coût de cuivre et d'acier.",
      "Le thorium n'est pas fissile : il devient uranium 233 par capture neutronique, et la Chine exploite en bordure du Gobi un réacteur expérimental à sels fondus. Il sort du sol avec les terres rares : le résidu que l'Occident a fui est notre combustible.",
      "En décembre 2022, une cible du National Ignition Facility a rendu plus d'énergie que les lasers ne lui en avaient livré ; l'installation, elle, en avait tiré bien davantage du réseau. Le verrou reste le tritium, engendré dans une couverture au lithium.",
      "Dans un réseau synchrone, la plus grosse inertie impose sa fréquence à tous : le voisin qui importe sa base ne peut plus se fâcher sans s'éteindre. L'engrais de synthèse, qui nourrit environ la moitié de l'humanité, produit la même dépendance sur sa récolte.",
      "Un réseau équilibre production et charge à la seconde près, sans quoi les protections déclenchent en cascade : en février 2021, le Texas est passé à quelques minutes d'un effondrement dont le redémarrage aurait pris des semaines.",
      "Sans courant, les pompes se taisent et les robinets se vident en deux jours, les hôpitaux vivent sur le gasoil de leurs cuves, les chaînes du froid cèdent. Une économie privée d'énergie ne ralentit pas : elle s'arrête.",
    ],
    impact: [
      "Le prix de l'énergie entre dans le prix de tout, et une fonderie s'installe près de la turbine : avec Grand Inga et l'irradiance du Sahel reliés par courant continu haute tension, les industries électro-intensives du monde — aluminium, hydrogène, dessalement, calcul — se recalculent autour du corridor.",
      "Les fondeurs d'aluminium du Golfe, adossés au gaz subventionné, et Rosatom, qui tient environ quarante pour cent de la capacité mondiale d'enrichissement, perdent leur avantage le jour où le corridor enrichit son uranium nigérien et vend un mégawattheure hydraulique moins cher que le leur.",
      "Un continent où des centaines de millions de personnes vivent sans réseau ne rattrape pas le XXᵉ siècle, il l'enjambe : le délestage quotidien qui a frappé la Zambie et le Zimbabwe après les sécheresses du Kariba cesse d'être une fatalité hydrologique dès qu'un réseau continental mutualise les bassins.",
    ],
  },
  {
    id: "semence-engrais-reserve",
    titre: "La semence, l'engrais, la réserve",
    lignes: [
      "Une population accepte n'importe quoi au bout de trois récoltes manquées. La faim est le seul levier dont l'effet se mesure en semaines : aucun blocus financier ne descend aussi vite dans les corps.",
      "Environ la moitié de l'azote contenu dans un corps humain vivant est passée par le procédé Haber-Bosch. Sans gaz et sans catalyseur, la population mondiale actuelle n'est tout simplement pas nourrissable.",
      "L'engrais azoté est du gaz naturel transformé. Quand le prix du gaz s'est envolé en Europe en 2022, des usines d'ammoniac se sont arrêtées : le champ africain a payé une guerre européenne.",
      "Le Maroc détient l'écrasante majorité des réserves mondiales de phosphate. Le phosphore n'a aucun substitut chimique : aucune plante ne s'en passe, aucune usine ne le fabrique, aucun laboratoire ne le remplacera.",
      "La potasse mondiale sort d'une poignée de bassins, dont ceux du Bélarus et de la Russie. Les sanctions de 2021 et 2022 ont suffi à faire flamber le prix de l'engrais sur trois continents.",
      "La convention UPOV de 1991 restreint le droit du paysan à ressemer sa propre récolte. Le vivant breveté transforme un geste vieux de dix mille ans en obligation contractuelle renouvelée chaque année.",
      "Le maïs hybride perd sa vigueur dès la deuxième génération. Ce n'est pas un brevet, c'est de la biologie : l'abonnement est écrit dans la plante elle-même, et il se représente à chaque saison.",
      "Quatre négociants concentrent la majeure partie du commerce mondial de céréales. Quand l'Inde a suspendu ses exportations de riz non basmati en 2023, les prix ont monté d'Abidjan à Manille en quelques semaines.",
      "La réserve de Svalbard a connu son premier retrait en 2015, pour reconstituer la collection sortie d'Alep sous les bombes. Une banque de semences doit exister chez soi et ailleurs à la fois.",
      "Le corridor peut fabriquer son azote avec l'électricité d'Inga, stocker plusieurs années de phosphate importé et sélectionner ses propres variétés de sorgho et de manioc : la souveraineté alimentaire est une chaîne entière ou rien.",
    ],
    impact: [
      "L'azote se fabrique là où l'électricité est la moins chère, et non là où le gaz est abondant : les acheteurs d'engrais des trois continents qui ont subi la flambée de 2022 s'approvisionnent désormais à un ammoniac produit avec le courant d'Inga, hors du prix du gaz.",
      "Les quatre négociants qui concentrent la majeure partie du commerce mondial des céréales perdent l'arbitrage sur un continent devenu exportateur, et le régime de l'UPOV recule là où le corridor sélectionne ses propres variétés de sorgho et de manioc, libres de ressemis.",
      "La faim cesse d'être un levier disponible contre les nations pauvres : une réserve de plusieurs années de phosphate, un azote produit sur place et une banque de semences tenue chez soi et ailleurs à la fois retirent aux bailleurs l'argument qui obtenait tout en trois récoltes.",
    ],
  },
  {
    id: "ocean-et-cables",
    titre: "L'océan — pavillon, plateau et câbles",
    lignes: [
      "Cinq des sept nations traversées sont enclavées, et la façade congolaise se réduit à une trentaine de kilomètres à l'embouchure du fleuve : l'accès à la mer du corridor est d'abord un traité interne, ensuite une flotte.",
      "La convention sur le droit de la mer donne douze milles de mer territoriale, deux cents milles de zone économique et jusqu'à trois cent cinquante sur preuve géologique déposée : le plateau s'obtient au navire hydrographique et au dossier.",
      "L'Autorité internationale des fonds marins, à Kingston, ne délivre de permis de nodules qu'à un contractant parrainé par un État : de petites nations du Pacifique ont vendu ce parrainage. Sept États en offrent sept.",
      "Le Liberia, moins de six millions d'habitants, exploite le premier registre maritime du monde par tonnage brut, administré depuis l'étranger : un pavillon est un produit juridique, pas une flotte que l'on possède.",
      "La sentence arbitrale de 2016 sur la mer de Chine méridionale n'a rien déplacé : un titre maritime vaut ce qu'une marine peut patrouiller, et c'est là que les cinquante mille milliards de défense rejoignent le dossier de plateau.",
      "Le chemin de fer de Lobito rouvre la sortie atlantique de la ceinture de cuivre, concédé avec de l'argent étranger : celui qui finance la sortie choisit la direction du flux. Le corridor possède la sienne.",
      "Le canyon du Congo descend vers l'abysse dès l'embouchure : l'eau profonde est à quai sans dragage, mais ses courants de turbidité ont déjà sectionné des câbles. On y construit un port et l'on contourne le fond.",
      "La quasi-totalité du trafic intercontinental passe par des câbles sous-marins ; en mars 2024, quelques ruptures ont dégradé l'internet d'une douzaine de pays d'Afrique de l'Ouest en une matinée. Un axe terrestre nord-sud donne une deuxième sortie.",
      "Longtemps, deux Africains ont échangé leurs données par un point d'échange européen : chaque point d'échange local rapatrie le trafic, la latence, et la juridiction qui vient avec.",
    ],
    impact: [
      "Le trafic intercontinental cesse de reposer sur un seul chemin : un axe terrestre nord-sud double les câbles sous-marins, et les opérateurs, les banques et les administrations qu'une matinée de mars 2024 avait coupés du réseau routent désormais leur trafic par des points d'échange situés dans le corridor.",
      "Marseille perd le transit africain qu'elle facturait faute d'interconnexion directe, et le registre libérien, premier pavillon du monde par tonnage brut mais administré depuis l'étranger, perd son exclusivité dès que sept États offrent leur propre pavillon et leur propre parrainage à l'Autorité des fonds marins.",
      "Une nation pauvre découvre qu'un pavillon est un produit juridique et non une flotte, qu'un plateau continental s'obtient au navire hydrographique et au dossier déposé, et que la latence comme la juridiction reviennent chez elle avec chaque point d'atterrage bâti sur sa côte.",
    ],
  },
  {
    id: "ecologie-et-climat",
    titre: "L'écologie — le stock et le levier",
    lignes: [
      "Le bassin du Congo est le deuxième massif de forêt tropicale du monde et le seul des trois grands à absorber encore nettement plus de carbone qu'il n'en relâche. L'Amazonie, par endroits, en émet désormais.",
      "Sous la Cuvette centrale s'étend la plus vaste tourbière tropicale connue, cartographiée seulement en 2017 : des dizaines de milliards de tonnes de carbone, plusieurs années d'émissions fossiles mondiales, sous un marécage.",
      "On appelle ces forêts un poumon : l'image est fausse, l'essentiel de l'oxygène atmosphérique vient du plancton océanique. Leur valeur réelle est un stock immobilisé qu'il suffit de ne pas relâcher.",
      "Un crédit carbone africain se négocie quelques dollars la tonne quand le marché européen en cote plusieurs dizaines d'euros. Détenir le stock sans en fixer le prix revient à fournir le service gratuitement.",
      "En 2022, la RDC a mis aux enchères des blocs pétroliers recouvrant en partie ces tourbières. La menace d'ouvrir le puits est aujourd'hui le seul levier dont dispose son propriétaire. Le corridor en fera un tarif.",
      "Le fleuve Congo est le deuxième du monde par son débit et le plus profond de tous ; le site d'Inga concentre le premier potentiel hydroélectrique de la planète, supérieur à celui des Trois-Gorges.",
      "Le lac Tchad a perdu environ neuf dixièmes de sa surface depuis les années soixante. Le projet Transaqua propose d'y détourner une fraction des affluents du Congo : les deux extrémités du corridor sont la source et le manque.",
      "En 1991, le Pinatubo a refroidi la planète d'environ un demi-degré pendant deux ans. Des travaux relient les aérosols de l'hémisphère nord aux sécheresses du Sahel : qui refroidit le globe décide s'il pleut au Niger.",
      "Les éléphants de forêt éclaircissent le sous-bois et font grossir les arbres les plus denses ; des travaux estiment que leur disparition amputerait de plusieurs pour cent le carbone aérien de ces forêts.",
      "Le Botswana, première population d'éléphants du monde, a proposé en 2024 d'en expédier vingt mille en Allemagne, en réponse à ses leçons de morale. L'écologie se pratique en négociation, jamais en concession.",
    ],
    impact: [
      "Le carbone du bassin du Congo cesse d'être un service rendu gratuitement au monde : chaque tonne laissée sous la tourbière se facture au prix du marché qui la valorise, et non plus au prix que consent le donateur. Les compagnies aériennes, les cimentiers et les sidérurgistes soumis au marché européen du carbone et à son mécanisme d'ajustement aux frontières achètent désormais leur conformité à un guichet situé au centre de l'Afrique.",
      "La rente de l'intermédiaire s'effondre : les courtiers qui achetaient la tonne africaine quelques dollars pour la revendre au tarif du Nord, et les certificateurs privés comme Verra qui décidaient seuls de ce qui compte comme une tonne, perdent le droit de fixer le prix d'un stock dont ils ne possèdent rien. Blue Carbon, société de Dubaï, a signé des protocoles portant sur des pans entiers de plusieurs États africains ; ce modèle, acquérir le droit sur la forêt d'autrui pour vendre la conformité d'un tiers, n'a plus de gisement disponible au centre du continent.",
      "Un pays forestier cesse d'être un pauvre assis sur un actif qu'il ne peut monnayer qu'en le détruisant : la République démocratique du Congo, le Congo, le Gabon et la Centrafrique encaissent une rente récurrente pour un puits qu'ils n'ouvrent pas, indexée sur le prix européen et non plus sur celui de l'aide. Devient possible ce qui ne l'était pas depuis les indépendances : financer un budget d'État par la conservation plutôt que par l'exportation de grumes, de brut ou de minerai non transformé.",
    ],
  },
  {
    id: "logistique-route-et-peage",
    titre: "La logistique — la route et le péage",
    lignes: [
      "Un porte-conteneurs de vingt-quatre mille boîtes demande environ seize mètres de tirant d'eau. En dessous, un port n'en est plus un : il devient une antenne qui paie un hub étranger pour être desservie.",
      "Djibouti, un peu plus d'un million d'habitants, achemine la quasi-totalité du commerce extérieur éthiopien et loue son sol à la fois à une base américaine et à la première base militaire chinoise à l'étranger.",
      "L'Afrique australe roule en 1 067 millimètres, l'Est en voie métrique, les lignes neuves en 1 435 : à chaque rupture d'écartement, une grue reprend chaque conteneur. En 1941, la Wehrmacht dut reconvertir kilomètre par kilomètre la voie large russe.",
      "Ce qu'une ligne porte ne dépend pas de sa longueur mais de sa charge à l'essieu et de sa rampe la plus dure : le pire kilomètre fixe le tonnage de toute la ligne, et le corridor n'aura qu'une norme sur quatre mille kilomètres.",
      "Le rail de Lobito, de l'Atlantique angolais vers la Copperbelt, est concédé pour trente ans à un consortium soutenu par Washington et Bruxelles ; la TAZARA, dix-huit cents kilomètres, fut construite par Pékin pour libérer le cuivre zambien.",
      "La quasi-totalité du trafic internet intercontinental circule dans des câbles sous-marins, quelques centaines de fils posés sur le fond. En mars 2024, des ruptures au large de la Côte d'Ivoire ont dégradé d'un coup une dizaine de pays africains.",
      "Le pouvoir n'est pas dans le câble mais dans la station d'atterrage : un bâtiment, une licence, un droit d'interception. Faute d'interconnexion directe, deux voisins africains ont longtemps payé un transit par Marseille pour se parler.",
      "Le fret aérien suit le rayon d'action, pas la population : Anchorage compte parmi les premiers aéroports de fret du monde parce qu'elle est à moins de dix heures de l'industrie du Nord. Depuis l'équateur, Paris, Dubaï et São Paulo tiennent dans un seul vol.",
      "À mille kilomètres par heure, le confort impose des rayons de courbure de l'ordre de la centaine de kilomètres, et l'acier s'allonge d'environ un centimètre par cent mètres pour dix degrés. Le tube n'est pas le problème : le droit de passage rectiligne l'est.",
      "Le commerce intra-africain reste autour de quinze pour cent du total, contre plus de soixante en Europe : la frontière coûte plus cher que la distance. Posséder la route et le péage, c'est décider qui roule, à quel prix, à quelle heure.",
    ],
    impact: [
      "Le monde apprend une route qui n'existait pas : traverser l'Afrique d'un océan à l'autre sur un seul écartement, sans rupture de charge, au lieu de contourner un continent par deux caps. Les constructeurs automobiles européens, les fabricants de batteries coréens et les fonderies chinoises, dont le cuivre et le cobalt sortent aujourd'hui de la Copperbelt par des ports saturés, dépendent désormais du tarif et du calendrier de ce passage.",
      "Djibouti, qui loue son sol et sa douane à l'Éthiopie enclavée, perd le monopole du débouché ; le corridor de Lobito, concédé pour trente ans à un consortium soutenu par Washington et Bruxelles, cesse d'être la seule voie du cuivre, et le transbordement qui nourrit les hubs du Golfe et d'Europe perd sa raison d'être. Marseille cesse d'être la salle d'attente de deux voisins africains qui veulent se parler : l'atterrage et l'interconnexion passent au centre du corridor, et le transit se facture dans l'autre sens.",
      "Un pays enclavé, le Tchad, la Centrafrique, la Zambie ou le Niger, cesse de payer la distance en douane et en rupture de charge : quinze pour cent de commerce intra-africain n'est pas une fatalité culturelle, c'est le prix cumulé d'une frontière et d'un écartement. Devient possible ce qui ne l'était pas : vendre à son voisin plus cher qu'à l'ancienne métropole, et transformer sur place ce qui partait brut parce que le brut seul supportait le coût du transport.",
    ],
  },
  {
    id: "science-technique-amont",
    titre: "La science et la technique — l'amont",
    lignes: [
      "Une intelligence louée s'appelle une API : le fournisseur fixe le prix, voit le trafic, plafonne le débit et retire le modèle quand il veut. AXIOM détient ses poids, ou AXIOM n'est qu'un compte client.",
      "Le calcul est physique : la mémoire à haute bande passante sort de trois entreprises au monde, le conditionnement avancé d'un seul fondeur, et depuis octobre 2022, une simple règle d'exportation du département américain du Commerce suffit à en priver un continent entier.",
      "ASML est le seul constructeur de graveurs à ultraviolet extrême sur Terre : sans une de ses machines, aucune puce de génération avancée n'existe nulle part. Un monopole d'amont vaut mieux que dix marchés d'aval.",
      "Le mécanisme tient en trois pièces : des gouttes d'étain vaporisées au laser des dizaines de milliers de fois par seconde, un plasma qui émet à 13,5 nanomètres, et des miroirs de Zeiss, car aucune lentille ne laisse passer cette lumière.",
      "Une pièce n'est jamais plus précise que l'outil qui la coupe, et les commandes numériques du monde viennent pour l'essentiel du Japon et d'Allemagne. FORGE achète les machines qui font les machines, avant d'acheter des usines.",
      "La fusion ne manque pas de carburant, elle manque de tritium : il faut le produire sur place en bombardant du lithium-6 dans la couverture du réacteur. Qui maîtrise la couverture maîtrise le cycle, pas seulement la flamme.",
      "Le prix de l'énergie est le plancher de tous les autres prix — aluminium, hydrogène, dessalement, calcul. En décembre 2022, une cible du National Ignition Facility a rendu plus d'énergie que les lasers ne lui en avaient livré : ce plancher peut descendre.",
      "L'algorithme de Shor casse RSA et les courbes elliptiques ; d'où la doctrine moissonner maintenant, déchiffrer plus tard, et les archives chiffrées d'aujourd'hui déjà copiées. En août 2024, le NIST a normalisé la parade, et le monde entier l'implémente.",
      "Le vrai passe par un filtre étroit : quelques revues, quelques comités de prix, quelques agences de financement dont le NIH, premier bailleur biomédical du monde. AXIOM fonde ses revues, ses prix, ses archives : on viendra y être validé.",
      "Sauter une génération coûte moins cher que rattraper : l'Afrique n'a pas déroulé le cuivre, elle est passée au mobile, puis à la monnaie mobile avec M-Pesa. Le corridor ne recopiera pas le réseau électrique du XXe siècle.",
    ],
    impact: [
      "Le monde cesse de choisir entre deux fournisseurs d'amont : un troisième pôle détient ses poids, ses machines-outils et son cycle du tritium, et les laboratoires, les fondeurs et les États qui vivaient sous licence américaine ou chinoise disposent d'une seconde source. La validation elle-même se déplace : les revues, les prix et les archives d'AXIOM décident de ce qui compte comme un résultat, et l'on vient y être publié comme on venait à Stockholm ou à Bethesda.",
      "Le levier perd sa prise : une règle d'exportation du département américain du Commerce ne prive plus un continent de calcul dès lors que la mémoire, le conditionnement et les poids existent hors de sa juridiction, et l'extraterritorialité redevient une gêne au lieu d'une sentence. Les cinq maisons d'édition qui concentrent plus de la moitié des articles publiés dans le monde perdent leur péage le jour où le dépôt de référence d'un continent est ouvert, et le NIH cesse d'être le seul guichet qui décide quelle question mérite d'être posée.",
      "Un chercheur africain cesse d'émigrer pour accéder à un instrument : la paillasse, le calculateur et la revue sont sur le continent, et un résultat n'a plus besoin d'un visa pour exister. Devient possible pour les nations pauvres ce que le rattrapage interdisait : sauter une génération d'infrastructure au lieu de la refaire, comme le mobile a dispensé de dérouler le cuivre et la monnaie mobile d'ouvrir des agences.",
    ],
  },
  {
    id: "biotech-longevite-temps",
    titre: "La biotech — le temps comme actif",
    lignes: [
      "Toute politique bute sur la succession : l'empire d'Alexandre s'est fragmenté en quelques années après sa mort, en 323 avant notre ère. Un fondateur qui vit deux siècles ne transmet pas, il continue.",
      "La vélocité d'échappement est une affaire de dérivée : si la recherche ajoute plus d'un an d'espérance de vie par année vécue, l'écart cesse de se refermer. Ce n'est pas une promesse, c'est une pente.",
      "Les États décident sur cinq ans, les entreprises sur trois mois. Un décideur qui reste deux cents ans peut acheter aujourd'hui un actif qui ne rapporte qu'en l'an quatre-vingts, et personne au monde ne peut le lui disputer.",
      "Quatre facteurs — Oct4, Sox2, Klf4, c-Myc — ramènent une cellule adulte à l'état embryonnaire ; Nobel 2012. Trois d'entre eux seulement, c-Myc écarté pour son risque tumoral, ont restauré la vision de souris âgées en reprogrammant les cellules ganglionnaires de la rétine.",
      "L'âge biologique se mesure depuis 2013 par la méthylation de l'ADN, tissu par tissu ; et chez la souris, éliminer les cellules sénescentes allonge la durée de vie médiane. Ce qui se mesure se cible, ce qui se cible se finance.",
      "La première thérapie CRISPR autorisée, fin 2023, guérit la drépanocytose, dont la charge mondiale est très majoritairement africaine ; son prix dépasse deux millions de dollars par patient. VERDIA existe pour renverser cette phrase.",
      "En 2025, un nourrisson a reçu une thérapie d'édition de base conçue pour sa seule mutation, en quelques mois. La médecine devient fabrication à l'unité : elle se déplace vers l'atelier, plus vers l'entrepôt.",
      "On imprime déjà des tissus ; le verrou est la vascularisation, car aucune cellule ne survit à plus de quelques centaines de micromètres d'un capillaire. En attendant, des porcs modifiés par dizaines d'éditions fournissent reins et cœurs à des patients humains.",
      "Un médicament non approuvé n'existe pas : la FDA et l'EMA décident de fait ce qui est un traitement sur Terre, tandis que l'Union africaine vise 60 % de ses vaccins produits sur le continent d'ici 2040, contre presque rien aujourd'hui.",
      "Les populations africaines portent la plus grande diversité génétique humaine, alors que l'écrasante majorité des études pangénomiques repose sur des ascendances européennes. Le corridor détient l'échantillon de référence : on ne l'exporte pas, on vient le consulter à VERDIA.",
    ],
    impact: [
      "La médecine change d'échelle de temps : un décideur qui raisonne sur deux siècles finance des programmes qu'aucun État à cinq ans ni aucune entreprise à trois mois ne peut porter, et le monde entier hérite des molécules qui en sortent. Les malades de la drépanocytose, dont la charge est très majoritairement africaine, cessent de dépendre d'un laboratoire étranger pour savoir si leur guérison sera fabriquée, à quel prix et pour qui.",
      "La Food and Drug Administration et l'Agence européenne des médicaments cessent d'être les deux seuls tribunaux qui décident ce qui est un traitement sur Terre : une autorité souveraine autorise à VERDIA, et un produit qu'elles n'ont ni examiné ni approuvé existe malgré tout pour des centaines de millions de personnes. Le prix de plus de deux millions de dollars par patient de la première thérapie CRISPR autorisée ne tient que par l'absence d'un second fabricant ; il ne survit pas à une usine implantée là où se trouve la maladie.",
      "L'échantillon de référence de l'espèce cesse d'être européen : les populations africaines portent la plus grande diversité génétique humaine, et un panel qu'on ne peut plus exporter oblige à venir le consulter au lieu de le prélever. Devient possible ce qui ne l'était pas : qu'une maladie soit traitée là où elle tue et non là où elle paie, et que la cible africaine de production de vaccins sur le continent tienne sans attendre la levée d'un embargo à l'exportation.",
    ],
  },
  {
    id: "sante-education-arsenal",
    titre: "L'hôpital et l'université — l'arsenal",
    lignes: [
      "L'Organisation mondiale de la santé pose le rapport : l'Afrique supporte environ le quart de la charge mondiale de morbidité avec quelques pour cent du personnel soignant de la planète. La pénurie n'est pas médicale, elle est comptable.",
      "Le paludisme se prévient et se traite : l'Afrique concentre pourtant environ 95 % des décès qu'il cause, en majorité des enfants de moins de cinq ans, et l'Afrique subsaharienne environ 70 % des décès maternels du monde. Un continent meurt de ce qui se soigne ailleurs.",
      "L'Afrique importe la majeure partie des médicaments qu'elle consomme et ne fabriquait, avant 2020, qu'environ 1 % des vaccins qu'elle utilise. En 2021, quand l'Inde a suspendu ses exportations, le continent a mesuré ce que vaut une usine qu'on ne possède pas.",
      "Cuba, île pauvre et sous embargo, affiche l'une des densités médicales les plus élevées du monde et loue ses brigades médicales à des États entiers. La santé s'y convertit en devises et en influence : pas de la charité, un instrument.",
      "La drépanocytose frappe surtout des populations africaines. Sa première thérapie génique, autorisée fin 2023, a été mise sur le marché américain à plus de deux millions de dollars par patient : le mal est ici, le remède est ailleurs, et son prix fait frontière.",
      "En 2024, un essai conduit en Afrique du Sud et en Ouganda n'a relevé aucune infection parmi les jeunes femmes recevant un injectable semestriel contre le VIH. Les corps africains servent aux essais ; le brevet et l'usine décident ensuite de qui vit.",
      "Cinq maisons d'édition concentrent plus de la moitié des articles scientifiques publiés dans le monde, avec des marges d'exploitation supérieures à celles de la plupart des industries. Qui paie l'accès décide qui peut chercher : la bibliothèque d'AXIOM est une pièce de défense.",
      "Une étude du MIT a estimé le chiffre d'affaires annuel cumulé des entreprises fondées par ses anciens élèves à près de deux mille milliards de dollars. Une université de rang mondial n'est pas un ornement : c'est une fabrique d'industries.",
      "Narayana Health opère à cœur ouvert en Inde pour une fraction du tarif américain : la répétition du même geste, plusieurs fois par jour, abaisse le coût et améliore les résultats. Le volume est une technologie médicale ; VERDIA en aura.",
      "Un médecin part rarement pour le seul salaire : il part faute de bloc, d'imagerie, de confrères et de cas complexes. On garde les praticiens en bâtissant l'hôpital où leur geste a un sens, pas en fermant les frontières.",
    ],
    impact: [
      "La santé cesse d'être un poste d'aide et redevient une offre : blocs opératoires, usines de principes actifs et brigades de praticiens se vendent, et les États en pénurie de soignants, y compris au Nord où la pyramide des âges se retourne, achètent un service au lieu d'envoyer un chèque. Les systèmes hospitaliers européens et golfiens, qui recrutent aujourd'hui des infirmiers et des médecins formés ailleurs, négocient désormais avec le pays qui les a formés.",
      "Le prélèvement gratuit de capital humain prend fin : le service de santé britannique, les systèmes canadien et australien et les hôpitaux du Golfe encaissaient un praticien dont l'école avait été payée par un budget africain, perte que le BMJ a chiffrée en milliards de dollars pour neuf pays. Les exportateurs qui fournissent la majeure partie des médicaments consommés sur le continent perdent un marché captif ; la suspension des exportations indiennes en 2021 avait montré que ce marché n'était pas une clientèle mais une dépendance.",
      "Un enfant cesse de mourir de ce qui se soigne ailleurs : l'Afrique concentre environ 95 % des décès dus au paludisme et l'Afrique subsaharienne environ 70 % des décès maternels du monde, et cet écart est comptable avant d'être médical. Devient possible ce que la pénurie interdisait : un continent qui fabrique son vaccin, forme son chirurgien et garde son médecin, parce que le bloc, l'imagerie et les cas complexes sont enfin là où il est né.",
    ],
  },
  {
    id: "les-hommes-interet-compose",
    titre: "Les hommes — l'intérêt composé",
    lignes: [
      "L'Afrique est le continent le plus jeune du monde : son âge médian tourne autour de dix-neuf ans, contre plus de quarante en Europe et près de cinquante au Japon. NOVA-AXE n'embauche pas une main-d'œuvre, il hérite d'une génération.",
      "Les Nations unies projettent que plus de la moitié de la croissance démographique mondiale d'ici 2050 viendra d'Afrique, et qu'environ un habitant de la planète sur quatre y vivra. Le corridor coupe ce réservoir en son milieu.",
      "Le dividende démographique ne tient pas au nombre mais au ratio : quand les actifs dépassent nettement les dépendants, épargne et productivité montent ensemble. Les économistes attribuent à cette fenêtre une part substantielle de la croissance est-asiatique.",
      "Cette fenêtre se referme d'elle-même : ouverte quelques décennies en Asie de l'Est, puis close par le vieillissement. L'An Zéro en 2033 tombe pendant l'ouverture africaine ; le même corridor bâti trente ans plus tard n'aurait plus de démographie à capter.",
      "Une mine s'appauvrit à mesure qu'on creuse : la teneur du minerai baisse, jamais l'inverse. Un homme formé en forme d'autres. Le capital humain est la seule ressource dont le rendement croît avec l'usage.",
      "Former un médecin coûte des années et de l'argent public au pays d'origine ; le pays d'accueil encaisse le praticien sans avoir payé l'école. Une étude publiée par le BMJ a chiffré cette perte en milliards de dollars pour neuf pays africains.",
      "Les pays riches trient : le visa H-1B américain est plafonné à soixante-cinq mille par an, l'Entrée express canadienne note l'âge, le diplôme et la langue. Ils n'importent pas des populations, ils importent des rendements. NOVA-AXE fera pareil, dans l'autre sens.",
      "Morris Chang a passé vingt-cinq ans chez Texas Instruments avant que Taïwan ne le rappelle, passé la cinquantaine, pour y fonder TSMC. On ne retient pas des cerveaux : on construit la seule paillasse où ils acceptent de travailler.",
      "La Corée a créé le KAIST en 1971 sur un prêt américain, avec un objectif écrit : faire revenir ses scientifiques partis aux États-Unis. La Chine a refait l'opération une génération plus tard. Le retour se planifie, il ne s'espère pas.",
      "Être le pays où l'on vient travailler, c'est encaisser une formation payée par d'autres : chaque ingénieur qui descend à AXIOM arrive avec vingt ans d'école déjà financée ailleurs. Le corridor n'achète pas des hommes, il achète du temps déjà écoulé.",
    ],
    impact: [
      "Le monde vient chercher ses actifs là où ils naissent : plus de la moitié de la croissance démographique mondiale d'ici 2050 viendra d'Afrique, et les économies vieillissantes, du Japon à l'Allemagne, dépendent d'un continent qui a cessé de laisser partir ses vingt ans. Le sens du tri s'inverse : c'est le corridor qui note l'âge, le diplôme et la langue, et le reste du monde qui dépose un dossier.",
      "Les dispositifs qui vivaient d'une immigration choisie perdent leur gisement : le visa H-1B plafonné à soixante-cinq mille par an, l'Entrée express canadienne et sa grille de points, les campus anglo-saxons dont les droits de scolarité étrangers financent la recherche, tous supposaient que le talent n'avait nulle part ailleurs où aller. Ce postulat tombe le jour où une paillasse comparable existe à AXIOM, comme il est tombé pour Taïwan quand Morris Chang est rentré fonder TSMC après vingt-cinq ans chez Texas Instruments.",
      "Un pays pauvre cesse de subventionner les hôpitaux et les laboratoires des pays riches : la fenêtre démographique, ces quelques décennies où les actifs dépassent nettement les dépendants, se referme d'elle-même, et elle est ouverte maintenant. Devient possible ce qui relevait jusqu'ici du vœu : le retour organisé plutôt qu'espéré, comme la Corée l'a fait avec le KAIST en 1971 et la Chine une génération plus tard, avec la jeunesse et le lieu où l'employer réunis au même endroit.",
    ],
  },
  {
    id: "militaire-refus-acces",
    titre: "Le refus d'accès — le prix d'entrée",
    lignes: [
      "La conquête exige de tenir le sol ; le refus d'accès exige seulement de rendre l'entrée insupportable. Les manuels de contre-insurrection comptent vingt à vingt-cinq soldats pour mille habitants : occuper le corridor demanderait des armées que nul État ne lève.",
      "En mer Rouge, des intercepteurs à plusieurs millions de dollars ont été tirés sur des drones qui en coûtaient quelques dizaines de milliers. L'agresseur gagnait en se faisant abattre. NOVA-AXE se tient du côté bon marché de l'échange.",
      "Un destroyer moderne coûte de l'ordre de deux milliards de dollars ; le missile antinavire qui l'oblige à s'écarter en coûte quelques millions. Une bulle de déni ne coule rien : elle interdit d'approcher.",
      "La mine reste l'outil le moins cher du déni maritime : en 1991, deux bâtiments américains ont été mis hors de combat dans le Golfe par des engins valant quelques milliers de dollars pièce.",
      "La dissuasion tient sur trois jambes parce qu'aucune ne suffit : silos durcis et dispersés, vecteurs mobiles, sous-marins en patrouille depuis la façade atlantique angolaise. L'eau de mer arrête le radar en quelques centimètres ; ce qu'on ne trouve pas rend la seconde frappe certaine.",
      "Le centre de Cheyenne Mountain est creusé sous quelque six cents mètres de granite et posé sur plus d'un millier de ressorts. Les pénétrateurs les plus lourds s'arrêtent à quelques dizaines de mètres de roche : le commandement descend, il ne se retranche pas.",
      "Les satellites d'alerte repèrent la flamme d'un tir balistique en quelques secondes, et toute la décision tient dans la minute suivante. Une constellation de petits satellites ne se décapite pas : aucun nœud n'y compte assez.",
      "Un essai antisatellite de 2007 a dispersé des milliers de débris encore suivis aujourd'hui. Casser une orbite la ferme aussi à celui qui a tiré : au-dessus du corridor, l'orbite basse devient un otage partagé.",
      "L'essentiel du cobalt mondial sort du Katanga et de la Copperbelt. Une usine automobile tient quelques jours de pièces, pas quelques mois : une coupure ne se négocie pas, elle se lit au trimestre suivant.",
      "Nul n'entre parce que nul ne veut payer. La dissuasion ne cherche pas la victoire, elle place le prix au-dessus de l'enjeu : le corridor n'a pas à vaincre, il a à rester trop cher.",
    ],
    impact: [
      "Toute marine qui projetait sa puissance vers l'Afrique doit désormais calculer un prix d'entrée avant d'appareiller : les constructeurs automobiles, dont les usines tiennent quelques jours de pièces et non quelques mois, dépendent d'un corridor qu'aucune flotte ne peut plus ouvrir de force.",
      "AFRICOM, Barkhane et les accords de défense hérités tiraient leur influence de ce qu'aucun État sahélien ne pouvait se défendre seul ; une bulle de déni bâtie sur des missiles à quelques millions contre des bâtiments à quelques milliards retire l'argument, et le loyer des bases avec lui.",
      "Pour la première fois, un État pauvre peut acheter son inviolabilité au lieu de la mendier : le déni d'accès coûte une fraction de la conquête, et sept nations qui mutualisent leurs mines, leurs missiles et leur profondeur cessent d'avoir à choisir un protecteur.",
    ],
  },
  {
    id: "renseignement-multiplicateur",
    titre: "Le renseignement — le multiplicateur",
    lignes: [
      "Le renseignement ne s'ajoute pas aux autres puissances, il les multiplie. À Midway, en 1942, une flotte inférieure l'a emporté parce que ses cryptanalystes savaient où l'autre irait. La même force, mieux informée, est une autre force.",
      "Une munition guidée n'est que le dernier maillon, et le moins cher, d'une chaîne qui part d'un capteur et aboutit à une coordonnée. Sans renseignement, une armée frappe le vide : elle sert le renseignement, jamais l'inverse.",
      "La quasi-totalité du trafic intercontinental de données passe par des câbles sous-marins, non par satellite. Un câble n'est vulnérable qu'à l'atterrage : c'est là qu'on le lit, et c'est là que le corridor place les siens.",
      "Au début des années soixante-dix, une opération américaine a posé un enregistreur sur un câble soviétique au fond de la mer d'Okhotsk. Ce qui se transporte s'écoute : posséder la route, c'est posséder la copie.",
      "Des constellations commerciales photographient chaque jour l'ensemble des terres émergées. Compter des wagons, des cuves et des tas de minerai n'est plus un secret d'État, c'est un abonnement : l'avantage revient à qui traite plus vite.",
      "Tout navire de commerce de plus de trois cents tonneaux en voyage international émet sa position en clair, par obligation internationale — et l'éteindre est en soi un signal. Qui lit ces émissions connaît les cargaisons d'un pays avant son propre ministère, et achète, vend ou coupe en conséquence.",
      "Le dollar figure d'un côté d'environ neuf opérations de change sur dix, et la compensation tient dans quelques chambres. Lire ces flux, c'est voir les paiements du monde avant leur règlement ; l'AXE vise ce poste d'observation autant que la monnaie.",
      "Les satellites de navigation portent des horloges atomiques dont le signal horodate les réseaux électriques, les télécoms et les marchés. Dépendre du temps d'un autre, c'est lui laisser la main sur l'heure de ses propres transactions.",
      "Le goulot n'est plus la collecte mais la corrélation : les volumes captés dépassent depuis longtemps ce qu'on sait relire. AXIOM n'est pas une capitale de l'intelligence artificielle par prestige, c'est l'endroit où le bruit devient préavis.",
      "Un accord de partage signé en 1946 entre deux États, élargi à cinq en 1956, les lie aujourd'hui plus étroitement qu'aucun traité militaire. Les sept nations traversées mettent leurs écoutes en commun avant leurs armées : le pacte de renseignement précède l'alliance, il ne la suit pas.",
    ],
    impact: [
      "Toute chancellerie doit désormais supposer que ses instructions vers l'Afrique sont lues avant d'être exécutées : les atterrages du corridor, les émissions de position obligatoires des navires et la compensation de l'AXE donnent la copie des flux dont vivent les ministères du commerce et les salles de marché.",
      "L'accord de partage signé en 1946, élargi à cinq États en 1956, tenait son avantage de la géographie des câbles : atterrages chez eux, et deux voisins africains payant un transit par Marseille pour se parler. Rapatrier l'atterrage coupe la copie à la source.",
      "Un État pauvre cesse d'apprendre par la presse étrangère ce que contiennent ses propres cargaisons : les images quotidiennes des terres émergées et les positions de navires se paient par abonnement, et le renseignement devient le premier domaine où le rattrapage ne demande ni flotte ni siècle.",
    ],
  },
  {
    id: "spectre-et-orbites",
    titre: "Le spectre — fréquences et créneaux orbitaux",
    lignes: [
      "L'orbite géostationnaire est un cercle unique, à 35 786 kilomètres au-dessus de l'équateur : c'est la seule position d'où un satellite paraît immobile, et les créneaux y sont comptés un par un.",
      "La Déclaration de Bogota de 1976, par laquelle huit États équatoriaux revendiquaient l'arc géostationnaire au-dessus d'eux, a été écartée : le traité de 1967 interdit de s'approprier l'espace, il n'interdit pas de l'occuper.",
      "À l'UIT, seuls les États déposent, la priorité suit la date, et un dossier non mis en service dans les sept ans tombe. Sept administrations qui déposent tôt valent une flotte qui arrive tard.",
      "Les conférences mondiales des radiocommunications décident les allocations État par État, une voix chacun : sept voix coordonnées dans un groupe régional pèsent davantage que sept marchés séparés qui négocient seuls.",
      "Aux États-Unis, la mise aux enchères de la bande C a rapporté plus de quatre-vingts milliards de dollars pour le seul droit d'émettre au-dessus d'un territoire : le spectre est une rente sans extraction ni transport.",
      "À la fin des années 1980, le royaume des Tonga a déposé une série de créneaux géostationnaires au-dessus du Pacifique puis les a loués : la ressource n'avait coûté que la diligence de remplir les dossiers avant les autres.",
      "Un lancement depuis l'équateur n'a aucun changement de plan orbital à payer pour atteindre la géostationnaire ; c'est pour cela que Kourou est à cinq degrés de latitude nord. FORGE est posée sur la ligne même.",
      "Depuis l'équateur, l'arc géostationnaire entier se voit haut au-dessus de l'horizon : le corridor forme une ceinture naturelle de stations de contrôle, et la station au sol commande le satellite autant que l'orbite le porte.",
      "L'Afrique du Sud a légiféré pour protéger le silence radio autour de son réseau de radiotélescopes : le silence est une ressource qu'un État décrète, puis loue à ceux qui écoutent loin.",
    ],
    impact: [
      "Tout opérateur qui veut émettre au-dessus de l'Afrique doit désormais déposer après sept administrations coordonnées : à l'Union internationale des télécommunications la priorité suit la date, et les constellations, les diffuseurs et les armateurs découvrent que le créneau visé est déjà inscrit au nom d'un autre.",
      "Intelsat, SES et Eutelsat tiennent leur rente de dossiers déposés quand personne d'autre ne déposait ; sept administrations qui inscrivent tôt, mettent en service dans les sept ans et votent ensemble en conférence mondiale font tomber les créneaux dormants et reprennent la position sans l'acheter.",
      "Une nation sans industrie découvre qu'une ressource se prend au greffe : remplir les dossiers avant les autres a suffi aux Tonga pour louer des créneaux du Pacifique, et le silence radio, comme le spectre, se décrète puis se loue sans rien extraire du sol.",
    ],
  },
  {
    id: "l-orbite-le-surplomb",
    titre: "L'orbite — le surplomb",
    lignes: [
      "La Terre tourne. À l'équateur, sa surface file vers l'est à 465 mètres par seconde ; aux pôles, à zéro. Un lanceur équatorial reçoit cette vitesse gratuitement, avant même d'allumer.",
      "L'Europe n'a pas posé son port spatial à Kourou, à cinq degrés de l'équateur, par goût de la Guyane : depuis l'équateur, on rejoint l'orbite géostationnaire sans changement de plan, et la charge utile monte d'autant.",
      "La puissance spatiale ne se mesure plus au lanceur mais à la cadence. Un seul opérateur privé américain place aujourd'hui la majeure partie de la masse mise en orbite chaque année, tous pays confondus.",
      "Plus de la moitié des satellites actifs autour de la Terre appartiennent à une seule constellation commerciale. Créneaux et fréquences s'attribuent par ordre de dépôt à l'Union internationale des télécommunications : l'orbite se prend au greffe avant de se prendre au feu.",
      "Le GPS est la propriété du gouvernement des États-Unis, opéré par sa force spatiale. C'est un service rendu, non un droit acquis : ce qui est offert peut être dégradé, région par région, sans préavis.",
      "Le signal ne sert pas qu'à s'orienter. Ses horloges atomiques horodatent les réseaux électriques, les relais téléphoniques et les carnets d'ordres boursiers. Retirer l'heure à un pays suffit à l'arrêter sans le toucher.",
      "Quatre systèmes seulement couvrent le globe : GPS, GLONASS, Galileo, BeiDou. L'Europe a bâti Galileo précisément pour cesser de demander l'heure à quelqu'un. NOVA-AXE bâtira le sien pour la même raison, et pas une autre.",
      "Depuis l'orbite basse, on voit tout, on écoute tout, on guide tout — et l'on se trouve déjà à mi-chemin énergétique de n'importe quel point du système solaire. C'est le sommet du puits, pas un balcon.",
      "Un ascenseur spatial ne s'amarre que sur l'équateur : seul un contrepoids placé au-dessus de l'équateur, à 35 786 kilomètres, reste immobile dans le ciel. La géométrie, pas la diplomatie, désigne les États qui pourront en héberger un.",
      "Mettre un kilogramme en orbite coûte aujourd'hui quelques milliers de dollars ; l'énergie pure pour l'y hisser vaut une quinzaine de kilowattheures, moins d'un dollar au tarif industriel. L'ascenseur et l'anneau orbital récupèrent tout l'écart.",
    ],
    impact: [
      "Tout lanceur visant la géostationnaire doit désormais comparer le coût de son changement de plan orbital au tarif d'un tir depuis l'équateur, et les réseaux électriques, les opérateurs télécoms et les places boursières, qui horodatent tout sur des horloges atomiques, disposent d'une source d'heure de plus.",
      "Le GPS cessait d'être un droit le jour où son propriétaire le dégradait ; il cesse d'être un levier le jour où la région visée porte sa propre constellation — et Kourou, choisie pour ses cinq degrés de latitude, perd l'avantage géométrique qui justifiait ce choix.",
      "L'accès à l'orbite quitte le club des puissances anciennes : la géométrie, non la diplomatie, désigne qui peut ancrer un ascenseur spatial, et elle désigne l'équateur — donc des pays qui n'avaient jusqu'ici ni lanceur, ni créneau, ni voix au dépôt.",
    ],
  },
  {
    id: "le-systeme-solaire-la-premiere-occupation",
    titre: "Le système solaire — la première occupation",
    lignes: [
      "On s'échappe de la Lune à 2,38 kilomètres par seconde, contre 11,2 depuis la Terre. Un kilogramme d'eau extrait là-haut arrive en orbite pour une fraction du coût du même kilogramme monté d'ici.",
      "Les cratères polaires lunaires contiennent des fonds que le Soleil n'a pas éclairés depuis des milliards d'années, sous les quarante kelvins. En 2009, la sonde LCROSS y a percuté et confirmé la présence de glace d'eau.",
      "Cette glace se sépare en hydrogène et en oxygène : c'est du carburant déjà situé en haut du puits. À quelques kilomètres de là, les crêtes du pôle sud reçoivent le Soleil presque sans interruption.",
      "L'hélium 3, que le vent solaire dépose depuis des milliards d'années dans un régolithe sans champ magnétique pour l'en protéger, s'y trouve à quelques parties par milliard. Dilué et non rare, il ira à qui traitera la poussière par millions de tonnes.",
      "Les astéroïdes de classe M sont des cœurs de planétésimaux mis à nu : fer, nickel, platinoïdes en masse. Psyché, plus de deux cents kilomètres de diamètre, est la cible d'une sonde partie en 2023.",
      "Les valorisations en quintillions de dollars sont un artefact : au premier chargement livré, le cours du métal s'effondre. La rente n'est jamais dans le minerai, elle est dans le contrôle du corridor par lequel il descend.",
      "Le verre fluoré ZBLAN cristallise en refroidissant sous l'effet de la convection terrestre. Tiré en microgravité, il ne cristallise plus : on lui prête une atténuation inférieure d'un ordre de grandeur à celle de la silice.",
      "Sans poussée d'Archimède, rien ne sédimente : des alliages d'éléments non miscibles restent homogènes, un échantillon fond en lévitation sans creuset pour le contaminer, un tissu imprimé tient sans s'affaisser sous son propre poids.",
      "Un vaisseau assemblé en orbite n'a plus à survivre à son décollage ni à entrer dans une coiffe. Le miroir de 6,5 mètres du télescope Webb fut plié pour tenir, puis déployé avec trois cent quarante-quatre points de défaillance unique.",
      "Le traité de 1967 interdit de s'approprier un corps céleste, mais non ce qu'on en extrait — les États-Unis et le Luxembourg l'ont inscrit dans leur droit. Le premier installé fixe la norme, la zone de sécurité et le prix.",
    ],
    impact: [
      "Toute mission au-delà de l'orbite basse doit désormais choisir entre hisser son ergol depuis un puits de 11,2 kilomètres par seconde et l'acheter à qui l'extrait de la glace polaire lunaire, dont on s'échappe à 2,38 : agences et assureurs recalculent leurs devis sur cet écart.",
      "Les grands maîtres d'œuvre du spatial tirent leur monopole d'un savoir-faire de pliage : le miroir de 6,5 mètres de Webb est entré dans une coiffe au prix de trois cent quarante-quatre points de défaillance unique. L'assemblage en orbite supprime la contrainte, donc la rente.",
      "Le traité de 1967 interdit de s'approprier un corps céleste, non ce qu'on en extrait : une nation qui n'a jamais rien raffiné chez elle peut s'installer la première, et le premier installé fixe la zone de sécurité, la norme et le prix.",
    ],
  },
  {
    id: "economie-reelle-marge-en-aval",
    titre: "L'économie réelle — la marge en aval",
    lignes: [
      "Prebisch et Singer l'ont établi dès 1950 : sur la longue durée, le prix des matières premières décroche de celui des produits manufacturés. Exporter brut, c'est vendre chaque année un peu moins cher le même effort.",
      "La Côte d'Ivoire et le Ghana fournissent la majeure partie du cacao mondial ; les planteurs captent une part à un chiffre du prix de la tablette. Le reste va à la transformation, à la marque et à la distribution, toutes situées ailleurs.",
      "La RDC extrait environ 70 % du cobalt mondial et n'en raffine presque rien : l'essentiel part vers la Chine, qui tient le raffinage. Le corridor traverse le gisement ; la question n'est pas de le posséder, mais de le transformer sur place.",
      "En 2020, l'Indonésie a interdit l'exportation de minerai de nickel brut. Les fonderies sont venues à la ressource, et la valeur de ses exportations de produits nickelés a été multipliée par un ordre de grandeur en quelques années.",
      "Il faut de l'ordre de quatorze mégawattheures pour produire une tonne d'aluminium : le métal est de l'électricité solidifiée. Le site d'Inga, sur le Congo, porte le plus grand potentiel hydroélectrique de la planète. On n'exporte pas le courant, on l'exporte incorporé.",
      "L'Afrique porte près d'un cinquième de l'humanité et produit environ 2 % de la valeur ajoutée manufacturière mondiale. L'écart n'est pas un retard : c'est une place assignée, et une place assignée se reprend par la chaîne de transformation.",
      "Qualcomm perçoit une redevance calculée sur le prix du téléphone entier, pas sur celui de sa puce. Apple et Google prélèvent jusqu'à 30 % sur chaque transaction de leurs boutiques. Une taxe technologique se perçoit à l'endroit du standard.",
      "Le jeu d'instructions ARM se trouve dans la quasi-totalité des téléphones du monde, et chaque puce fabriquée verse une redevance. Écrire la norme rapporte plus longtemps que fabriquer l'objet. AXIOM écrira les normes du corridor.",
      "Hirschman l'a démontré en 1945 : dans un échange, domine celui pour qui il pèse peu, dépend celui pour qui il pèse tout. La dépendance asymétrique se construit dossier par dossier, jamais par traité général.",
      "Plus des quatre cinquièmes du commerce mondial passent par la mer, donc par une poignée de détroits. Le corridor de Lobito relie déjà la Copperbelt à l'Atlantique ; un axe qui joint l'Atlantique à l'océan Indien crée un passage que personne n'a à louer.",
    ],
    impact: [
      "Tout acheteur de cobalt, de cuivre ou de cacao doit désormais traiter avec un vendeur de produit fini : constructeurs automobiles, chocolatiers et fondeurs voient l'étage où se prenait leur marge se déplacer à l'intérieur du corridor, et paient au prix du transformateur.",
      "La Chine raffine l'essentiel d'un cobalt qu'elle n'extrait pas : sa rente tient à un étage de chimie, non à un gisement. L'interdiction d'exporter le minerai brut, méthode indonésienne de 2020, la vide sans conflit en faisant venir les fonderies à la ressource.",
      "Le décrochage établi par Prebisch et Singer en 1950 cesse d'être une fatalité pour qui tient l'électricité de sa propre transformation : une tonne d'aluminium demande de l'ordre de quatorze mégawattheures, et le potentiel d'Inga permet d'exporter le courant incorporé au métal plutôt que le minerai.",
    ],
  },
  {
    id: "la-finance-registre-du-monde",
    titre: "La finance — le registre du monde",
    lignes: [
      "Une monnaie de réserve n'est pas une monnaie forte : c'est une monnaie que les autres sont contraints de détenir. Le dollar occupe un peu moins de six dixièmes des réserves mondiales, faute d'alternative aussi liquide. L'AXE ne se décrète pas : il se rend nécessaire.",
      "Giscard d'Estaing a nommé cela le privilège exorbitant. En 1971, Nixon a coupé la convertibilité en or et le dollar a gardé son empire : l'obligation de le détenir ne reposait pas sur le métal. L'ancre de l'AXE sera le corridor.",
      "La réserve tient à la profondeur : un marché de dette capable d'absorber un ordre de vente massif sans que le prix bouge. Tant que la dette libellée en AXE n'offre pas ce coussin, aucune banque centrale ne s'y logera.",
      "SWIFT ne transporte pas d'argent, seulement des instructions, depuis une coopérative de droit belge. Les banques iraniennes en ont été débranchées en 2012, plusieurs banques russes en 2022. NOVA-AXE bâtit son propre réseau de messagerie avant d'en avoir besoin.",
      "Tout paiement en dollars entre deux banques étrangères finit par toucher un compte à New York : BNP Paribas a payé près de neuf milliards en 2014 pour cette seule raison. Qui tiendra le règlement de l'AXE tiendra la juridiction du corridor.",
      "La quasi-totalité des actions américaines est immobilisée au nom d'une seule entité, Cede & Co., prête-nom de la DTC. Des millions de porteurs ne détiennent qu'une ligne dans un registre qu'ils ne tiennent pas. Le corridor tiendra le sien à AXIOM.",
      "Environ 190 milliards d'euros d'avoirs de la banque centrale russe dorment chez Euroclear, à Bruxelles. Aucune armée n'est entrée : les titres étaient inscrits là, il a suffi de cesser d'écrire. Un dépositaire central est une arme sans détonation.",
      "Trois agences notent la solvabilité du monde et les règles prudentielles renvoient à leurs lettres : une dégradation déclenche des ventes automatiques. Les trois ont pourtant retiré le AAA aux États-Unis sans que la demande faiblisse : la note suit la puissance.",
      "Le fonds souverain norvégien détient en moyenne près de 1,5 % de chaque société cotée de la planète : un actionnaire silencieux dans presque tous les conseils. Le fonds de NOVA-AXE ne cherchera pas le rendement, il cherchera les sièges.",
      "Le prix d'un métal ne se fixe pas là où il sort du sol, mais là où s'échange le contrat papier. En 2022, le London Metal Exchange a suspendu le nickel et annulé des transactions conclues. Le cobalt du corridor se cotera chez lui.",
    ],
    impact: [
      "Toute banque centrale qui veut couvrir ses achats de cuivre, de cobalt et de terres rares doit désormais détenir de l'AXE et ouvrir un compte de règlement à AXIOM : la réserve suit la facture, et la facture est libellée dans le corridor.",
      "Le privilège exorbitant se déplace : le Trésor américain perd l'acheteur contraint qui finançait son déficit, SWIFT cesse d'être le carnet d'instructions unique, et Euroclear comme la DTC voient partir les titres que plus personne n'accepte d'immobiliser chez un tiers révocable.",
      "Un État africain emprunte enfin dans la monnaie où il vend, et cesse de rembourser en dollars ce qu'il gagne en métal : le risque de change, qui a précipité les crises de dette du continent, sort de l'équation, et la note cesse de précéder la solvabilité.",
    ],
  },
  {
    id: "etat-civil-identite-paiement",
    titre: "L'identité et le rail de paiement",
    lignes: [
      "Un État ne peut ni taxer, ni conscrire, ni soigner, ni créditer ce qu'il ignore. Le registre des personnes précède l'armée : il définit qui l'armée est censée défendre et au nom de qui elle tire.",
      "Guillaume le Conquérant a fait inventorier l'Angleterre en 1086 avant d'en lever l'impôt ; la France a retiré l'état civil au clergé en 1792. Compter les vivants est un acte de souveraineté, pas de bureaucratie.",
      "Une part considérable des enfants d'Afrique subsaharienne n'est jamais enregistrée à la naissance. Juridiquement, ils n'existent pas : ni héritage, ni passeport, ni plainte recevable, ni compte ouvert à leur nom.",
      "L'Inde a inscrit plus de 1,3 milliard de personnes dans Aadhaar, puis a bâti l'UPI par-dessus. Résultat : des milliards de paiements chaque mois, qui ne traversent aucun réseau de carte étranger.",
      "SWIFT ne transporte pas d'argent, seulement des messages. Le vrai goulot est ailleurs : presque tout paiement en dollars finit compensé par une poignée de banques correspondantes installées à New York.",
      "L'exclusion de banques iraniennes en 2012, puis russes en 2022, a révélé la nature du rail : un tuyau qu'on ne possède pas est une laisse, dont un autre fixe la longueur.",
      "En 2021, les réserves de la banque centrale afghane, déposées à New York, ont été gelées en une journée. Une réserve de change détenue chez l'adversaire n'est pas une réserve : c'est un dépôt révocable.",
      "M-Pesa a bancarisé la majorité des adultes kényans sans ouvrir une seule agence. La leçon tient en une phrase : le rail se construit sur le téléphone qui existe, pas sur les guichets qui manquent.",
      "L'Estonie fait circuler ses registres sur X-Road et en garde une copie souveraine hébergée au Luxembourg. Un État capable de perdre son territoire sans perdre ses registres reste un État.",
      "NOVA-AXE doit posséder trois choses au même rang qu'une armée : le registre des personnes, l'identifiant unique et la chambre de compensation de l'AXE — sur ses serveurs, sous son droit, dans son corridor.",
    ],
    impact: [
      "Un paiement entre Kinshasa et N'Djamena n'a plus à toucher une banque correspondante de New York : il se compense à AXIOM, en AXE, et les commerçants, les migrants et les trésors publics des sept nations cessent de louer un tuyau dont un autre fixe la longueur.",
      "Visa, Mastercard et Western Union perdent la commission que leur garantissait l'absence de rail local, et le Trésor américain perd l'arme du gel : ce qui a été fait en une journée aux réserves afghanes déposées à New York devient inopérant sur des registres tenus dans le corridor.",
      "Un enfant enregistré à la naissance devient un héritier, un plaignant recevable et un emprunteur possible : l'inscription universelle convertit une population juridiquement absente en base taxable, en marché intérieur et en épargne mobilisable, ce qu'aucune décennie d'aide extérieure n'a jamais produit.",
    ],
  },
  {
    id: "droit-normes-arbitrage",
    titre: "La norme — la rente du rédacteur",
    lignes: [
      "Une norme n'est pas un texte, c'est un péage. Le conteneur maritime obéit à la norme ISO 668 : ports, grues, camions et navires du monde entier ont été rebâtis autour de ce document. NOVA-AXE publie ses formats avant de couler son premier quai.",
      "Les normes comptables décident de ce qui est un actif. IFRS 16 a fait entrer les loyers au bilan et modifié, par une écriture, la dette apparente de milliers d'entreprises. Le corridor n'adopte pas une comptabilité, il en publie une.",
      "Un gisement n'existe financièrement que si une personne qualifiée le déclare selon un code reconnu, JORC en Australie, NI 43-101 au Canada. Sans cette signature, aucune place financière ne reconnaît la ressource. FORGE écrit son code.",
      "Qualcomm perçoit une redevance assise sur le prix de vente du téléphone, même sans une seule de ses puces à l'intérieur : ses brevets sont essentiels à la norme. AXIOM déposera dans la norme, jamais à côté.",
      "La Convention de New York de 1958 force les tribunaux de plus de cent soixante États à exécuter une sentence arbitrale étrangère ; le siège choisi désigne le juge d'appui. Londres et Singapour vivent de ce choix, AXIOM le prendra.",
      "Deux entreprises étrangères qui règlent en dollars transitent par une banque de New York, et cela suffit à fonder la compétence des procureurs américains. BNP Paribas a payé près de neuf milliards en 2014. L'AXE emportera la même compétence.",
      "Le règlement européen sur les données s'applique à toute entreprise traitant les informations d'un résident européen, où qu'elle soit. Aligner coûtant moins cher que segmenter, les firmes ont appliqué le texte le plus strict partout. AXIOM écrira ce texte.",
      "L'essentiel des contrats mondiaux d'affrètement et de négoce de matières premières est rédigé sous droit anglais. L'ambiguïté se tranche toujours dans la langue du rédacteur, et le corridor rédigera ses contrats types lui-même.",
      "Aux États-Unis, un équipement électrique sans certificat d'un laboratoire agréé n'est pas raccordé : l'inspecteur refuse. Une norme ne vaut que par l'organisme qui la vérifie, et cet organisme facture chaque audit, indéfiniment. AXIOM certifie, donc AXIOM encaisse.",
      "Une norme s'écrit dans des salles où siègent ceux qui peuvent payer des ingénieurs pendant dix ans sans revenu direct. La rente va à la présence, pas au talent. Le corridor financera la présence.",
    ],
    impact: [
      "Un industriel qui veut vendre une batterie, un conteneur ou un modèle d'intelligence artificielle dans le corridor se conforme au texte publié par AXIOM et paie l'audit qui l'atteste : aligner coûtant moins cher que segmenter, la règle la plus stricte finit appliquée partout.",
      "Qualcomm et les détenteurs de brevets essentiels voient leur redevance s'arrêter à la frontière d'une norme qu'ils n'ont pas rédigée ; UL et le TÜV perdent le monopole du tampon sans lequel rien ne se raccorde, et le JORC cesse d'être l'acte de naissance obligatoire d'un gisement.",
      "Un gisement déclaré sous le code du corridor devient finançable sans passer par Toronto ni Perth, et une usine certifiée chez elle exporte sans repayer un audit étranger : la valeur cesse de naître à la signature d'un tiers installé sur un autre continent.",
    ],
  },
  {
    id: "metrologie-et-certification",
    titre: "La mesure — l'étalon et le tampon",
    lignes: [
      "La France définit le mètre par la loi en 1795, puis installe le Bureau international des poids et mesures à Sèvres par la Convention du Mètre de 1875 : l'unité est une chose, l'adresse où on la garde en est une autre.",
      "Depuis 2019, le kilogramme se définit par la constante de Planck et non plus par un cylindre gardé sous cloche : les unités sont devenues des recettes, réalisables par tout laboratoire correctement équipé. La souveraineté métrologique s'achète en instruments.",
      "Un chiffre n'est cru que si l'instrument qui l'a produit remonte, par une chaîne d'étalonnages accréditée, à un étalon national reconnu. Sans laboratoire accrédité, un pays mesure pour lui seul et personne d'autre.",
      "Un gisement ne devient un actif que lorsqu'une personne qualifiée le signe sous un code comme le JORC australien ou le NI 43-101 canadien : la valeur naît à la signature, pas à la découverte.",
      "Un cuivre ne se vend au prix mondial que si sa marque figure sur la liste de bonne livraison du London Metal Exchange : la liste fait le prix, pas le métal. Le corridor vise la liste, puis établit la sienne.",
      "En 2023, le London Metal Exchange a découvert des sacs de pierres au lieu de nickel dans un entrepôt de Rotterdam et a invalidé les warrants correspondants : l'actif négocié est le titre d'entrepôt, jamais la matière.",
      "Dans un contrat de concentré, le paiement suit l'analyse faite au port de chargement par un inspecteur indépendant, diminuée des frais de traitement et d'affinage : chaque décimale du dosage est de l'argent.",
      "L'Union européenne conditionnera l'entrée de ses batteries à un passeport numérique documentant l'empreinte carbone et la chaîne d'approvisionnement : l'appareil de certification décide qui entre sur un marché, sans toucher à un seul tarif douanier.",
      "FORGE tient les fours, VERDIA les laboratoires, AXIOM le registre des certificats : la même tonne vaut deux prix selon le tampon qu'elle porte, et le tampon se fabrique comme le reste.",
    ],
    impact: [
      "Un acheteur de cuivre, de lithium ou de cobalt accepte désormais l'analyse faite au port de chargement par un laboratoire accrédité du corridor, et la tonne se paie sur ce dosage : chaque décimale du titre change de propriétaire au moment de la pesée.",
      "Le London Metal Exchange perd la liste de bonne livraison qui faisait le prix mondial du métal, les sociétés d'inspection SGS et Cotecna perdent l'exclusivité de l'échantillon qui fait foi, et le passeport batterie de l'Union européenne cesse de décider seul qui entre sur un marché.",
      "Une nation pauvre qui mesure chez elle cesse d'exporter du brut pour racheter sa propre valeur transformée : le concentré analysé, certifié et coté dans le corridor se vend au prix mondial, et l'écart entre les deux prix reste sur le continent.",
    ],
  },
  {
    id: "droit-juridiction-arbitrage",
    titre: "Le droit — juridiction et arbitrage",
    lignes: [
      "Un contrat n'appartient pas au sol qu'il creuse mais à la loi qu'il choisit : une ligne en première page décide qu'une mine congolaise se juge à Londres. La vraie capitale d'un actif est écrite dans sa clause.",
      "L'essentiel des contrats de matières premières et du transport maritime se rédige en droit anglais : un droit devient standard parce qu'il est prévisible, documenté et enseigné, jamais parce qu'il est juste.",
      "BNP Paribas a payé 8,9 milliards de dollars en 2014 pour des opérations licites en France mais libellées en dollars, donc compensées à New York. La monnaie d'un contrat en désigne le juge : l'AXE est une sortie de juridiction avant d'être une réserve.",
      "La convention de New York de 1958, ratifiée par plus de cent soixante États, rend une sentence arbitrale exécutoire à l'étranger là où un jugement s'arrête à la frontière. Le corridor y adhère le premier jour.",
      "Le siège de l'arbitrage détermine le juge qui peut annuler la sentence : Paris, Londres et Singapour ont vendu ce siège comme une industrie, sans matière première ni chantier. AXIOM en ouvre un.",
      "La majorité des grandes sociétés cotées américaines s'immatriculent au Delaware pour son tribunal, pas pour son territoire. La juridiction est un produit d'exportation qui ne consomme ni terre ni énergie.",
      "Le Niger, le Tchad, la Centrafrique et la République démocratique du Congo relèvent déjà de l'OHADA et de sa Cour commune de justice et d'arbitrage d'Abidjan : quatre des sept nations partagent un droit des affaires et un juge.",
      "La Bolivie, l'Équateur et le Venezuela ont dénoncé la convention CIRDI : sortir du système est possible, mais se paie en accès au capital. Le corridor ne sort pas, il devient le for où les autres viennent plaider.",
      "La sentence Ioukos, d'environ cinquante milliards de dollars, se poursuit depuis dix ans en chasse aux actifs saisissables : une sentence ne vaut que les biens que l'on peut attraper, d'où des réserves gardées chez soi.",
    ],
    impact: [
      "Une clause désignant AXIOM comme siège devient la condition d'accès au capital, à l'assurance et au fret du corridor : mineurs, armateurs et négociants plaident là où l'actif se trouve, et la sentence s'exécute par la Convention de New York dans plus de cent soixante États.",
      "Londres, Paris et Singapour perdent une industrie qui ne consomme ni terre ni énergie, le Delaware cesse d'être le domicile par défaut des sociétés du corridor, et les procureurs américains perdent la compétence que leur donnait la seule compensation d'un paiement à New York.",
      "Une mine congolaise cesse d'être jugée à Londres, dans une langue et un droit qu'elle n'a pas choisis : l'OHADA et sa cour d'Abidjan, déjà communes à quatre des sept nations, deviennent le socle d'un for où les étrangers viennent plaider à leur tour.",
    ],
  },
  {
    id: "carte-cadastre-toponymie",
    titre: "La carte, le cadastre, le nom",
    lignes: [
      "La carte n'est pas la description du territoire, c'est son titre de propriété. Le tracé, la projection et le nom retenus décident de ce que le monde croit voir, donc de ce qu'il accepte.",
      "La conférence de Berlin, en 1884-1885, a partagé un continent sur du papier avant toute occupation réelle. Beaucoup de frontières africaines sont encore des lignes droites : elles suivent des méridiens, pas des peuples.",
      "La projection de Mercator gonfle les hautes latitudes : le Groenland y paraît comparable à l'Afrique, qui est en réalité près de quatorze fois plus vaste. Des générations d'écoliers ont appris une taille fausse.",
      "Les coordonnées elles-mêmes sont étrangères. Le GPS est opéré par l'armée américaine et son signal civil a été volontairement dégradé jusqu'en 2000 : l'Europe, la Chine et la Russie ont bâti leurs constellations pour cette seule raison.",
      "L'agence cartographique britannique est née de l'artillerie : quadriller l'Écosse après 1745, puis l'Irlande pour l'évaluer et l'imposer. Cartographier a toujours été l'étape qui précède percevoir.",
      "Une faible part des terres africaines est formellement enregistrée. Ce qui n'est pas inscrit est déclaré vacant, et ce qui est déclaré vacant se signe à Genève ou à Dubaï sans que l'occupant l'apprenne.",
      "Une terre occupée sans titre ne peut pas être hypothéquée. Elle nourrit son occupant et ne finance rien : c'est du capital mort, et il y en a plus dans le corridor que dans aucune banque.",
      "Le Rwanda a régularisé les titres de la quasi-totalité de ses parcelles entre 2009 et 2013. Un cadastre complet n'est pas l'affaire d'un siècle : c'est une décision, puis un chantier de quatre ans.",
      "Salisbury n'est redevenue Harare qu'en 1982, Léopoldville Kinshasa en 1966. Nommer AXIOM, VERDIA et FORGE avant qu'un autre nomme ces lieux, c'est fixer la langue dans laquelle ils seront discutés pendant un siècle.",
      "Un État qui ne photographie pas son propre sol le regarde par l'objectif d'un autre, à la résolution que cet autre autorise. Le cadastre continental commence par un satellite qui appartient au corridor.",
    ],
    impact: [
      "Toute carte, tout relevé et toute coordonnée servant à un contrat dans le corridor se réfèrent au satellite et au cadastre du corridor : géologues, assureurs, états-majors et bailleurs travaillent sur une image dont ils ne fixent plus la résolution ni la date.",
      "Le GPS, opéré par l'armée américaine, cesse d'être la référence unique de position sous cette latitude ; Maxar et Airbus Defence and Space perdent des États captifs qui achetaient l'image de leur propre sol, et les lignes droites héritées de la conférence de Berlin cessent d'être la seule description admise.",
      "Une terre inscrite peut être hypothéquée : le capital mort du corridor devient garantie, crédit et héritage transmissible, et le Rwanda a déjà démontré qu'un cadastre complet se boucle en quatre ans de chantier, non en un siècle d'attente.",
    ],
  },
  {
    id: "le-temps-et-le-meridien",
    titre: "Le temps — l'ère et le méridien",
    lignes: [
      "Une ère fixe l'origine du décompte : la Révolution française recommence à l'an I, la Corée du Nord a daté les siennes à partir de 1912 pendant vingt-sept ans avant de supprimer son ère en 2024, le Japon les renomme à chaque règne. An Zéro 2033 date les autres à partir de soi.",
      "La conférence de Washington de 1884 attribue le méridien d'origine à Greenwich ; la France s'abstient et définit encore son heure légale en 1911 comme le temps moyen de Paris retardé de neuf minutes vingt et une secondes.",
      "L'Éthiopie compte ses années et ses heures autrement, et commerce quand même : tenir son propre temps n'interdit pas la conversion, il oblige seulement les autres à convertir, à leurs frais et dans leurs formulaires.",
      "La seconde vaut 9 192 631 770 périodes d'une transition du césium 133, et l'UTC est une moyenne calculée sur des horloges atomiques nationales : un pays sans horloge consomme le temps sans le fabriquer. AXIOM entre dans la moyenne.",
      "En 2022, la Conférence générale des poids et mesures a voté la suppression de la seconde intercalaire d'ici 2035 : même l'irrégularité de la rotation terrestre se règle désormais par un vote, et il faut siéger dans la salle.",
      "La réglementation européenne MiFID II oblige à horodater certains ordres à cent microsecondes de l'UTC : celui qui tient l'heure de référence tient l'ordre d'arrivée, donc l'ordre d'exécution, donc le prix.",
      "Positionner, c'est mesurer un temps de vol : une nanoseconde d'erreur d'horloge déplace un point de trente centimètres au sol. Une constellation de navigation et une échelle de temps souveraine sont un seul et même objet.",
      "Le corridor s'étire du nord au sud : du Niger au Botswana, les sept pays tiennent dans une ou deux heures d'écart. Un empire est-ouest fragmente sa journée ; celui-ci ouvre et ferme d'un seul geste.",
      "Cette bande horaire recouvre la clôture asiatique et l'ouverture américaine — la position même qui a fait de Londres la première place de change du monde. Le corridor hérite du créneau, pas de la ville.",
      "L'Arabie saoudite a déplacé son week-end en 2013 pour gagner un jour d'ouverture commun avec les marchés mondiaux : le jour de repos est un instrument économique, décidé, jamais simplement hérité.",
    ],
    impact: [
      "Tout contrat, tout horodatage d'ordre et tout plan de vol qui touche le corridor se règle désormais sur l'échelle de temps d'AXIOM : affréteurs, chambres de compensation et opérateurs de constellations convertissent avant de traiter, et la conversion se paie de leur côté.",
      "Le Royaume-Uni perd la rente de position que la conférence de Washington de 1884 avait accordée à Greenwich, et Londres perd le créneau qui l'a faite première place de change : la bande horaire du corridor recouvre le même chevauchement entre clôture asiatique et ouverture américaine, horloges et carnets d'ordres compris.",
      "Une nation pauvre cesse de consommer un temps fabriqué ailleurs : une horloge atomique entrant dans la moyenne mondiale, une constellation de navigation régionale et une seconde datée depuis l'équateur rendent le positionnement, l'horodatage financier et la certification aéronautique accessibles sans licence étrangère.",
    ],
  },
  {
    id: "la-langue-et-l-ecriture",
    titre: "La langue — la couche d'accès",
    lignes: [
      "En 1539, l'ordonnance de Villers-Cotterêts impose le français dans tous les actes de justice du royaume : l'État fixe le format obligatoire de sa mémoire deux siècles avant son apogée. NOVA-AXE rédige avant de bâtir.",
      "Atatürk change d'alphabet en 1928 : une bibliothèque entière devient illisible en une nuit. L'écriture commande l'accès à l'archive ; le corridor ne coupe personne de la sienne, il en paie la transcription.",
      "Les sept nations traversées plaident aujourd'hui en français, en portugais et en anglais : chaque coentreprise du corridor acquitte une taxe de traduction et une taxe d'ambiguïté. Une seule langue d'acte les supprime.",
      "Le kiswahili est devenu langue de travail de l'Union africaine en 2022. Une langue véhiculaire née sur le continent coûte moins cher à généraliser qu'une langue héritée, et ne doit de rente à personne.",
      "L'ISO publie ses normes en anglais, en français et en russe : tout autre pays travaille sur une traduction qu'il finance, et chaque ambiguïté de cette traduction se tranche contre lui. Le corridor publie les siennes.",
      "L'Office européen des brevets ne connaît que l'allemand, l'anglais et le français : une revendication n'existe que dans ces trois langues. Une génération formée dans une langue empruntée dépose ses brevets chez le prêteur.",
      "L'OACI exige que l'anglais soit disponible dans toute communication aéronautique internationale et fixe un niveau 4 minimum sur une échelle de six : sans lui, un pilote compétent ne franchit aucune frontière. La langue est une licence.",
      "L'alphabet adlam, inventé en 1989 par deux adolescents guinéens pour le peul, est entré dans Unicode en 2016 et figure aujourd'hui dans les grands systèmes d'exploitation : une écriture absente des tables n'existe pas pour les machines.",
      "Dans un contrat bilingue, une clause désigne la version qui fait foi ; en cas de divergence, c'est elle qui l'emporte, quel que soit le pays du chantier. La langue qui fait foi est une position, jamais un style.",
    ],
    impact: [
      "Les normes, les revendications de brevet et les clauses qui font foi dans le corridor sont rédigées dans sa langue d'acte : tout constructeur, tout cabinet et tout assureur étranger finance sa propre traduction et supporte l'ambiguïté qu'elle produit, à ses frais et dans ses formulaires.",
      "L'Office européen des brevets et l'ISO perdent l'exclusivité des langues où une revendication et une norme existent : un corpus normatif publié directement dans la langue du corridor n'a plus besoin de passer par l'allemand, l'anglais, le français ou le russe pour être opposable.",
      "Une génération africaine dépose ses brevets, plaide ses contrats et certifie ses ingénieurs sans passer par la langue d'un ancien tuteur ; les écritures nées sur le continent entrent dans les tables des machines, et un peuple cesse d'acquitter une taxe de traduction sur sa propre production.",
    ],
  },
  {
    id: "diplomatie-pouvoir-politique",
    titre: "La diplomatie — trois cercles, un siège",
    lignes: [
      "Un État qui perçoit une redevance surveille son percepteur ; un État qui détient des parts défend l'actif. Le Botswana possède la moitié de Debswana et quinze pour cent de De Beers. Les sept nations du corridor sont actionnaires, pas hôtes.",
      "L'Afrique compte cinquante-quatre États membres de l'ONU, le premier bloc de l'Assemblée générale, où une voix vaut une voix quel que soit le produit intérieur brut. Qui coordonne ce bloc obtient les agendas et les nominations.",
      "L'Union européenne négocie ses accords commerciaux par une autorité unique pour vingt-sept États : aucun partenaire ne peut diviser les membres. Le troisième cercle, le reste du monde, ne parlera au corridor que par un guichet.",
      "Les Chicago Boys ont refait la politique économique du Chili sans occuper le pays : ils avaient eu le même professeur. Former un ministre coûte moins cher qu'un régiment et dure plus longtemps. AXIOM ouvrira ses écoles avant ses ambassades.",
      "La Chine a financé en Tanzanie une école de cadres pour les partis au pouvoir de six pays d'Afrique australe, dont l'Angola. Une promotion met trente ans à devenir un gouvernement : les boursiers de l'An 5 signeront les traités de l'An 35.",
      "Les transferts de la diaspora haïtienne dépassent de loin les exportations du pays, sans conditionnalité ni intermédiaire. Une diaspora finance chez elle et vote chez l'autre : le corridor tiendra le registre de la sienne.",
      "En 1995, Haïti a ramené son tarif sur le riz de trente-cinq à trois pour cent sous pression américaine, et le riz subventionné a écrasé la production locale. L'aide n'est pas un don, c'est un marché.",
      "La générosité crée une dette qui n'apparaît sur aucun bilan et ne s'éteint jamais. Le corridor donnera des vaccins, des bourses et des ponts, et chaque don installera une norme, un manuel et un fournisseur.",
      "Le Qatar héberge depuis 2013 le bureau politique des talibans et, sur le même territoire, la plus grande base américaine de la région. Héberger la conversation rend un État impossible à contourner. AXIOM hébergera celle du continent.",
      "La réforme du Conseil de sécurité exige l'accord des cinq permanents : le veto protège le veto. Pourtant, en 1971, le siège chinois a changé de titulaire par un vote, parce que la réalité avait changé. Un siège s'impose, il ne se demande pas.",
    ],
    impact: [
      "Quiconque veut traiter avec les sept nations traversées passe par un guichet unique : plus de négociation séparée, plus de mise en concurrence des capitales, et les chancelleries habituées au bilatéral doivent reconstruire tout leur appareil africain autour d'un seul interlocuteur qui ne se divise pas.",
      "Les anciennes puissances tutélaires perdent le régime de relation privilégiée qu'elles conservaient dans leurs anciennes possessions, et les bailleurs perdent la conditionnalité : on n'impose pas de conditions à un actionnaire qui détient des parts, finance ses propres chantiers et n'a rien à demander.",
      "Le premier bloc de l'Assemblée générale, cinquante-quatre voix où le produit intérieur brut ne compte pas, cesse d'être un réservoir de suffrages loué à la séance : les nations pauvres obtiennent des agendas, des nominations, et un siège qui s'impose au lieu de se solliciter.",
    ],
  },
  {
    id: "ecole-des-cadres-et-diaspora",
    titre: "Les anciens élèves et la diaspora",
    lignes: [
      "On ne tient pas durablement un pays par ses mines, mais par ses anciens élèves. Former l'ingénieur, l'officier et le juriste du voisin, c'est installer dans sa capitale des décideurs qui raisonnent déjà dans vos catégories.",
      "L'Union soviétique a fondé en 1960 une université entière destinée aux cadres du tiers-monde. Des décennies plus tard, ses diplômés siégeaient dans des dizaines de gouvernements : le rendement se compte en générations, pas en trimestres.",
      "Sandhurst et Saint-Cyr ont formé des officiers étrangers jusqu'à des chefs d'État, et plusieurs auteurs des coups d'État récents au Sahel sortaient de programmes occidentaux. La formation ne garantit pas l'obéissance : elle garantit l'accès.",
      "En une décennie, la Chine est devenue l'une des premières destinations des étudiants africains grâce aux bourses du FOCAC, et par la même voie l'une des premières sources de leurs manuels, de leurs normes et de leurs fournisseurs.",
      "Le pouvoir n'est pas seulement d'enseigner, il est d'accréditer. Un diplôme d'ingénieur hors des accords de reconnaissance mutuelle ne franchit aucune frontière : celui qui tient l'équivalence tient la carrière.",
      "Certains pays africains comptent plus de leurs médecins à l'étranger qu'à domicile. Former sans retenir, c'est subventionner chaque année le système de santé d'un pays plus riche, sans la moindre contrepartie.",
      "Les transferts des migrants vers l'Afrique subsaharienne dépassent désormais l'investissement direct étranger. C'est le premier flux de capital du continent, et il ne dépend d'aucun conseil d'administration ni d'aucune conditionnalité.",
      "Envoyer de l'argent vers l'Afrique subsaharienne coûte plus cher que vers toute autre région du monde. Chaque point de commission prélevé est un impôt payé par la diaspora à des opérateurs étrangers.",
      "Israël vend des obligations à sa diaspora depuis 1951 ; l'Inde a levé des milliards auprès de la sienne en 1998, quand les marchés se fermaient. Une diaspora bancarisée est une ligne de crédit que les sanctions n'atteignent pas.",
      "Les transferts de la diaspora haïtienne pèsent de l'ordre du cinquième du produit intérieur brut du pays. Aucun ministère n'a jamais organisé cette force : elle arrive seule, chaque mois, sans plan et sans contrepartie.",
    ],
    impact: [
      "Le monde recrute ses ingénieurs, ses officiers et ses juristes dans les promotions du corridor et doit reconnaître ses équivalences pour les employer : les organismes d'accréditation étrangers négocient désormais la reconnaissance mutuelle au lieu de l'accorder, et les carrières cessent de dépendre de leur signature.",
      "Les opérateurs de transfert d'argent perdent la commission la plus élevée du monde, celle prélevée sur l'Afrique subsaharienne, dès qu'un rail de paiement souverain relie la diaspora à ses familles ; et les systèmes de santé du Nord cessent d'être subventionnés par des médecins formés ailleurs.",
      "Un pays pauvre arrête de financer les cadres d'un pays riche : sa diaspora devient une ligne de crédit souscrite par les siens, hors marchés et hors sanctions, et le premier flux de capital du continent, plus large que l'investissement direct étranger, trouve enfin un registre.",
    ],
  },
  {
    id: "culture-et-recit",
    titre: "Le récit — l'antichambre du consentement",
    lignes: [
      "L'hégémonie précède toujours la contrainte : un peuple accepte l'ordre qui le domine lorsqu'il en a déjà adopté les héros, les critères de réussite et le vocabulaire. Gramsci l'avait nommé avant nous.",
      "Trois agences — Reuters, l'Associated Press, l'Agence France-Presse — alimentent en dépêches la quasi-totalité des rédactions de la planète. Un événement n'existe mondialement qu'après leur passage. NOVA-AXE finance la quatrième, à AXIOM.",
      "Dès 1859, puis par traité en 1870, Reuters, Havas et Wolff se partagèrent le globe en zones exclusives d'information. Le partage de l'information a devancé la conférence de Berlin de quatorze ans.",
      "En 2017, les conditions posées au Qatar pour lever son blocus incluaient la fermeture d'Al Jazeera. Une chaîne d'information y figurait au rang d'une base militaire. Le corridor en tire sa doctrine médiatique.",
      "Le Pentagone entretient des bureaux de liaison avec Hollywood : porte-avions, appareils et bases sont prêtés aux tournages contre un droit de regard sur le scénario. L'image de la force se fabrique avec la force.",
      "L'essentiel des revenus mondiaux de la musique enregistrée transite par trois majors. L'afrobeats a franchi ce goulot sans autorisation : un son né hors du centre peut reconfigurer le centre.",
      "En France, l'appellation « haute couture » est protégée par la loi et attribuée chaque année par une commission. Le prestige n'est pas un accident du goût : c'est un registre, avec des critères et un greffe.",
      "La FIFA compte deux cent onze fédérations membres, une voix chacune : Haïti y pèse exactement autant que l'Allemagne. Le sport reste l'un des rares terrains où la souveraineté est déjà égale.",
      "Après la crise de 1997, la Corée du Sud a traité sa culture comme une industrie d'exportation, agence d'État et budget à l'appui. Deux décennies plus tard, ses films et sa musique fixent des standards mondiaux.",
      "Haïti a payé à la France, dès 1825, une indemnité pour son propre affranchissement, soldée jusqu'au milieu du vingtième siècle. La première république noire fut convertie en avertissement. Renverser ce récit vaut une armée.",
    ],
    impact: [
      "Un événement survenu entre le Sahel et l'Afrique australe existe mondialement sans être passé par une rédaction étrangère : les rédactions, les assureurs et les chancelleries qui bâtissent leur évaluation du risque sur les dépêches doivent s'abonner à la source établie à AXIOM.",
      "Reuters, l'Associated Press et l'Agence France-Presse perdent l'exclusivité de fait héritée du partage du globe de 1870 : une quatrième agence, financée et située dans le corridor, supprime la position d'arbitre qui permettait de qualifier un continent depuis l'extérieur et de fixer ce qui compte.",
      "L'Afrique cesse d'être un décor et devient productrice de standards : ce que l'afrobeats a réussi sans autorisation, une industrie culturelle dotée d'une agence d'État, d'un budget et d'un registre de prestige le produit par méthode, et le récit de 1825 se renverse enfin.",
    ],
  },
  {
    id: "sacre-rite-pelerinage",
    titre: "Le sacré, le rite, le pèlerinage",
    lignes: [
      "La religion est la seule institution qui règle le calendrier, la morale, la famille et le déplacement de millions de gens sans budget de coercition. Les empires durables l'administrent ; les régimes brefs la combattent.",
      "La semaine de sept jours ne divise exactement ni le mois ni l'année : c'est la seule unité du calendrier calée sur aucun cycle céleste complet, héritée des sept astres visibles à l'œil nu. C'est une institution religieuse qui commande aujourd'hui l'ouverture des marchés, les rotations d'usine et les plans de vol du monde entier.",
      "Le roi d'Arabie saoudite se fait appeler Serviteur des deux saintes mosquées. La garde des Lieux saints lui donne un instrument que nulle flotte n'égale : le quota de pèlerins, attribué pays par pays, chaque année.",
      "L'Église orthodoxe éthiopienne tient depuis le quatrième siècle un calendrier propre, une langue liturgique propre et des dizaines de millions de fidèles. Aucun régime éthiopien n'a duré le dixième de cette continuité.",
      "En 1324, le pèlerinage de Mansa Musa a déversé assez d'or au Caire pour en déprimer le cours pendant des années. Le Sahel a été, une fois, l'endroit d'où se décidait le prix mondial d'un métal.",
      "La destruction des mausolées de Tombouctou en 2012 a valu, en 2016, la première condamnation de la Cour pénale internationale pour un crime visant le patrimoine religieux. On ne dynamite que ce qui est stratégique.",
      "Le waqf est une fondation perpétuelle : un bien immobilisé dont les revenus financent une école ou un hôpital indéfiniment, hors budget d'État et hors succession. Des institutions ont ainsi traversé huit siècles.",
      "Le plus petit État du monde compte quelques centaines d'habitants et l'un des réseaux diplomatiques les plus étendus de la planète. La souveraineté sacrée ne se mesure ni en kilomètres carrés ni en divisions.",
      "La tradition haïtienne situe à Bois-Caïman, en août 1791, la cérémonie qui a précédé l'insurrection. Le rite n'a pas accompagné la révolte : il l'a convoquée, datée et rendue collective en une nuit.",
      "Fonder un calendrier est un acte religieux. L'ère musulmane commence à un exil, l'ère japonaise à un règne, l'ère chrétienne à une naissance. An Zéro en 2033 relève exactement du même geste.",
    ],
    impact: [
      "Le corridor tient une ère, un calendrier et des lieux de rassemblement qui commandent le déplacement de millions de personnes : compagnies aériennes, hôteliers, assureurs et ministères de l'intérieur planifient leurs saisons sur des dates qu'ils ne fixent pas et ne peuvent pas déplacer.",
      "L'Arabie saoudite perd l'exclusivité de l'instrument le plus fin qu'un État exerce sur des fidèles étrangers, le quota de pèlerins attribué pays par pays chaque année, dès qu'un second pôle de rassemblement existe sur le continent, avec ses propres saisons, ses propres flux et ses propres accréditations.",
      "Le waqf rend possible pour des nations pauvres ce qu'aucune aide conditionnée n'a produit : des écoles et des hôpitaux dotés à perpétuité, hors budget d'État et hors succession, et une souveraineté qui ne se mesure ni en kilomètres carrés ni en divisions.",
    ],
  },
];

/**
 * Ce qui ferme la lecture. La dernière ligne est la plus haute du texte, et
 * l'écran la traite comme telle.
 */
export const GRANDEUR_CLOTURE: string[] = [
  "Trente secteurs, une seule position : aucune de ces sections ne parle de posséder, toutes parlent d'occuper l'endroit étroit par lequel une chose doit passer — le minerai, l'octet, le kilogramme mis en orbite, le contrat, la seconde, le mot.",
  "La propriété se confisque, se nationalise, se rachète ; la position, elle, ne se déplace pas : une latitude, un étranglement, un dépôt fait avant les autres, une norme déjà rédigée restent où ils sont, quel que soit celui qui les conteste.",
  "C'est pourquoi le prix d'entrée vaut mieux qu'une victoire : aucun rival n'a besoin d'être vaincu, il suffit que l'accès coûte davantage que ce qu'il rapporterait, et cette arithmétique-là se tient sans bataille, année après année.",
  "Un monde où l'orbite équatoriale, la monnaie de réserve, l'eau douce du deuxième fleuve de la planète, le cobalt, le cuivre, les platinoïdes et la norme qui les certifie relèvent d'une même puissance est un monde dont le centre de gravité a changé de continent.",
  "Ce continent est celui que l'on a le plus longtemps vidé : de ses hommes pendant quatre siècles, de ses métaux pendant deux, de ses données depuis vingt ans, chaque fois selon la même règle — la matière part brute, la marge se prend ailleurs.",
  "Renverser cette règle ne demande aucune vengeance : il suffit que le raffinage, le brevet, l'usine, le registre et le tribunal se trouvent du côté du gisement, et l'ordre ancien cesse de fonctionner sans qu'un seul coup ait été tiré.",
  "Un milliard de personnes n'a jamais pesé sur une décision mondiale : ni sur le prix de son cacao, ni sur le taux qui fixe le service de sa dette, ni sur la molécule autorisée pour sa maladie, ni sur le nom porté par sa propre carte.",
  "Ce que change une puissance née chez elles n'est pas d'abord un revenu, c'est un droit de veto : le jour où un « non » venu du corridor arrête une décision prise ailleurs, deux siècles d'asymétrie deviennent discutables.",
  "Un enfant né dans le corridor n'aura pas à partir pour trouver un bloc opératoire, une paillasse, un pas de tir ou une bibliothèque : la fuite des cerveaux ne se combat pas par des frontières, elle s'éteint le jour où le meilleur atelier se trouve ici.",
  "Aucune de ces trente positions n'a été reçue en héritage : ni un empire défunt qui les aurait léguées, ni une conférence qui les aurait concédées, ni une réparation qui les aurait accordées en compensation d'un tort reconnu.",
  "La gloire propre de la chose tient exactement là : elle aura été bâtie, dossier par dossier et barrage par barrage, par ceux à qui l'on avait assigné la place la plus basse, et prise dans les formes plutôt que demandée.",
  "Rome tient encore par ses routes et par son droit, deux mille ans après ses légions : ce qui reste d'une puissance n'est jamais ce qu'elle a pris, c'est ce qu'elle a mis en place et que les autres ont continué d'employer après elle.",
  "Quand tout aura été compté — les kilomètres carrés, les milliards, les orbites, les normes, les traités — il restera une seule chose, et elle se retient en une ligne : le continent que l'on traversait pour prendre est devenu celui par lequel il faut passer.",
];
