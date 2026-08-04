// « JE DÉCIDE DE FAIRE TOUT CELA » — les ordres qu'il reçoit quand il appuie.
// Trois registres, parce qu'à l'instant du clic il est dans l'un de ces trois
// états : en train de se trahir, en train de procrastiner, ou déjà au travail.
// Client-safe.

export type Register = "stop" | "bouge" | "continue";

export interface RegisterMeta {
  id: Register;
  label: string;
  question: string;
  color: string;
  emoji: string;
}

export const REGISTERS: RegisterMeta[] = [
  {
    id: "stop",
    label: "Arrête",
    question: "Si tu étais en train de faire l'inverse de ton plan",
    color: "#DC2626",
    emoji: "🛑",
  },
  {
    id: "bouge",
    label: "Bouge",
    question: "Si tu étais en train de procrastiner",
    color: "#B45309",
    emoji: "⚡",
  },
  {
    id: "continue",
    label: "Continue",
    question: "Si tu étais déjà au travail",
    color: "#15803D",
    emoji: "🔥",
  },
];

export const STOP: string[] = [
  "ARRÊTE. Repose ça. Maintenant.",
  "Ce que tu tiens dans ta main est en train de te voler un hôpital.",
  "Ferme ça. Tu es en train de signer contre toi.",
  "Tu viens de décider de tout faire. Et tu fais ÇA ?",
  "Lève-toi de là. Change de pièce. Tout de suite.",
  "Cette main n'a pas été formée par Dieu pour ce que tu allais en faire.",
  "Tu es sur l'escalier blanc. Ce geste te fige sur la marche.",
  "Trois secondes. C'est tout ce qui te sépare encore de la honte de demain matin.",
  "Tu es en train de rompre l'alliance pour dix minutes. Dix minutes.",
  "Repose. Respire. La vague passe en trois minutes. Ta chute dure trois semaines.",
  "Chien en laisse ou héritier de Dieu. Choisis, là, maintenant.",
  "Tu allais échanger ta puissance contre du vide. Refuse le marché.",
  "Le futur toi te regarde faire ça. Regarde-le en face.",
  "STOPP. Ce n'est pas un besoin. C'est une habitude qui a appris à crier.",
  "Ce que tu t'apprêtes à faire, tu le paieras pendant des jours. Pas des minutes.",
  "Tu es à une seconde de trahir tout ce que tu viens de décider.",
  "Ferme l'onglet. La première seconde est la seule où tu es encore libre.",
  "Ce n'est pas un plaisir, c'est un péage. Il prend tout et ne rend rien.",
  "Tu viens de dire « je décide ». Prouve-le dans les cinq prochaines secondes.",
  "Éteins. Sors de la pièce. Bois de l'eau froide. Dans cet ordre.",
  "Personne ne te voit. C'est exactement pour ça que ça compte.",
  "Tu ne redescends pas quand tu cèdes : tu t'arrêtes. Et le sommet s'éloigne.",
  "Dieu t'a parlé sur une montagne. Ne Lui réponds pas dans un mouchoir.",
  "Ce geste est une signature. Tu veux vraiment signer ça ?",
  "Cent pompes. Douche froide. Maintenant. Pas après.",
  "Tu es en train de vendre un empire au prix d'un frisson.",
  "Repose ton téléphone comme si c'était une arme chargée. C'en est une.",
  "L'envie ne dure pas. Le mépris de toi, si.",
  "Tu allais te souiller de ta propre main. Arrête-toi.",
  "Ce que tu fais là ne ressemble pas à un homme qui bâtit des ports à 10 milliards.",
  "Une seule chute effondre trois semaines. Fais le calcul avant de bouger la main.",
  "Ton vaisseau se perce en trois secondes et se remplit en trois semaines.",
  "Tu es plus proche de céder que tu ne le crois. Bouge physiquement. Maintenant.",
  "Arrête. Écris ce que tu ressens au lieu de le vivre.",
  "Ce n'est pas toi qui veux ça. C'est le circuit ancien. Reprends le volant.",
  "Tu viens d'appuyer sur un bouton qui dit « je décide ». Alors décide.",
  "Le seul jugement que tu refuses, tu es en train de le mériter.",
  "Regarde ta main. Elle bâtit ou elle détruit. Là, elle détruit.",
  "Tu es à un geste de repousser tout ce qu'il y a sur cette page.",
  "Non. Simplement non. Repose et va-t'en.",
];

