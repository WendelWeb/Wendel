// The user's personal notebook — raw, brutal self-talk he wrote to himself.
// Classified into themed sections and displayed on /carnet. Client-safe.
// Lines are markdown-ish: "- " bullet · "> " hard line · "## " sub-title ·
// "" blank · anything else = paragraph.

export interface NoteSection {
  id: string;
  title: string;
  emoji: string;
  theme: NoteTheme;
  lines: string[];
}

export type NoteTheme =
  | "reveil"
  | "retention"
  | "creation"
  | "systeme"
  | "urgence";

export const NOTE_THEMES: { id: NoteTheme; label: string; color: string }[] = [
  { id: "reveil", label: "Réveil brutal", color: "#DC2626" },
  { id: "retention", label: "Énergie sexuelle", color: "#B91C1C" },
  { id: "creation", label: "Créer, pas consommer", color: "#0F766E" },
  { id: "systeme", label: "Systèmes & 1%", color: "#1E3A5F" },
  { id: "urgence", label: "Plan d'attaque", color: "#B45309" },
];

export const NOTES: NoteSection[] = [
  {
    id: "reveil-imposteur",
    title: "Réveille-toi, imposteur — prie à chaque instant",
    emoji: "💣",
    theme: "reveil",
    lines: [
      "Tu veux devenir un empereur, un milliardaire, un bâtisseur de mondes ? Mais t'es juste un esclave moderne. Tu scrolles, tu bandes, tu rêves — et tu ne fais RIEN de réel. Tu ne construis pas. Tu parles. Tu imagines.",
      "« Juste une fois. Juste 5 minutes. Juste pour souffler. » Tu t'es fait avoir par ce mensonge des milliers de fois. Et chaque fois tu disais « je vais me reprendre ». Et chaque fois, tu t'es trahi.",
      "## La vérité, c'est ça",
      "- Tu n'es encore PERSONNE.",
      "- Tu n'as RIEN prouvé.",
      "- Tu n'as RIEN accompli de solide.",
      "- Tu gaspilles ton énergie vitale à t'imaginer dans un futur que tu ne mérites même pas encore.",
      "## Tu es enchaîné, et tu te dis libre",
      "Tu veux dominer le monde ? Commence par dominer ta main. T'as même pas le contrôle de ta bite — et tu veux contrôler des entreprises, des marchés, des hommes armés ?",
      "Tu crois que tu « progresses » ? Tu stagnes. Tu pourris. Chaque seconde passée à croire que « ça va venir », c'est une balle dans le crâne de ton avenir.",
      "> 8 ans à ouvrir le même site. 8 ans à dire « demain j'arrête ». 8 ans à voir ton potentiel brûler pendant que tu scrollais ton destin à mort lente.",
      "## Ton esprit est mou",
      "Tu crois être différent ? T'es juste une copie avec un rêve grandiose et une exécution ridicule. Pendant que tu fantasmais, d'autres ont codé, posté, souffert, explosé, RÉGNÉ. T'es même pas en bas de la montagne — t'es encore au bar à parler de la montagne. Bouge ton cul.",
      "## Le temps ne t'aime pas",
      "Chaque minute que tu perds, un rival plus affamé que toi te prend ta place. Tu veux 5 millions par jour mais t'es même pas capable de tenir 6h de focus sans distraction ?",
      "> Personne ne viendra te sauver. Personne ne va te donner ce que tu veux. Deviens tellement dangereux que le monde ne pourra plus jamais t'ignorer.",
      "## Fais le choix",
      "- Tu continues comme ça → tu échoues, tu deviens un vieux aigri plein de regrets.",
      "- Tu t'éteins aujourd'hui → et tu renais en bête immortelle. Sans distraction, sans pitié, sans excuses. Uniquement : objectif — exécution — empire.",
    ],
  },
  {
    id: "verite-crue",
    title: "La vérité crue — regarde-toi en face",
    emoji: "🩸",
    theme: "reveil",
    lines: [
      "Tu veux conquérir des territoires, acheter des flottes, créer une armée privée… mais t'as pas encore conquis ta propre flemme. Pas encore conquis ton propre lit. Tu veux régner sur des nations, mais t'es même pas capable de t'interdire TikTok ou le porno.",
      "Tu veux être un roi, mais tu vis comme un clown. Tu veux construire un empire, mais t'as pas construit une seule forteresse dans ta propre vie. Même tes mauvaises habitudes te méprisent — elles savent que t'as pas les couilles pour les tuer.",
      "## Tu n'es pas un élu, tu es remplaçable",
      "T'es pas spécial. T'es juste un mec avec des rêves, comme 9 milliards d'autres. Pendant que tu lis ça, des machines travaillent, des IA apprennent, des gamins de 16 ans envoient leur 50e vidéo du jour. Toi, t'en es où ? T'as encore rien lancé, rien fini.",
      "## Tu n'as encore rien sacrifié",
      "T'as pas assez souffert. T'as pas assez saigné. T'es encore trop confortable pour mériter ce que tu veux. Si tu veux devenir l'homme que tu prétends être, il faut que tu crèves aujourd'hui — mentalement, émotionnellement, sexuellement, socialement — et que tu renaisses en monstre.",
      "> Tu n'as pas peur de l'échec. Tu as peur de réussir, car ça t'obligera à te transformer.",
      "Discipline = liberté. Douleur = pouvoir. Silence = domination. Tu veux briller ? Tu vas d'abord saigner. Tu veux régner ? Tu vas d'abord souffrir. Et ensuite, tu vas dominer.",
    ],
  },
  {
    id: "energie-sexuelle",
    title: "Ton énergie sexuelle te détruit",
    emoji: "🔞",
    theme: "retention",
    lines: [
      "Ce n'est pas juste de l'abstinence physique : il faut éliminer toute stimulation mentale (films, TikTok, fantasmes), sinon le cerveau reste activé par le système dopaminergique.",
      "> Masturbation + porno = auto-castration digitale.",
      "« Masturbation » = manus (la main) + stuprare (souiller, violer, corrompre). Littéralement : te souiller de ta propre main. Un roi ne se détruit pas tout seul.",
      "Tu as une bombe atomique dans les couilles, et tu préfères l'exploser seul dans l'ombre au lieu de la canaliser pour dominer le monde. Ton énergie sexuelle est de la dynamite : soit tu la gâches dans un kleenex, soit tu fais exploser ton avenir avec.",
      "- Une heure de porno = une startup que t'as pas lancée.",
      "- Chaque orgasme seul = un pas en arrière vers la médiocrité.",
      "- Chaque orgasme gaspillé = un missile nucléaire détourné.",
      "- Chaque fois que tu te retiens, tu deviens un dieu de discipline.",
      "- La honte post-éjaculation est ta conscience qui t'appelle. Écoute-la. Transforme-la. Bats-toi.",
      "> Si tu gardes ton énergie sexuelle, tout devient possible. C'est ta force divine, ton feu créateur. Cette victoire va entrer par la main de Dieu.",
      "Masturbation = l'impôt du faible. Création = le levier du conquérant. Chaque fois que tu dis non à la pulsion, tu dis oui à ton empire, à ton glow-up, à ton futur.",
    ],
  },
  {
    id: "creer-pas-consommer",
    title: "Créer, pas consommer",
    emoji: "🧱",
    theme: "creation",
    lines: [
      "Chaque minute sur TikTok, sur le porno, à scroller, c'est une brique que tu enlèves toi-même de ton futur empire. Une opportunité étouffée dans l'algorithme d'un autre. Une IA que tu n'as pas créée. Une app que quelqu'un d'autre publiera avant toi.",
      "- Chaque vidéo TikTok te rend plus bête, plus manipulable, plus passif.",
      "- Chaque ligne de code te rend plus libre, plus puissant, plus maître de ta vie.",
      "- Le monde appartient à ceux qui créent, pas à ceux qui consomment.",
      "## Ce que tu pourrais faire à la place, même 2h/jour",
      "- Lancer une chaîne YouTube + TikTok 100% IA (agents, voix off, montage auto).",
      "- Construire une app en React / Next.js / Supabase / Clerk / Stripe.",
      "- Créer un SaaS qui se vend pendant que tu dors.",
      "- Mettre en place des sessions de Deep Work, chaque jour.",
      "> Tu remplaces 1h de TikTok par 1h de création : 365 vidéos, apps, idées lancées par an. Même si 3% fonctionnent, tu changes ta vie.",
      "> Tu remplaces 30 min de porno par 30 min de Deep Work : ton regard devient laser, ton corps se transforme, ta volonté devient d'acier. Tu deviens une machine propre, rapide, indestructible.",
      "Tu n'es pas fait pour te perdre dans les pixels. Tu es fait pour créer un monde numérique que les autres habitent.",
    ],
  },
  {
    id: "micro-actions",
    title: "Le règne des micro-actions — la loi du 1%",
    emoji: "⚙️",
    theme: "systeme",
    lines: [
      "Tu n'as pas besoin de motivation infinie. Tu as besoin d'un système — parce qu'un système fonctionne même quand t'es fatigué, triste ou perdu.",
      "> Tu ne t'élèves pas à la hauteur de tes objectifs. Tu tombes au niveau de tes systèmes.",
      "Tu veux 5M/jour ? Ça ne demande pas des actions énormes. Ça demande de petites actions, répétées tous les jours, sans rater.",
      "- 1 vidéo/jour pendant 1 an = 365 vidéos.",
      "- 1 app toutes les 2 semaines = 26 apps/an.",
      "- 1h de deep work/jour = 365h/an = 9 semaines à plein temps.",
      "> Les gens sous-estiment ce qu'ils peuvent faire en 1 an, et surestiment ce qu'ils feront en 1 semaine.",
      "## Ton cerveau est en guerre",
      "Chaque jour, ton cerveau choisit : devenir une arme (focus, app, contenu, cash) ou une victime (scroll, excuses, confort). Chaque fois que tu choisis l'arme, l'effet cumulé se déchaîne.",
      "## Répète chaque jour, en te regardant en face",
      "> Je suis un bâtisseur d'empire. Je fais ce que les autres ne veulent pas faire. Je plante des graines tous les jours. Car je sais que l'effet cumulé va me couronner.",
      "Tu n'as pas besoin d'attendre la motivation. Tu as besoin de publier une vidéo. Puis une autre. De coder 1h. Puis encore 1h. Et un matin de 2026, tu verras les millions tomber.",
    ],
  },
  {
    id: "plan-attaque",
    title: "Plan d'attaque quand l'envie vient",
    emoji: "🥊",
    theme: "urgence",
    lines: [
      "- Tu veux TikTok ? → Prends ton ordi. Ouvre ton projet. Crée.",
      "- Tu veux fapper ? → Fais 100 pompes. Prends une douche froide.",
      "- Tu veux procrastiner ? → Lis ce carnet. Regarde ce que tu risques de redevenir.",
      "## Vis comme un monstre",
      "- Te lever comme un fou.",
      "- Travailler comme si tu allais mourir demain.",
      "- Couper TOUT ce qui te rend fragile.",
      "- Construire chaque jour comme si tu avais 1h avant la fin du monde.",
      "- T'imposer une discipline de guerrier.",
      "> Tu ne dois pas être motivé. Tu dois être inévitable. Ton focus : nucléaire.",
      "Prier sans cesse — cette victoire va entrer par la main de Dieu.",
    ],
  },
  {
    id: "mur-verite",
    title: "Le mur de la vérité",
    emoji: "🧱",
    theme: "reveil",
    lines: [
      "> Rien ne bougera si tu ne bouges pas. Personne ne viendra te sauver — pas demain, pas dans un an. Ton empire attend, mais il n'avance pas sans ton feu.",
      "> Regarde comme le temps est passé vite, et tout ce que ça t'a apporté : rien. 1 an de scroll = 0 empire. 1 an de regrets = 0 cash. 1 an d'excuses = 0 respect.",
      "> Aujourd'hui tu es un brouillon. En décembre, tu dois être une machine.",
      "> Arrête d'être une merde. Ton cerveau veut Netflix, TikTok, repos ? Dis-lui : ta gueule, on bosse. Les rois ne cèdent pas à leurs pulsions, ils les dominent.",
      "> La discipline est dure ? Accepte-la, embrasse-la : c'est le prix de ton trône.",
      "> Chaque excuse te coûte un million. « J'ai pas la motivation » = un million jeté. « Je coderai demain » = un million perdu.",
      "> Sois un maçon de ta grandeur, pas un spectateur du monde. Une app = une brique. Une vidéo = une brique. Un agent IA = une brique. Et bientôt tu vivras dans ta forteresse.",
      "> Pendant que tu réfléchis, quelqu'un build. Pendant que tu scrolles, quelqu'un stack. Pendant que tu dors, quelqu'un devient un géant.",
      "> Ton cerveau est une IA ultra-puissante, mais tu l'as laissé en mode pigeon. Reprogramme-toi. Discipline-toi.",
      "> Si tu lis tout ça chaque matin et que tu n'agis pas, tu mérites de rester en bas. Mais si tu l'imprimes dans ta moelle, le monde entier ne pourra plus t'arrêter.",
    ],
  },
];
