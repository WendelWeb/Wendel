// « CET HOMME QUE JE DÉCRIS DANS L'APP » — la question posée partout.
//
// Il l'a demandée lui-même, et c'est la question la plus dure de toute l'app,
// parce qu'elle ne se discute pas. Il a écrit 587 pages, une Vision, un
// miroir : l'homme y est entièrement décrit. Il ne reste qu'à demander, à
// chaque geste, si celui qui fait ce geste est celui-là.
//
// Deux formes seulement, et c'est voulu :
//
//   • « Si je suis vraiment sérieux, … » — le test au présent, complété à
//     chaque fois par la chose exacte qui est devant lui.
//   • « Cet homme que je décris dans l'app … » — le même test, mais à la
//     troisième personne. Il est plus dur à esquiver : on se pardonne à soi,
//     on ne pardonne pas à un homme qu'on regarde de l'extérieur.
//
// Et le mot « demain » est nommé, parce qu'il a dit lui-même que c'est avec
// ce mot-là qu'il a brûlé dix ans.
//
// Client-safe.

/** La question, telle qu'il l'a formulée. Elle ouvre le bloc partout. */
export const LA_QUESTION = "Cet homme que je décris dans l'app, il fait quoi là ? Il ne fait pas quoi ?";

/** Le mot qui a coûté les dix ans. */
export const LE_MOT_DEMAIN: string[] = [
  "« Demain. » C'est le mot exact avec lequel j'ai brûlé dix ans.",
  "Ce n'est jamais une grande trahison. C'est ce mot-là, dit doucement, une fois par jour, pendant dix ans.",
  "Je n'ai pas perdu dix ans d'un coup. Je les ai perdus en remettant à demain, chaque jour, la même petite chose.",
];

/**
 * Le test au présent. Chaque ligne se complète par ce qu'il a devant lui à
 * l'instant où il la lit — c'est pour ça qu'elles sont courtes et nombreuses.
 */
export const SI_SERIEUX: string[] = [
  "Si je suis vraiment sérieux, j'arrête de donner mon temps, ma dopamine et mon énergie à TikTok.",
  "Si je suis vraiment sérieux, j'arrête de donner mon temps, ma dopamine et mon énergie au porno.",
  "Si je suis vraiment sérieux, j'arrête de donner mon temps, ma dopamine et mon énergie aux rêveries mentales.",
  "Si je suis vraiment sérieux, j'arrête de donner mon temps, ma dopamine et mon énergie aux femmes.",
  "Si je suis vraiment sérieux, j'arrête de donner mon temps, ma dopamine et mon énergie à X.",
  "Si je suis vraiment sérieux, j'arrête de m'imaginer en interview au lieu de faire le travail qui m'y mènerait.",
  "Si je suis vraiment sérieux, j'arrête d'écouter de la musique en me racontant des scènes.",
  "Si je suis vraiment sérieux, j'arrête les boissons gazeuses.",
  "Si je suis vraiment sérieux, je tiens mes 20 minutes de méditation ce matin.",
  "Si je suis vraiment sérieux, je tiens mes 20 minutes de méditation ce soir.",
  "Si je suis vraiment sérieux, je tiens mes 20 minutes de lecture biblique — et je finis l'Ancien Testament.",
  "Si je suis vraiment sérieux, je tiens mes 6 heures de deep work. Puis les 6 autres.",
  "Si je suis vraiment sérieux, je me lève à 4h30. Pas à 4h35.",
  "Si je suis vraiment sérieux, je dors à 21h45, parce que la journée de demain se joue ce soir.",
  "Si je suis vraiment sérieux, je monte la montagne dimanche et jeudi. Deux heures. Pas une.",
  "Si je suis vraiment sérieux, je dis le Psaume 24 — c'est l'une des quatre seules choses qu'Il m'a demandées.",
  "Si je suis vraiment sérieux, je range ma chambre. C'est la deuxième des quatre.",
  "Si je suis vraiment sérieux, je Lui parle aujourd'hui. C'est la troisième.",
  "Si je suis vraiment sérieux, j'ouvre l'acide exfoliant que j'ai acheté il y a des mois et jamais utilisé.",
  "Si je suis vraiment sérieux, je me lave le visage, je soigne mes dents, je mets du parfum. Aujourd'hui, pas un jour.",
  "Si je suis vraiment sérieux, je vais dans mes fichiers regarder ce que je vais accomplir.",
  "Si je suis vraiment sérieux, j'ouvre mon livre au lieu de me contenter de l'avoir écrit.",
  "Si je suis vraiment sérieux, je stoppe la rêverie à voix haute dès qu'elle commence — pas dans dix minutes.",
  "Si je suis vraiment sérieux, je n'ouvre pas X avec des crédits Claude payés 200 $ qui m'attendent.",
  "Si je suis vraiment sérieux, ça se voit dans les cinq prochaines minutes. Pas dans mes intentions.",
];

/**
 * Le même test, mais vu de l'extérieur. C'est la version qui fait mal : on se
 * pardonne à soi-même, on ne pardonne pas à un homme qu'on regarde.
 */
export const CET_HOMME: string[] = [
  "Cet homme que je décris dans l'app tient ses 20 minutes de méditation. Même quand il n'en a pas envie. Surtout quand il n'en a pas envie.",
  "Cet homme que je décris dans l'app ne scrolle pas TikTok à 23h.",
  "Cet homme que je décris dans l'app n'ouvre pas de porno. Jamais. Pas « moins ».",
  "Cet homme que je décris dans l'app ne se masturbe pas avec la main dont il dit qu'elle bâtira des hôpitaux.",
  "Cet homme que je décris dans l'app ne rêvasse pas sa gloire : il la fabrique pendant que les autres la rêvent.",
  "Cet homme que je décris dans l'app se lève à 4h30 sans négocier avec lui-même.",
  "Cet homme que je décris dans l'app fait ses 12 heures de deep work et ne les raconte à personne.",
  "Cet homme que je décris dans l'app monte la montagne dimanche et jeudi, qu'il pleuve ou qu'il soit fatigué.",
  "Cet homme que je décris dans l'app a les dents propres, le visage soigné, et sent bon. Tous les jours.",
  "Cet homme que je décris dans l'app ne dit pas « demain ». Ce mot n'existe pas dans sa bouche.",
  "Cet homme que je décris dans l'app ne remet rien. Ce qu'il a décidé, il le fait dans l'heure.",
  "Cet homme que je décris dans l'app tient les quatre choses que Dieu lui a demandées. Quatre. Il n'en rate aucune.",
  "Cet homme que je décris dans l'app ne se plaint pas d'être fatigué à 23 ans.",
  "Cet homme que je décris dans l'app ne cherche pas ses limites : il remplit d'abord la vie qu'il a déjà.",
  "Cet homme que je décris dans l'app dort à 21h45 parce qu'il sait ce que coûte une heure de plus.",
  "Cet homme que je décris dans l'app n'a pas besoin qu'on le regarde pour tenir.",
  "Cet homme que je décris dans l'app ne laisse pas trois minutes de désir décider de ses dix prochaines années.",
  "Cet homme que je décris dans l'app relit ce qu'il a écrit, et ce qu'il lit lui ressemble.",
  "Cet homme que je décris dans l'app ne construit pas des outils pour éviter de s'en servir.",
  "Cet homme que je décris dans l'app fait ce que je suis en train de repousser. Là. Maintenant.",
  "Cet homme que je décris dans l'app, ce n'est pas encore moi. Et c'est exactement ça, le problème à régler aujourd'hui.",
];