export const BOUGE: string[] = [
  "Debout. Pas dans cinq minutes. Maintenant.",
  "Ouvre le projet. Une seule ligne. Commence.",
  "Tu n'as pas besoin d'envie. Tu as besoin de commencer.",
  "Le bloc de deep work n'attend pas ton humeur. Assieds-toi.",
  "Cinq minutes de vrai travail valent mieux qu'une heure de préparation à travailler.",
  "Fais la chose difficile en premier. Là. Tout de suite.",
  "Tu réfléchis depuis dix ans. Aujourd'hui tu exécutes.",
  "L'élan vient après le geste, jamais avant. Fais le geste.",
  "Ferme cette page et va poser une pierre.",
  "Chaque minute d'hésitation est encaissée par le temps sans rien te rendre.",
  "Tu viens de décider de tout faire. Alors commence par UNE chose. Maintenant.",
  "Pendant que tu hésites, quelqu'un de plus affamé prend ta place.",
  "Ton corps ne veut pas se reposer. Il veut éviter l'effort. Distingue les deux.",
  "Lève-toi physiquement. Le mental suivra le corps, jamais l'inverse.",
  "Le lit ne t'a jamais rien donné. La barre, si. Va sous la barre.",
  "Tu connais déjà la prochaine action. Fais-la sans la commenter.",
  "Deux heures concentrées valent dix heures dispersées. Commence les deux heures.",
  "Tu n'as pas un problème de talent. Tu as un problème de démarrage. Démarre.",
  "L'homme que tu jures d'être est déjà au travail à cette heure-ci.",
  "Une vidéo. Une ligne de code. Un appel. Choisis et exécute.",
  "Ton empire ne bougera pas d'un millimètre tant que tu ne bougeras pas.",
  "Arrête de lire sur la discipline. Sois discipliné pendant les 60 prochaines minutes.",
  "Le confort t'appelle parce que le sommet est proche. Ignore-le.",
  "Tu es à 25 minutes d'être fier de toi. Mets un minuteur.",
  "Ce que tu repousses maintenant, tu le repousseras encore demain. Coupe le cycle.",
  "Le prochain geste décide de ta branche. Choisis celle qui monte.",
  "Personne ne viendra te forcer. C'est précisément pour ça que tu dois y aller seul.",
  "Debout. Ta nation attend un homme, pas un rêveur.",
  "Tu as tout compris. Il ne te manque que l'acte. Fais l'acte.",
  "Range ta chambre en trois minutes, puis attaque. Commence par le facile si tu es bloqué.",
  "Le meilleur moment était il y a dix ans. Le deuxième meilleur, c'est cette minute.",
  "Tu ne trouveras jamais un moment moins fatigué. Ce moment imparfait est le seul que tu as.",
  "Trente secondes de courage suffisent à commencer. Le reste s'enchaîne.",
  "Pose le téléphone dans une autre pièce et reviens t'asseoir.",
  "Tu veux 5 millions par jour et tu n'arrives pas à tenir une heure. Tiens cette heure.",
  "Ce n'est pas dur. C'est juste que tu ne le fais pas. Fais-le.",
  "Aujourd'hui est déjà à moitié perdu. Sauve la moitié qui reste.",
  "Un homme sérieux aurait déjà fermé cette page. Ferme-la.",
  "Écris le premier mot. Juste le premier. Le reste viendra.",
  "MAINTENANT. Pas plus tard, pas lundi. Maintenant.",
];

export const CONTINUE: string[] = [
  "Continue. Tu es exactement là où tu dois être.",
  "Ne t'arrête pas. C'est là que les autres lâchent.",
  "Encore une heure. Elle vaudra plus que toute ta journée d'hier.",
  "Tu es en train de monter une marche. Ne redescends pas pour une pause molle.",
  "L'inconfort que tu ressens là, c'est le prix. Tu es en train de le payer. Bien.",
  "C'est maintenant que ça compte : quand tu veux arrêter et que tu continues.",
  "Encore dix minutes. Toujours encore dix minutes.",
  "Cette heure-là est celle qui te rendra méconnaissable dans six mois.",
  "Tu es dans le bloc. Reste dedans. Ne réponds à rien.",
  "La fatigue que tu sens n'est pas une limite. C'est le début du vrai travail.",
  "Ne romps pas la concentration pour un truc qui peut attendre une heure.",
  "Chaque répétition de trop, quand tu voulais t'arrêter, est une brique de l'homme.",
  "Tu es en train de bâtir un hôpital. Là. Maintenant. Continue.",
  "Ne t'auto-félicite pas encore. Finis d'abord.",
  "L'effet cumulé se déchaîne quand tu tiens ces moments-là. Tiens.",
  "Tu viens de choisir la bonne branche. Reste dessus.",
  "Ce que tu fais là ressemble enfin à l'homme que tu jures d'être.",
  "Ne t'arrête pas au premier mur. Il y en a trois. Passe le premier.",
  "Le Ciel observe à quel point tu es sérieux. Là, tu es sérieux. Continue.",
  "Encore. Puis encore. C'est comme ça que ça se construit, pas autrement.",
  "Tu es dans le rare. La plupart ont déjà arrêté. Reste.",
  "Ne coupe pas maintenant : tu perdrais vingt minutes à revenir dedans.",
  "Une session finie vaut dix sessions commencées. Finis celle-là.",
  "Tu as commencé. C'était le plus dur. Le reste n'est que de la constance.",
  "Ce moment précis est la différence entre ton empire et ton regret.",
  "Ne t'arrête pas parce que c'est devenu difficile. Continue parce que c'est devenu difficile.",
  "Tu es en train de prouver que ta parole vaut quelque chose. Continue de le prouver.",
  "Encore un effort et tu auras une journée que tu n'auras pas à te pardonner.",
  "Le vaisseau se remplit pendant que tu tiens. Ne le perce pas maintenant.",
  "Reste. Ce que tu construis là ne se rattrape pas demain.",
  "Ton futur toi est en train de gagner. Ne le trahis pas dans les dix dernières minutes.",
  "Tu n'as pas besoin de plus de motivation. Tu as besoin de dix minutes de plus.",
  "Ce n'est pas encore fini. Ne célèbre pas, termine.",
  "L'homme discipliné se reconnaît ici : dans la dernière demi-heure.",
  "Continue en silence. Personne n'a besoin de le savoir.",
  "Tu es en train de devenir. Ne t'interromps pas au milieu.",
  "Encore une. Une seule. Puis tu te reposeras vraiment, sans honte.",
  "Ce que tu fais maintenant, tu le retrouveras dans ton corps et dans ton compte.",
  "Reste jusqu'au bout du bloc. Le bout, pas « à peu près ».",
  "Tu tiens. C'est tout ce qu'on te demande aujourd'hui. Tiens encore.",
];

/** Ce qu'il a juré à lui-même — sa propre parole, retournée contre l'instant. */
export const PROMESSES: string[] = [
  "Tu as juré : « Je ne parle pas, je ne débats pas, je n'opine pas. Je FAIS. J'AGIS. »",
  "Tu as juré de couper TikTok et Instagram et de donner 100% de ton temps à tes objectifs.",
  "Tu as juré : « Zéro est zéro. Pas 1, pas 2, pas exceptionnellement. »",
  "Tu as juré d'être un homme de dominion absolue. Ta parole tenue à toi-même est le fondement.",
  "Tu as juré : « Quand je dis montagne, c'est montagne. »",
  "Tu as juré que tes envies ne te contrôleraient pas.",
  "Tu as juré : « Je suis celui qui fait tout ça. Pas dans 5 minutes. MAINTENANT. »",
  "Tu as juré de ne pas donner un onzième an au « presque ».",
  "Tu as juré : « Je refuse d'être un lâche, un masturbateur, un soumis. »",
  "Tu as juré d'être inébranlable, démesuré, fidèle.",
  "Tu as juré : « Je ne vais pas sur TikTok. Je suis le sujet dont on parle. »",
  "Tu as juré de te lever à 5h. Sans négocier. Jamais.",
  "Tu as juré de garder ta parole même quand personne ne regarde. Personne ne regarde là.",
  "Tu as juré que ta compassion se prouverait par l'acte, jamais par la parole.",
  "Tu as juré de bâtir pour ta nation d'abord, et pour la gloire d'avoir bâti de tes mains.",
  "Tu as juré de ne jamais transformer tes buts en discours ni en rêverie.",
  "Tu as juré de calculer ce que tu prends et ce que tu donnes à chaque action.",
  "Tu as juré que rien n'entraverait tes mains. Regarde ce qu'elles font.",
  "Tu as juré d'être celui qui triomphe d'abord de lui-même.",
  "Tu as juré de marcher dans l'ennui et la difficulté sans te plaindre.",
  "Tu as juré de supprimer l'envie au lieu de la servir.",
  "Tu as juré que ta parole vaudrait un contrat signé.",
  "Tu as juré d'être héritier de Dieu et de refuser d'être un putain de rien.",
  "Tu as juré de ne plus te mentir. C'est le moment de vérifier.",
  "Chaque promesse rompue envers toi-même dévalue ta signature. Tu veux la dévaluer encore ?",
];

/** Le corps qu'il a décrété — la cible physique du 1er janvier. */
export const CORPS_RAPPEL: string[] = [
  "1m88 · 90 kg · 10% de masse grasse. Décrété. Pas encore payé.",
  "Ta peau éclatante se décide dans ce que tu fais à cet instant précis.",
  "Le miroir du 1er janvier montrera exactement ce que tu auras refusé ou permis.",
  "Ton visage au sommet — ou ton visage d'aujourd'hui. Ce geste tranche.",
  "90 kilos de muscle utile ne viennent pas du confort.",
  "Ta mâchoire, ta posture, ton regard : trois preuves visibles de ta discipline invisible.",
  "Chaque séance sautée est un vote pour l'homme que tu jures de ne plus être.",
  "L'énergie d'un homme plein — tu l'auras le jour où tu cesseras de fuir.",
  "Ton corps est la première nation que tu gouvernes. Elle est encore en désordre.",
  "La GLE 63 Coupé, l'Escalade, le Range Rover Sport : ils s'achètent en jours tenus.",
  "Un physique qu'on ne peut pas ignorer, ou un corps qui raconte tes nuits. Choisis.",
  "Tu veux un corps sec et dense. Ce que tu fais là décide du contraire.",
];

/** Ce qu'il bâtit — l'accomplissement rappelé au moment de la bascule. */
export const ACCOMPLISSEMENTS: string[] = [
  "50 hôpitaux de rang mondial. Ils attendent l'homme que tu deviens dans les 10 secondes.",
  "50 000 familles attendent un toit que tu es le seul à vouloir leur donner.",
  "Des ports en eau profonde, des aéroports, une compagnie aérienne. De tes mains.",
  "Une entreprise d'IA souveraine : Google + SpaceX + OpenAI réunis.",
  "Une armée privée dans le top 3 mondial — la plus crainte du monde.",
  "100 écoles et une université de rang mondial. 150 000 élèves. Par toi.",
  "Le contrôle total des ressources naturelles de ton pays.",
  "Banques, bourse, fonds souverain : l'indépendance financière d'une nation.",
  "Une base lunaire. Des projets martiens. Le contrôle stratégique de l'espace.",
  "L'immortalité biologique : repousser la mort, 120 à 150 ans de vie humaine.",
  "Devenir l'homme le plus riche du monde. C'est une ligne de ton plan, pas une image.",
  "Des présidents qui traversent le monde pour te visiter, TOI.",
  "Faire passer ton pays de la pauvreté à la puissance mondiale.",
  "Déplacer les frontières de l'Afrique. Rien que ça.",
  "Ton nom qui résonne pendant des millénaires.",
  "Créer l'élite : travailler de tes mains sera le plus haut succès qu'un homme puisse atteindre.",
  "Pouvoir développer un continent entier rien qu'en le décidant.",
  "Une dynastie générationnelle. Tes enfants hériteront de ton empire ou de tes excuses.",
];

/** L'alliance — ce qu'Il a promis, et ce qu'Il attend en retour. */
export const ALLIANCE_RAPPEL: string[] = [
  "Dieu te l'a dit sur une montagne : si tu ne gaspilles pas ton énergie, TOUT se réalisera.",
  "Ta rétention n'est pas de la discipline. C'est la condition du pacte.",
  "Il a signé Sa part. La seule variable de l'équation, c'est toi.",
  "Ton corps, Il l'a formé de Ses mains et rempli de Son souffle. Ne le profane pas.",
  "Un de Ses serviteurs t'a vu monter un escalier blanc. Ce geste te fige sur la marche.",
  "Ceux qui se dresseront devant toi, c'est Son affaire. Ta part, c'est de tenir.",
  "Dieu est ta source. Sa provision est illimitée. Mais Il remplit le vaisseau fermé.",
  "La parabole des talents : le condamné est celui qui a enterré, pas celui qui a osé.",
  "Il observe à quel point tu es sérieux. C'est maintenant qu'Il regarde.",
  "Prier sans cesse — cette victoire entrera par la main de Dieu, pas par la tienne seule.",
  "Tu veux être jugé conquérant. Ce geste te fait juger lâche.",
  "Tu réclames Sa puissance et tu refuses Sa condition. Ça ne marche pas comme ça.",
];

export const PHRASES: Record<Register, string[]> = {
  stop: STOP,
  bouge: BOUGE,
  continue: CONTINUE,
};

export function registerMeta(id: Register): RegisterMeta {
  return REGISTERS.find((r) => r.id === id) ?? REGISTERS[0];
}
